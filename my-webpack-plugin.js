class MyWebpackPlugin {
  apply(compiler) {
    // compiler.hooks.done.tap('My Plugin', stats => { // plugin인 종료될 때 실행되는 함수
    //   console.log('MyPlugin: done');
    // })

    // compiler.plugin() 함수로 후처리한다
    compiler.plugin('emit', (compilation, callback) => {
      const source = compilation.assets['main.js'].source(); // webpack이 번들링한 결과에 접근 가능
      compilation.assets['main.js'].source = () => {
        const banner = [
          '/**',
          ' * 이것은 BannerPlugin이 처리한 결과입니다.',
          ' * Build Date: 2020-07-05',
          ' */'
        ].join('\n');
        return banner + '\n\n' + source;
      }
 
      callback();
    })
  }
}
module.exports = MyWebpackPlugin;