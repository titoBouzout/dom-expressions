import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import type { JSXDOMExpressionsConfig, RendererName } from "./config";

export interface JSXDOMExpressionsPass {
  opts: Partial<JSXDOMExpressionsConfig>;
  skip?: boolean;
}

export interface TemplateRecord {
  id: t.Identifier;
  template: string | t.Expression | t.ArrayExpression;
  templateWithClosingTags?: string | t.Expression | t.ArrayExpression;
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
  template: any;
  templateValues?: any[];
  declarations: any[];
  postDeclarations?: any[];
  exprs: any[];
  dynamics: DynamicBinding[];
  postExprs?: any[];
  decl?: t.VariableDeclaration;
  id?: t.Identifier;
  text?: boolean;
  dynamic?: boolean;
  wontEscape?: boolean;
  tagName?: string;
  renderer?: RendererName;
  isImportNode?: boolean;
  isWrapped?: boolean;
  skipTemplate?: boolean;
  templateWithClosingTags?: string;
  children?: TransformResult[];
}

export interface DynamicBinding {
  elem: t.Expression;
  key: string;
  value: t.Expression;
  tagName?: string;
}

export interface SetAttrOptions {
  tagName?: string;
  dynamic?: boolean;
  prevId?: t.Expression;
}

export type BabelPath<TNode extends t.Node = t.Node> = NodePath<TNode>;
