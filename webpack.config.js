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
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     publicPath: './dist/', // file-loader가 처리하는 파일을 모듈로 사용할 때 경로 앞에 선언되는 공통 주소
      //     name: '[name].[ext]?[hash]' // file-loader가 파일을 output에 복사할 때 사용되는 파일명
      //     // 기본적으로 설정된 hash값을 쿼리스트링으로 옮겨서 선언한 형식으로 파일을 요청
      //     // 해쉬 값이 달라져서 캐싱과 관련된 문제를 해결할 수 있음
      //   }
      // },
      {
        test: /\.(png|jpg|gif|svg)$/, // png, jpg, gif, svg 확장자로 끝나는 파일들은 url-loader로 처리하겠다는 의미
        loader: 'url-loader', // 용량이 적은 파일들은 Data URI Scheme을 이용해서 Base64로 인코딩하여 문자열 형태로 소스코드에 넣는 방식을 이용한다.
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 20000, // 파일 용량 세팅(20[KB]로 세팅함)
          // 이미지 파일을 처리할 때 20[KB] 미만의 파일들은 url-loader를 이용해서 Base64로 인코딩하여 자바스크립트 문자열로 변환한다.
          // 만약 20[KB] 이상인 경우 file-loader를 이용하게 된다.
          // 그래서 20[KB] 이하인 nyancat.jpg는 빌드된 main.js 파일 안에 url로 처리되어 들어간다.
          // 20[KB] 이상인 bg.png는 file-loader로 처리되어 bg.png 파일이 dist 폴더 안에 들어오게 된다.
        }
      },
    ]
  }
}