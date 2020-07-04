const path = require('path');

module.exports = { // ES6의 모듈 시스템이 아닌 node에서 사용하는 모듈 시스템임을 유의하자!
  mode: 'development', // webpack 실행 모드
  entry: { // 의존 관계에 있는 모듈들의 시작점
    main: './src/app.js'
  },
  output: { // 번들링된 결과물을 저장하는 위치
    path: path.resolve('./dist'), // 절대 경로를 계산해주는 resolve 함수
    filename: '[name].js' // main.js 이름으로 output 파일이 자동 생성
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,  // 로더가 처리해야하는 파일들의 패턴(정규표현식)
      //   use: [ // 사용할 로더를 명시
      //     path.resolve('./my-webpack.loader.js')
      //   ]
      // }
      {
        test: /\.css$/,
        use: [ // 순서는 배열의 뒤에서부터 시작된다.
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}