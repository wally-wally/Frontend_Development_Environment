const path = require('path');
// const MyWebpackPlugin = require('./my-webpack-plugin');
const webpack = require('webpack');
const childProcess = require('child_process');
// HTML 파일을 빌드 과정에 추가하는 플러그인 / 동적으로 생성되는 CSS, JS 파일 그리고 빌드 타임에 결정되는 값(변수)들을 템플릿단에 넣어서 HTML 파일을 동적으로 만들어준다.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// build할 때마다 기존에 있던 dist 폴더를 삭제하고 새로운 dist 폴더로 자동으로 바꿔줌(export default가 아니므로 중괄호 꼭 쓸 것)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 번들 결과에서 스타일시트 코드만 뽑아서 별도의 CSS 파일로 만들어 역할에 따라 파일을 분리해줌(CSS를 별도 파일로 뽑아내는 플러그인)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = { // ES6의 모듈 시스템이 아닌 node에서 사용하는 모듈 시스템임을 유의하자!
  mode: 'development', // webpack 실행 모드
  entry: { // 의존 관계에 있는 모듈들의 시작점
    // main: './src/app.js' // webpack-기본편 실습시 해당 코드로 설정
    main: './app.js' // babel 실습시 해당 코드로 설정
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
          // mini-css-extract-plugin을 사용하려면 style-loader가 아닌 mini-css-extract-plugin에서 기본으로 제공하는 loader를 사용해야 한다.
          // 그래서 development 또는 production 환경에 따라 실행되는 loader를 다르게 하도록 구문을 수정하자.
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          : 'style-loader',
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
          // publicPath: './dist/', // 아까는 index.html 파일이 src 폴더 위에 있었지만 HtmlWebpackPlugin 설치 후에는 src 폴더 안으로 들어갔기 때문에 빌드된 결과물이 dist 폴더안에 index.html이 자동으로 생기므로 앞에 prefix로 ./dist/ 경로를 붙이지 않아도 된다.
          name: '[name].[ext]?[hash]',
          limit: 20000, // 파일 용량 세팅(20[KB]로 세팅함)
          // 이미지 파일을 처리할 때 20[KB] 미만의 파일들은 url-loader를 이용해서 Base64로 인코딩하여 자바스크립트 문자열로 변환한다.
          // 만약 20[KB] 이상인 경우 file-loader를 이용하게 된다.
          // 그래서 20[KB] 이하인 nyancat.jpg는 빌드된 main.js 파일 안에 url로 처리되어 들어간다.
          // 20[KB] 이상인 bg.png는 file-loader로 처리되어 bg.png 파일이 dist 폴더 안에 들어오게 된다.
        }
      },
      { // 다음과 같이 babel-loader로 webpack과 함께 사용하면 훨씬 단순하고 자동화된 프론트엔드 개발환경을 갖출 수 있다.
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [ // output으로 만들어진 번들링 결과물의 후처리를 담당
    // new MyWebpackPlugin(),
    new webpack.BannerPlugin({ // 번들링된 결과물 상단에 빌드 정보를 추가하는 플러그인
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
      `
    }),
    new webpack.DefinePlugin({ // 빌드 타임에 결정되는 환경 변수를 어플리케이션 단에 주입하기 위해 사용(ex. api의 주소)
      TWO: '1+1',
      THREE: JSON.stringify('1+2'), // 계산된 코드가 아닌 코드 텍스트 그 자체로 가져오고 싶을 때 JSON.stringify() 메소드 사용
      'api.domain': JSON.stringify('http://dev.api.domain.com')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      minify: process.env.NODE_ENV === 'production' ? { // production 환경 에서만 minify 옵션이 켜지도록 설정
        collapseWhitespace: true, // 빈 칸 제거 옵션
        removeComments: true, // 주석 제거 옵션
      } : false
    }),
    new CleanWebpackPlugin(),
    // MiniCssExtractPlugin은 JS에서 CSS 코드를 뽑아내는 것이기 때문에 굳이 development 환경에서는 JS 파일 하나로 빌드하는 것이 조금 더 빠르기 때문에 굳이 이 플러그인을 쓸 필요가 없다.
    // production 환경에서만 플러그인이 실행되도록 삼항 연산자로 작성하자.
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []
    )
  ]
}