import config from "../config";
import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import type { JSXDOMExpressionsPass } from "../types";
import type { JSXDOMExpressionsConfig } from "../config";

type BabelFileWithConfig = {
  ast: t.File;
  metadata: {
    config?: JSXDOMExpressionsConfig;
  };
};

export default (path: NodePath<t.Program>, state: JSXDOMExpressionsPass) => {
  const file = (path.hub as unknown as { file: BabelFileWithConfig }).file;
  const merged = (file.metadata.config = Object.assign({}, config, state.opts));
  const lib = merged.requireImportSource;
  if (lib) {
    const comments = file.ast.comments ?? [];
    let process = false;
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const pieces = comment.value.split("@jsxImportSource");
      if (pieces.length === 2 && pieces[1].trim() === lib) {
        process = true;
        break;
      }
    }
    if (!process) {
      state.skip = true;
      return;
    }
  }
};
