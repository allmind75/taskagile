import Vue from 'vue'
import LoginPage from '@/views/LoginPage' //test 파일

describe('LoginPage.vue', () => { //제스트의 describe API 로 관련된 테스트를 모아 하나의 테스트 슈트(test suite) 만듬
  it('should render correct contents', () => {  //it(name {테스트명}, fn  {테스트의 예상값을 포함하는 함수}, timeout {ms, 생략가능, default 5000(5초)}) 함수는 제스트의 API 인 test(name, fn ,timeout) 의 별명
    const Constructor = Vue.extend(LoginPage) //LoginPage 생성
    const vm = new Constructor().$mount() //LoginPage 의 Vue 인스턴스 생성, $mount() 메소드가 호출되면 LoginPage 의 Vue 인스턴스가 페이지에 랜더링된것으로 봄
    expect(vm.$el.querySelector('h1').textContent)  //제스트 API - expect.toEqual(), 
      .toEqual('TaskAgile')
  })
})

// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
