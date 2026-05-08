import * as t from "@babel/types";
import { getConfig, getNumberedId, registerImportMethod, wrapForEffect } from "../shared/utils";
import { setAttr } from "./element";

export function createTemplate(path, result, wrap) {
  const config = getConfig(path);
  if (result.id) {
    result.decl = t.variableDeclaration("var", result.declarations);
    if (
      !(result.exprs.length || result.dynamics.length || result.postExprs.length) &&
      result.decl.declarations.length === 1
    ) {
      return result.decl.declarations[0].init;
    } else {
      const dynamicsStmt = wrapDynamics(path, result.dynamics);
      const stmts = [
        result.decl,
        ...result.exprs,
        ...(dynamicsStmt ? [dynamicsStmt] : []),
        ...(result.postExprs || [])
      ];

      // Statement-position optimization — see `dom/template.js` for the
      // rationale and predicate semantics.
      const isReturnArg = t.isReturnStatement(path.parent) && path.parent.argument === path.node;
      const isVarInit = t.isVariableDeclarator(path.parent) && path.parent.init === path.node;

      if (isReturnArg || isVarInit) {
        path.getStatementParent().insertBefore(stmts);
        return result.id;
      }

      // Fallback: keep the IIFE for ternary branches / array elements /
      // function args / logical expressions where lifting would change
      // observable evaluation semantics.
      return t.callExpression(
        t.arrowFunctionExpression([], t.blockStatement([...stmts, t.returnStatement(result.id)])),
        []
      );
    }
  }
  if (wrap && result.dynamic && config.memoWrapper) {
    return t.callExpression(registerImportMethod(path, config.memoWrapper), [result.exprs[0]]);
  }
  return result.exprs[0];
}

function wrapDynamics(path, dynamics) {
  if (!dynamics.length) return;
  const config = getConfig(path);

  const effectWrapperId = registerImportMethod(path, config.effectWrapper);

  if (dynamics.length === 1) {
    const prevValue = t.identifier("_$p");
    const newValue = t.identifier("_v$");

    return t.expressionStatement(
      t.callExpression(effectWrapperId, [
        wrapForEffect(dynamics[0].value),
        t.arrowFunctionExpression(
          [newValue, prevValue],
          t.blockStatement([
            t.expressionStatement(
              setAttr(path, dynamics[0].elem, dynamics[0].key, newValue, {
                dynamic: true,
                prevId: prevValue
              })
            )
          ])
        )
      ])
    );
  }

  const prevId = t.identifier("_p$");

  /** @type {t.ObjectProperty[]} */
  const values = [];
  /** @type {t.ExpressionStatement[]} */
  const statements = [];
  /** @type {t.Identifier[]} */
  const properties = [];

  dynamics.forEach(({ elem, key, value }, index) => {
    const propIdent = t.identifier(getNumberedId(index));
    const propMember = t.memberExpression(prevId, propIdent);
    const optionalPropMember = t.optionalMemberExpression(prevId, propIdent, false, true);

    properties.push(propIdent);
    values.push(t.objectProperty(propIdent, value));

    statements.push(
      t.expressionStatement(
        t.logicalExpression(
          "&&",
          t.binaryExpression("!==", propIdent, optionalPropMember),
          setAttr(path, elem, key, propIdent, { dynamic: true, prevId: optionalPropMember })
        )
      )
    );
  });

  return t.expressionStatement(
    t.callExpression(effectWrapperId, [
      t.arrowFunctionExpression([], t.objectExpression(values)),
      t.arrowFunctionExpression(
        [t.objectPattern(properties.map(id => t.objectProperty(id, id, false, true))), prevId],
        t.blockStatement(statements)
      )
    ])
  );
}
