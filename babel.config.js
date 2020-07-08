module.exports = {
  presets: [
    // './my-babel-preset.js' // 커스텀 프리셋

    // 실무에서는 preset-env과 같이 이미 만들어진 프리셋을 가져와서 사용한다.
    // ['사용할 preset명, 해당 preset의 option 설정]
    ['@babel/preset-env', {
      targets: {
        chrome: '79',
        ie: '11' // IE11에서도 동작하도록 설정
        // 참고로 IE11에서 async/await 나 generator 구문을 사용하기 위해서는 regenerator-runtime 라이브러리를 추가로 설치해야 한다.
      },
      // babel이 변환하지 못하는 코드는 polyfill이라 부르는 코드조각을 불러와 결과물에 로딩해서 해결한다.
      useBuiltIns: 'usage', // polyfill 사용 여부 설정
      corejs: {
        version: 2 // polyfill 버전 지정
      }
    }]
  ]
}