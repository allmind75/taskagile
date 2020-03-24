// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

//browser는 나이트 왓치가 제공하는 매개변수이며 브라우저를 제어하는데 활용

module.exports = {  //Node.js에서의 모듈 정의
  'login test': function (browser) {  //나이트왓치 테스트 모듈 작성, 여러개의 스템 포함 가능, 현재 login test만 작성, 각 테스트는 모듈에 속한 하나의 메소드
    browser
      .url(process.env.VUE_DEV_SERVER_URL + 'login') //로그인 페이지 열기
      .waitForElementVisible('#app', 5000) //#app 요소가 5초안에 보이는지 검증
      .assert.containsText('h1', 'TaskAgile') //나이트왓치 assert API 로 h1 요소가 TaskAgile 텍스트를 포함하는지 검증
      .end() //테스트를 종료하고 셀레니움(Selenium) 세션을 적절하게 종료
  }
}


// module.exports = {
//   'default e2e tests': browser => {
//     browser
//       .init()
//       .waitForElementVisible('#app')
//       .assert.elementPresent('.hello')
//       .assert.containsText('h1', 'Welcome to Your Vue.js App')
//       .assert.elementCount('img', 1)
//       .end()
//   },

//   'example e2e test using a custom command': browser => {
//     browser
//       .openHomepage()
//       .assert.elementPresent('.hello')
//       .end()
//   }
// }
