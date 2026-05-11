import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import type { JSXDOMExpressionsConfig, RendererName } from "./config";

export interface JSXDOMExpressionsPass {
  opts: Partial<JSXDOMExpressionsConfig>;
  skip?: boolean;
}

export interface TemplateRecord {
  id: t.Identifier;
  template: string | t.Expression;
  templateWithClosingTags?: string | t.Expression;
  isImportNode?: boolean;
  isWrapped?: boolean;
  renderer: RendererName;
}

export interface ProgramScopeData {
  imports?: Map<string, t.Identifier>;
  templates?: TemplateRecord[];
  events?: Set<string>;
}

export interface TransformResult {
  template: string;
  declarations: t.Statement[];
  exprs: t.Expression[];
  dynamics: t.Expression[];
  postExprs?: t.Expression[];
  id?: t.Identifier;
  text?: boolean;
  dynamic?: boolean;
  tagName?: string;
  renderer?: RendererName;
  isImportNode?: boolean;
  isWrapped?: boolean;
  skipTemplate?: boolean;
  templateWithClosingTags?: string;
  children?: TransformResult[];
}

export type BabelPath<TNode extends t.Node = t.Node> = NodePath<TNode>;
