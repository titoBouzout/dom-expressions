import * as babelTypes from "@babel/types";

const t: any = babelTypes;
import { decode } from "html-entities";
import { ChildProperties, VoidElements } from "dom-expressions/src/constants";
import {
  evaluateAndInline,
  getTagName,
  isStatefulDOMProperty,
  registerImportMethod,
  filterChildren,
  checkLength,
  escapeHTML,
  reservedNameSpaces,
  getConfig,
  trimWhitespace,
  isDynamic,
  isComponent,
  convertJSXIdentifier,
  inlineCallExpression
} from "../shared/utils";
import { transformNode, getCreateTemplate } from "../shared/transform";
import { createTemplate } from "./template";
import type { BabelPath, SSRTransformResult } from "../types";

interface HoistOptions {
  group?: boolean;
  post?: boolean;
  skipWrap?: boolean;
}

interface GroupRun {
  start: number;
  end: number;
  ids: string[];
}

function appendToTemplate(template: string[], value: string | string[]) {
  let array: string[] | undefined;
  if (Array.isArray(value)) {
    [value, ...array] = value;
  }
  template[template.length - 1] += value;
  if (array && array.length) template.push.apply(template, array);
}

function hoistExpression(
  path: BabelPath,
  results: SSRTransformResult,
  expr: babelTypes.Expression,
  { group, post }: HoistOptions = {}
): babelTypes.Identifier {
  // Each dynamic gets a temp `_v$N` variable that's later assigned + passed
  // to `ssr(_tmpl, _v$N, …)`. The temp-var indirection is a V8 call-site
  // IC stability tactic: when `ssr()` always sees stable `Identifier`
  // references at its argument positions (rather than mixed call
  // expressions / arrow literals / string results inlined directly), the
  // call site stays specialized. Inlining destabilizes the IC and
  // measurably regresses throughput.
  //
  // Evaluation ordering is preserved by JS left-to-right semantics — the
  // temp var exists solely for IC stability.
  const variable = path.scope.generateUidIdentifier("v$");
  post
    ? results.postDeclarations.push(t.variableDeclarator(variable, expr))
    : results.declarations.push(t.variableDeclarator(variable, expr));
  // `group: true` marks the entry eligible for `groupAttributeClosures`.
  // `post` entries live in a separate declaration bucket and never group.
  if (group && !post) {
    if (!results.groupable) results.groupable = new Set();
    results.groupable.add(variable.name);
  }
  return variable;
}

// Coalesce contiguous runs of >=2 groupable templateValues entries into
// `_$ssrGroup(() => [...bodies], N)`, repeated N times in the `ssr(...)`
// arg list. Inserts/children break a run, so child isolation is preserved.
function groupAttributeClosures(path: BabelPath, results: SSRTransformResult): void {
  const groupable = results.groupable;
  if (!groupable || groupable.size < 2) return;
  const tv = results.templateValues as babelTypes.Expression[];

  const runs: GroupRun[] = [];
  let runStart = -1;
  let runIds: string[] = [];
  for (let i = 0; i <= tv.length; i++) {
    const v = i < tv.length ? tv[i] : null;
    if (v && babelTypes.isIdentifier(v) && groupable.has(v.name)) {
      if (runStart === -1) {
        runStart = i;
        runIds = [];
      }
      runIds.push(v.name);
    } else if (runStart !== -1) {
      if (runIds.length >= 2) runs.push({ start: runStart, end: i, ids: runIds });
      runStart = -1;
      runIds = [];
    }
  }
  if (!runs.length) return;

  // Name → declarator index. Consumed slots are nulled in place (kept
  // stable for the whole pass, then filtered at the end).
  const declMap = new Map<string, number>();
  for (let i = 0; i < results.declarations.length; i++) {
    const d = results.declarations[i];
    if (d && babelTypes.isIdentifier(d.id)) declMap.set(d.id.name, i);
  }

  // Reverse so `tv.splice` for earlier runs doesn't shift later indices.
  for (let r = runs.length - 1; r >= 0; r--) {
    const run = runs[r];
    const bodies: babelTypes.Expression[] = [];
    let firstIdx = -1;
    for (let k = 0; k < run.ids.length; k++) {
      const di = declMap.get(run.ids[k])!;
      const init = results.declarations[di]!.init as babelTypes.Expression;
      // Arrow w/ expression body → inline its body. Anything else
      // (bare identifier, `_$escape(/*@once*/ x)`, …) gets dropped in
      // as-is; the runtime's type dispatch handles both fn and value slots.
      bodies.push(
        babelTypes.isArrowFunctionExpression(init) && !babelTypes.isBlockStatement(init.body)
          ? (init.body as babelTypes.Expression)
          : init
      );
      if (k === 0) firstIdx = di;
      else results.declarations[di] = null;
    }

    if (firstIdx < 0) continue;
    const groupId = path.scope.generateUidIdentifier("g$");
    const groupInit = t.callExpression(registerImportMethod(path, "ssrGroup"), [
      t.arrowFunctionExpression([], t.arrayExpression(bodies)),
      t.numericLiteral(bodies.length)
    ]);
    results.declarations[firstIdx] = t.variableDeclarator(groupId, groupInit);

    const replacements: babelTypes.Identifier[] = new Array(run.ids.length);
    for (let k = 0; k < run.ids.length; k++) replacements[k] = t.cloneNode(groupId);
    tv.splice(run.start, run.end - run.start, ...replacements);
  }

  results.declarations = results.declarations.filter(
    (d): d is babelTypes.VariableDeclarator => d !== null
  );
}

export function transformElement(
  path: BabelPath<babelTypes.JSXElement> & { doNotEscape?: boolean },
  info: any
): any {
  const tagName = getTagName(path.node);

  path
    .get("openingElement")
    .get("attributes")
    .forEach((attr: any) => {
      evaluateAndInline(attr.node.value, attr.get("value"));
    });

  const config = getConfig(path);
  if (tagName === "script" || tagName === "style") path.doNotEscape = true;

  // contains spread attributes
  if (path.node.openingElement.attributes.some((a: any) => t.isJSXSpreadAttribute(a)))
    return createElement(path, { ...info, ...config });

  // Duplicate same-named attributes on the same element resolve to the
  // last value (matching DOM-mode and JSX spread semantics). Strip the
  // earlier occurrences before the rest of the SSR transform runs.
  {
    const seenAttributes: Record<string, any> = {};
    const duplicates: any[] = [];
    path
      .get("openingElement")
      .get("attributes")
      .forEach((attr: any) => {
        const key = t.isJSXNamespacedName(attr.node.name)
          ? `${attr.node.name.namespace.name}:${attr.node.name.name.name}`
          : attr.node.name.name;

        if (key !== "ref" && seenAttributes[key]) {
          duplicates.push(seenAttributes[key]);
        }
        seenAttributes[key] = attr;
      });
    for (const duplicate of duplicates) {
      duplicate.remove();
    }
  }

  const voidTag = VoidElements.has(tagName),
    results: SSRTransformResult = {
      template: [`<${tagName}`],
      templateValues: [],
      declarations: [],
      postDeclarations: [],
      exprs: [],
      dynamics: info.parentResults?.dynamics || [],
      tagName,
      wontEscape: (path.node as babelTypes.JSXElement & { wontEscape?: boolean }).wontEscape,
      renderer: "ssr",
      groupId: info.parentResults?.groupId
    };

  if (info.topLevel && config.hydratable) {
    results.template.push("");
    results.templateValues.push(
      hoistExpression(
        path,
        results,
        t.callExpression(registerImportMethod(path, "ssrHydrationKey"), []),
        { skipWrap: true }
      )
    );
  }
  transformAttributes(path, results, { ...config, ...info });
  appendToTemplate(results.template, ">");
  if (!voidTag) {
    transformChildren(path, results, { ...config, ...info });
    appendToTemplate(results.template, `</${tagName}>`);
  }
  // Run grouping once at the top-level element so contiguous closures
  // across nested elements can collapse into a single grouped function.
  if (info.topLevel) groupAttributeClosures(path, results);
  return results;
}

function setAttr(
  tagName: any,
  attribute: any,
  results: any,
  name: any,
  value: any,
  isDynamic: any,
  isBoolean: any
) {
  // strip out namespaces for now, everything at this point is an attribute
  let parts;
  if ((parts = name.split(":")) && parts[1] && reservedNameSpaces.has(parts[0])) {
    name = parts[1];
  }

  let attr = t.callExpression(registerImportMethod(attribute, "ssrAttribute"), [
    t.stringLiteral(name),
    value
  ]);
  if (isDynamic) {
    attr = t.arrowFunctionExpression([], attr);

    const post = isStatefulDOMProperty(tagName, name);

    results.templateValues.push(
      hoistExpression(attribute, results, attr, {
        group: true,
        post
      })
    );
    results.template.push("");
  } else {
    results.templateValues.push(attr);
    results.template.push("");
  }
}

function escapeExpression(path: any, expression: any, attr?: any, escapeLiterals?: any) {
  if (
    t.isStringLiteral(expression) ||
    t.isNumericLiteral(expression) ||
    (t.isTemplateLiteral(expression) && expression.expressions.length === 0)
  ) {
    if (escapeLiterals) {
      if (t.isStringLiteral(expression)) return t.stringLiteral(escapeHTML(expression.value, attr));
      else if (t.isTemplateLiteral(expression))
        return t.stringLiteral(escapeHTML(expression.quasis[0].value.raw, attr));
    }
    return expression;
  } else if (t.isFunction(expression)) {
    if (t.isBlockStatement(expression.body)) {
      expression.body.body = expression.body.body.map((e: any) => {
        if (t.isReturnStatement(e))
          e.argument = escapeExpression(path, e.argument, attr, escapeLiterals);
        return e;
      });
    } else expression.body = escapeExpression(path, expression.body, attr, escapeLiterals);
    return expression;
  } else if (t.isTemplateLiteral(expression)) {
    expression.expressions = expression.expressions.map((e: any) =>
      escapeExpression(path, e, attr, escapeLiterals)
    );
    return expression;
  } else if (t.isUnaryExpression(expression)) {
    return expression;
  } else if (t.isBinaryExpression(expression)) {
    expression.left = escapeExpression(path, expression.left, attr, escapeLiterals);
    expression.right = escapeExpression(path, expression.right, attr, escapeLiterals);
    return expression;
  } else if (t.isConditionalExpression(expression)) {
    expression.consequent = escapeExpression(path, expression.consequent, attr, escapeLiterals);
    expression.alternate = escapeExpression(path, expression.alternate, attr, escapeLiterals);
    return expression;
  } else if (t.isLogicalExpression(expression)) {
    // Preserve the cheaper short-circuit path for && while escaping the
    // selected result of || and ?? as a whole.
    if (expression.operator === "&&") {
      expression.right = escapeExpression(path, expression.right, attr, escapeLiterals);
      return expression;
    }
  } else if (t.isCallExpression(expression) && t.isFunction(expression.callee)) {
    if (t.isBlockStatement(expression.callee.body)) {
      expression.callee.body.body = expression.callee.body.body.map((e: any) => {
        if (t.isReturnStatement(e))
          e.argument = escapeExpression(path, e.argument, attr, escapeLiterals);
        return e;
      });
    } else
      expression.callee.body = escapeExpression(path, expression.callee.body, attr, escapeLiterals);
    return expression;
  } else if (t.isJSXElement(expression) && !isComponent(getTagName(expression))) {
    expression.wontEscape = true;
    return expression;
  } else if (t.isJSXFragment(expression) && fragmentWillSelfEscape(expression)) {
    // The fragment will later be transformed into a runtime value the
    // `escape` helper passes through unchanged — either a memoized
    // accessor function or an `_$ssr(...)` SSRNode object (see
    // `fragmentWillSelfEscape`). Wrapping it in another `_$escape(...)`
    // here would be a guaranteed no-op, so leave the fragment in place
    // and let the later traversal emit the inner form directly.
    return expression;
  }

  return t.callExpression(
    registerImportMethod(path, "escape"),
    [expression].concat(attr ? [t.booleanLiteral(true)] : [])
  );
}

// Predicts whether a JSXFragment AST will compile to a single runtime
// value for which the outer `_$escape(...)` wrap is a no-op. Must stay
// conservative: any shape this returns `true` for must, when later
// transformed, produce a self-escaping (or escape-immune) runtime value.
// When in doubt, return false so the outer `_$escape` wrap is kept.
//
// Recognized single-significant-child shapes:
//   A. `<>{memberOrCall}</>` — a `JSXExpressionContainer` whose
//      expression matches the top-level subset of
//      `isDynamic({ checkMember: true })` (member access, call, tagged
//      template, optional variants, `in` checks). `createTemplate`
//      emits `_$memo(() => _$escape(expr))`; the memo returns a
//      function accessor at runtime and `escape(fn)` is a pass-through.
//      Nested-dynamic shapes (conditional/logical carrying dynamic
//      sub-expressions) are excluded — confirming them needs the full
//      `isDynamic` traversal and a missed optimization costs only one
//      runtime no-op call.
//   B. `<><native /></>` — a single native (non-component) JSXElement.
//      `createTemplate` emits `_$ssr(_tmpl$N, …)`, which returns an
//      SSRNode object; `escape(object)` is a pass-through.
function fragmentWillSelfEscape(fragment: babelTypes.JSXFragment): boolean {
  let only: babelTypes.JSXElement | babelTypes.JSXExpressionContainer | null = null;
  for (const c of fragment.children) {
    if (t.isJSXText(c)) {
      if (trimWhitespace((c.extra?.raw as string | undefined) ?? "").length === 0) continue;
      return false;
    }
    if (babelTypes.isJSXExpressionContainer(c) && babelTypes.isJSXEmptyExpression(c.expression))
      continue;
    if (only !== null) return false;
    if (babelTypes.isJSXElement(c) || babelTypes.isJSXExpressionContainer(c)) only = c;
    else return false;
  }
  if (!only) return false;
  if (babelTypes.isJSXExpressionContainer(only)) {
    const expr = only.expression;
    if (babelTypes.isJSXEmptyExpression(expr)) return false;
    return (
      t.isCallExpression(expr) ||
      t.isOptionalCallExpression(expr) ||
      t.isTaggedTemplateExpression(expr) ||
      t.isMemberExpression(expr) ||
      t.isOptionalMemberExpression(expr) ||
      (babelTypes.isBinaryExpression(expr) && expr.operator === "in")
    );
  }
  if (babelTypes.isJSXElement(only)) return !isComponent(getTagName(only));
  return false;
}

function transformToObject(attrName: string, attributes: any[], selectedAttributes: any[]) {
  const properties: babelTypes.ObjectProperty[] = [];
  const existingAttribute = attributes.find((a: any) => a.node.name.name === attrName);
  for (let i = 0; i < selectedAttributes.length; i++) {
    const attr = selectedAttributes[i].node;
    const computed = !t.isValidIdentifier(attr.name.name.name);
    if (!computed) {
      attr.name.name.type = "Identifier";
    }
    properties.push(
      t.objectProperty(
        computed ? t.stringLiteral(attr.name.name.name) : attr.name.name,
        t.isJSXExpressionContainer(attr.value) ? attr.value.expression : attr.value
      )
    );
    (existingAttribute || i) && attributes.splice(selectedAttributes[i].key, 1);
  }
  if (
    existingAttribute &&
    t.isJSXExpressionContainer(existingAttribute.node.value) &&
    t.isObjectExpression(existingAttribute.node.value.expression)
  ) {
    existingAttribute.node.value.expression.properties.push(...properties);
  } else {
    selectedAttributes[0].node = t.jsxAttribute(
      t.jsxIdentifier(attrName),
      t.jsxExpressionContainer(t.objectExpression(properties))
    );
  }
}

function normalizeAttributes(path: any) {
  const attributes = path.get("openingElement").get("attributes"),
    styleAttributes = attributes.filter(
      (a: any) => t.isJSXNamespacedName(a.node.name) && a.node.name.namespace.name === "style"
    ),
    classNamespaceAttributes = attributes.filter(
      (a: any) => t.isJSXNamespacedName(a.node.name) && a.node.name.namespace.name === "class"
    );
  if (classNamespaceAttributes.length)
    transformToObject("class", attributes, classNamespaceAttributes);
  const classAttributes = attributes.filter(
    (a: any) => a.node.name && a.node.name.name === "class"
  );
  // combine class propertoes
  if (classAttributes.length > 1) {
    const first = classAttributes[0].node,
      values: any[] = [],
      quasis = [t.templateElement({ raw: "" })];
    for (let i = 0; i < classAttributes.length; i++) {
      const attr = classAttributes[i].node,
        isLast = i === classAttributes.length - 1;
      if (!t.isJSXExpressionContainer(attr.value)) {
        const prev = quasis.pop();
        quasis.push(
          t.templateElement({
            raw: (prev ? prev.value.raw : "") + `${attr.value.value}` + (isLast ? "" : " ")
          })
        );
      } else {
        let expr = attr.value.expression;
        if (attr.name.name === "class") {
          if (
            t.isObjectExpression(expr) &&
            !expr.properties.some((p: any) => t.isSpreadElement(p))
          ) {
            transformClasslistObject(path, expr, values, quasis);
            if (!isLast) quasis[quasis.length - 1].value.raw += " ";
            i && attributes.splice(attributes.indexOf(classAttributes[i]), 1);
            continue;
          }
          expr = t.callExpression(registerImportMethod(path, "ssrClassName"), [expr]);
        }
        values.push(t.logicalExpression("||", expr, t.stringLiteral("")));
        quasis.push(t.templateElement({ raw: isLast ? "" : " " }));
      }
      i && attributes.splice(attributes.indexOf(classAttributes[i]), 1);
    }
    first.name = t.jsxIdentifier("class");
    first.value = t.jsxExpressionContainer(t.templateLiteral(quasis, values));
  }
  if (styleAttributes.length) transformToObject("style", attributes, styleAttributes);
  return attributes;
}

function transformAttributes(path: any, results: any, info: any) {
  const tagName = getTagName(path.node);

  const hasChildren = path.node.children.length > 0,
    attributes = normalizeAttributes(path);
  let children;

  attributes.forEach((attribute: any) => {
    const node = attribute.node;

    let value = node.value,
      key = t.isJSXNamespacedName(node.name)
        ? `${node.name.namespace.name}:${node.name.name.name}`
        : node.name.name,
      reservedNameSpace =
        t.isJSXNamespacedName(node.name) && reservedNameSpaces.has(node.name.namespace.name);
    if (
      ((t.isJSXNamespacedName(node.name) && reservedNameSpace) || ChildProperties.has(key)) &&
      !t.isJSXExpressionContainer(value)
    ) {
      node.value = value = t.jsxExpressionContainer(value || t.jsxEmptyExpression());
    }

    if (
      t.isJSXExpressionContainer(value) &&
      (reservedNameSpace ||
        ChildProperties.has(key) ||
        !(
          t.isStringLiteral(value.expression) ||
          t.isNumericLiteral(value.expression) ||
          t.isBooleanLiteral(value.expression)
        ))
    ) {
      if (key === "ref") {
        results.declarations.push(
          t.variableDeclarator(path.scope.generateUidIdentifier("_ref$"), value.expression)
        );
        return;
      }
      if (key.startsWith("prop:") || key.startsWith("on")) return;
      if (ChildProperties.has(key)) {
        if (info.hydratable && key === "textContent" && value && value.expression) {
          const comments = value.expression.leadingComments;
          value.expression = t.logicalExpression("||", value.expression, t.stringLiteral(" "));
          comments && (value.expression.leadingComments = comments);
        }
        if (key === "innerHTML") path.doNotEscape = true;
        // textContent groups with attributes; innerHTML stays opaque.
        if (key === "textContent") value._groupableTextContent = true;
        children = value;
      } else {
        const isDynamicValue = isDynamic(attribute.get("value").get("expression"), {
          checkMember: true,
          checkTags: true
        });
        let doEscape = true;
        let isBoolean =
          t.isBooleanLiteral(value) ||
          (t.isJSXExpressionContainer(value) && t.isBooleanLiteral(value.expression));
        if (isBoolean) doEscape = false;
        if (key === "style") {
          if (
            t.isJSXExpressionContainer(value) &&
            t.isObjectExpression(value.expression) &&
            !value.expression.properties.some((p: any) => t.isSpreadElement(p))
          ) {
            if (value.expression.properties.length === 0) {
              return;
            }
            const props = value.expression.properties.map((p: any, i: any) => {
              if (p.computed) {
                // Computed keys are user-controlled at runtime; wrap with
                // `_$escape(..., true)` so ssrStyleProperty can stay a pure
                // string concat helper (literal-key path is already safe).
                const escape = registerImportMethod(path, "escape");
                return t.callExpression(registerImportMethod(path, "ssrStyleProperty"), [
                  t.binaryExpression(
                    "+",
                    t.callExpression(escape, [p.key, t.booleanLiteral(true)]),
                    t.stringLiteral(":")
                  ),
                  escapeExpression(path, p.value, true, true)
                ]);
              }
              return t.callExpression(registerImportMethod(path, "ssrStyleProperty"), [
                t.stringLiteral(
                  (i ? ";" : "") + (t.isIdentifier(p.key) ? p.key.name : p.key.value) + ":"
                ),
                escapeExpression(path, p.value, true, true)
              ]);
            });

            let res = props[0];
            for (let i = 1; i < props.length; i++) {
              res = t.binaryExpression("+", res, props[i]);
            }
            value.expression = res;
          } else {
            value.expression = t.callExpression(registerImportMethod(path, "ssrStyle"), [
              value.expression
            ]);
          }
          doEscape = false;
        }
        if (key === "class") {
          if (
            t.isObjectExpression(value.expression) &&
            !value.expression.properties.some((p: any) => t.isSpreadElement(p))
          ) {
            const values: any[] = [],
              quasis = [t.templateElement({ raw: "" })];
            transformClasslistObject(path, value.expression, values, quasis);
            if (!values.length) value.expression = t.stringLiteral(quasis[0].value.raw);
            else if (values.length === 1 && !quasis[0].value.raw && !quasis[1].value.raw) {
              value.expression = values[0];
            } else value.expression = t.templateLiteral(quasis, values);
          } else {
            value.expression = t.callExpression(registerImportMethod(path, "ssrClassName"), [
              value.expression
            ]);
          }
          key = "class";
          doEscape = false;
        }
        if (doEscape) value.expression = escapeExpression(path, value.expression, true);

        if (!(doEscape || isBoolean) || t.isLiteral(value.expression)) {
          if (isBoolean) {
            value.expression.value === true && appendToTemplate(results.template, ` ${key}`);
            return;
          }
          appendToTemplate(results.template, ` ${key}="`);
          results.template.push(`"`);
          if (isDynamicValue) {
            results.templateValues.push(
              hoistExpression(path, results, inlineCallExpression(value.expression), {
                group: true
              })
            );
          } else results.templateValues.push(value.expression);
        } else
          setAttr(tagName, attribute, results, key, value.expression, isDynamicValue, isBoolean);
      }
    } else {
      if (key === "$ServerOnly") return;
      if (t.isJSXExpressionContainer(value)) value = value.expression;
      const isBoolean = t.isBooleanLiteral(value);
      if (isBoolean && value && value.value !== "" && !value.value) return;
      appendToTemplate(results.template, ` ${key}`);
      if (!value) return;
      let text = isBoolean ? "" : value.value;
      if (key === "style" || key === "class") {
        text = trimWhitespace(String(text));
        if (key === "style") {
          text = text.replace(/; /g, ";").replace(/: /g, ":");
        }
      }

      appendToTemplate(
        results.template,
        // `String(text)` is needed, as text.length will mess up `attr=10>` becomes `attr>` without it
        String(text) === "" ? `` : `="${escapeHTML(text, true)}"`
      );
    }
  });
  if (!hasChildren && children) {
    path.node.children.push(children);
  }
}

function transformClasslistObject(
  path: BabelPath,
  expr: babelTypes.ObjectExpression,
  values: babelTypes.Expression[],
  quasis: babelTypes.TemplateElement[]
) {
  expr.properties.forEach((prop: any, i: any) => {
    const isLast = expr.properties.length - 1 === i;
    let key = prop.key;
    if (t.isIdentifier(prop.key) && !prop.computed) key = t.stringLiteral(key.name);
    else if (prop.computed) {
      key = t.callExpression(registerImportMethod(path, "escape"), [
        prop.key,
        t.booleanLiteral(true)
      ]);
    } else key = t.stringLiteral(escapeHTML(prop.key.value));
    if (t.isBooleanLiteral(prop.value)) {
      if (prop.value.value === true) {
        if (!prop.computed) {
          const prev = quasis.pop();
          quasis.push(
            t.templateElement({
              raw:
                (prev ? prev.value.raw : "") + (i ? " " : "") + `${key.value}` + (isLast ? "" : " ")
            })
          );
        } else {
          values.push(key);
          quasis.push(t.templateElement({ raw: isLast ? "" : " " }));
        }
      }
    } else {
      values.push(t.conditionalExpression(prop.value, key, t.stringLiteral("")));
      quasis.push(t.templateElement({ raw: isLast ? "" : " " }));
    }
  });
}

function transformChildren(path: any, results: any, { hydratable }: any) {
  const doNotEscape = path.doNotEscape;
  const tagName = getTagName(path.node);
  const filteredChildren = filterChildren(path.get("children"));
  const multi = checkLength(filteredChildren),
    markers = hydratable && multi;
  filteredChildren.forEach((node: any) => {
    if (node.isJSXFragment()) {
      throw new Error(
        `Fragments can only be used top level in JSX. Not used under a <${tagName}>.`
      );
    }
    const child = transformNode(node, { doNotEscape, parentResults: results });
    if (!child) return;
    appendToTemplate(results.template, child.template);
    results.templateValues.push.apply(results.templateValues, child.templateValues || []);
    child.declarations && results.declarations.push(...child.declarations);
    child.postDeclarations && results.postDeclarations.push(...child.postDeclarations);
    if (child.groupable) {
      if (!results.groupable) results.groupable = new Set();
      for (const name of child.groupable) results.groupable.add(name);
    }
    results.groupId ||= child.groupId;
    if (child.exprs.length) {
      if (!doNotEscape && !child.spreadElement)
        child.exprs[0] = escapeExpression(path, child.exprs[0]);

      // textContent flows through here as a synthesized child; flag it
      // for grouping (see `transformAttributes`).
      const hoistOpts = node.node && node.node._groupableTextContent ? { group: true } : undefined;

      // boxed by textNodes
      if (markers && !child.spreadElement) {
        appendToTemplate(results.template, `<!--$-->`);
        results.template.push("");
        results.templateValues.push(hoistExpression(path, results, child.exprs[0], hoistOpts));
        appendToTemplate(results.template, `<!--/-->`);
      } else {
        results.template.push("");
        results.templateValues.push(hoistExpression(path, results, child.exprs[0], hoistOpts));
      }
    }
  });
}

function createElement(path: any, { topLevel, hydratable }: any) {
  const tagName = getTagName(path.node),
    config = getConfig(path),
    attributes = normalizeAttributes(path),
    doNotEscape = path.doNotEscape;

  const filteredChildren = filterChildren(path.get("children")),
    multi = checkLength(filteredChildren),
    markers = hydratable && multi,
    childNodes = filteredChildren.reduce((memo, path) => {
      if (t.isJSXText(path.node)) {
        const v = decode(trimWhitespace(path.node.extra.raw));
        if (v.length) memo.push(t.stringLiteral(v));
      } else {
        if (path.isJSXFragment()) {
          throw new Error(
            `Fragments can only be used top level in JSX. Not used under a <${tagName}>.`
          );
        }
        const child = transformNode(path);
        if (markers && child.exprs.length && !child.spreadElement)
          memo.push(t.stringLiteral("<!--$-->"));
        if (child.exprs.length && !doNotEscape && !child.spreadElement)
          child.exprs[0] = escapeExpression(path, child.exprs[0]);
        memo.push(getCreateTemplate(config, path, child)(path, child, false));
        if (markers && child.exprs.length && !child.spreadElement)
          memo.push(t.stringLiteral("<!--/-->"));
      }
      return memo;
    }, []);

  let props: any[];
  if (attributes.length === 1) {
    props = [attributes[0].node.argument];
  } else {
    props = [];
    let runningObject: any[] = [],
      dynamicSpread = false,
      hasChildren = path.node.children.length > 0;

    attributes.forEach((attribute: any) => {
      const node = attribute.node;
      if (t.isJSXSpreadAttribute(node)) {
        if (runningObject.length) {
          props.push(t.objectExpression(runningObject));
          runningObject = [];
        }
        props.push(
          isDynamic(attribute.get("argument"), {
            checkMember: true
          }) && (dynamicSpread = true)
            ? inlineCallExpression(node.argument)
            : node.argument
        );
      } else {
        const value = node.value || t.booleanLiteral(true),
          id = convertJSXIdentifier(node.name),
          key = t.isJSXNamespacedName(node.name)
            ? `${node.name.namespace.name}:${node.name.name.name}`
            : node.name.name;

        if (hasChildren && key === "children") return;
        if (key === "ref") return;
        if (key.startsWith("prop:") || key.startsWith("on")) return;
        if (t.isJSXExpressionContainer(value))
          if (
            isDynamic(attribute.get("value").get("expression"), {
              checkMember: true,
              checkTags: true
            })
          ) {
            runningObject.push(
              t.objectMethod(
                "get",
                id,
                [],
                t.blockStatement([t.returnStatement(value.expression)]),
                !t.isValidIdentifier(key)
              )
            );
          } else runningObject.push(t.objectProperty(id, value.expression));
        else runningObject.push(t.objectProperty(id, value));
      }
    });

    if (runningObject.length || !props.length) props.push(t.objectExpression(runningObject));

    if (props.length > 1 || dynamicSpread) {
      props = [t.callExpression(registerImportMethod(path, "mergeProps"), props)];
    }
  }

  const exprs = [
    t.callExpression(registerImportMethod(path, "ssrElement"), [
      t.stringLiteral(tagName),
      props[0],
      childNodes.length
        ? hydratable
          ? t.arrowFunctionExpression(
              [],
              childNodes.length === 1 ? childNodes[0] : t.arrayExpression(childNodes)
            )
          : childNodes.length === 1
            ? childNodes[0]
            : t.arrayExpression(childNodes)
        : t.identifier("undefined"),
      t.booleanLiteral(Boolean(topLevel && config.hydratable))
    ])
  ];
  return { exprs, template: "", declarations: [], spreadElement: true };
}
