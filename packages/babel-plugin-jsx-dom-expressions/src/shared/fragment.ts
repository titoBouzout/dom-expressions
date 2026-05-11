import * as t from "@babel/types";
import { decode } from "html-entities";
import { filterChildren, trimWhitespace, checkLength } from "./utils";
import { transformNode, getCreateTemplate } from "./transform";
import type { NodePath } from "@babel/traverse";
import type { JSXDOMExpressionsConfig } from "../config";
import type { TransformResult } from "../types";

export default function transformFragmentChildren(
  children: NodePath[],
  results: TransformResult,
  config: JSXDOMExpressionsConfig
) {
  const filteredChildren = filterChildren(children) as NodePath[],
    childNodes = filteredChildren.reduce((memo: t.Expression[], path: NodePath) => {
      if (t.isJSXText(path.node)) {
        const v = decode(trimWhitespace(path.node.extra?.raw ?? ""));
        if (v.length) memo.push(t.stringLiteral(v));
      } else {
        const child = transformNode(path, {
          topLevel: true,
          fragmentChild: true,
          lastElement: true
        });
        if (child)
          memo.push(
            getCreateTemplate(config, path, child as TransformResult)(
              path,
              child as TransformResult,
              true
            )
          );
      }
      return memo;
    }, []);
  results.exprs.push(childNodes.length === 1 ? childNodes[0] : t.arrayExpression(childNodes));
}
