// 참고로 style-loader가 HMR 인터페이스를 구현한 로더이므로 핫 로딩을 지원한다.
import "./app.css";
// import nyancat from "./nyancat.jpg";
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  console.log(res);

  // document.body.innerHTML = `
  //   <img src="${nyancat}" />
  // `;
  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

// devServer.hot 옵션을 켜면 웹팩 개발 서버 위에서 module.hot 객체가 생성된다.
// accept() 메소드는 감시할 모듈과 콜백 함수를 인자로 받는다.
if (module.hot) {
  console.log("핫 모듈 켜짐");

  module.hot.accept("./result", () => {
    console.log("result 모듈 변경됨");
  });
}

// console.log(process.env.NODE_ENV);
// console.log(TWO);
// console.log(THREE);
// console.log(api.domain);
