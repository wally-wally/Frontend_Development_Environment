module.exports = function myBabelPlugin() {
  return {
    visitor: {
      // https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-block-scoping/src/index.js#L26
      VariableDeclaration(path) { // 파싱된 결과를 path 인자로 받는다.
        console.log('VariableDeclaration() kind:', path.node.kind); // const
        
        // const => var 변환
        if (path.node.kind === 'const') {
          path.node.kind = 'var'
        }
      },
    },
  };
}