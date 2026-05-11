declare module "@babel/plugin-syntax-jsx" {
  function jsx(): {
    manipulateOptions(opts: any, parserOpts: { plugins: string[] }): void;
  };
  const module: {
    default: typeof jsx;
  };
  export default module;
}

declare module "@babel/core" {
  interface BabelFileMetadata {
    config?: import("./config").JSXDOMExpressionsConfig;
  }
}
