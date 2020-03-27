import { mount, createLocalVue } from '@vue/test-utils'
import RegisterPage from '@/views/RegisterPage'
import VueRouter from 'vue-router'

const localVue = createLocalVue() //vue-test-utils 에서 제공하는 함수
localVue.use(VueRouter)  //테스트에 Vue Router 추가
const router = new VueRouter()

//registrationService 의 Mock
jest.mock('@/services/registration')

//Jest의 describe API 로 관련된 테스트를 모아 하나의 테스트 슈트(test suite) 만듬
describe('RegisterPage.vue', () => {
  /*
  데이터 모델의 초기값 테스트
  데이터 모델과 폼 입력 필드 간의 바인딩 테스트
  폼 이벤트 핸들러의 존재 여부 테스트
   */

  let wrapper
  let fieldUsername
  let fieldEmailAddress
  let fieldPassword
  let buttonSubmit

  //beforeEach() 사용해서 변수 초기화
  beforeEach(() => {
    //test-utils 에서 가져온 mount 함수 사용, 마운트 및 렌더링이 완료된 RegisterPage.vue 컴포넌트를 포함하넌 wrapper 객체 생성
    wrapper = mount(RegisterPage, {
      localVue,
      router
    })

    //wrapper.find() 는 선택자에 해당하는 HTML 요서 찾아주는 vue-test-utils API, 결과또한 하나의 Wrapper 객체
    fieldUsername = wrapper.find('#username')
    fieldEmailAddress = wrapper.find('#emailAddress')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('form button[type="submit"]')
  })

  //모든 테스트의 실행이 완료되면 호출
  afterAll(() => {
    jest.restoreAllMocks() //registrationService 를 복구
  })

  //it(name {테스트명}, fn  {테스트의 예상값을 포함하는 함수}, timeout {ms, 생략가능, default 5000(5초)})
  //함수는 Jest의 API 인 test(name, fn ,timeout) 의 별명
  it('should render registration form', () => {
    expect(wrapper.find('.logo').attributes().src).toEqual('/static/images/logo.png')
    expect(wrapper.find('.tagline').text()).toEqual('Open source task management tool')

    expect(fieldUsername.element.value).toEqual('')
    expect(fieldEmailAddress.element.value).toEqual('')
    expect(fieldPassword.element.value).toEqual('')
    expect(buttonSubmit.text()).toEqual('Create account')
  })

  //데이터 모델의 초기값 검증
  it('should contain data model with initial values', () => {
    expect(wrapper.vm.form.username).toEqual('') //wrapper.vml 으로 Vue 인스턴스에 접근, vm 의 모든 메소드와 프로퍼티에 접근 가능
    expect(wrapper.vm.form.emailAddress).toEqual('')
    expect(wrapper.vm.form.password).toEqual('')
  })

  //폼의 입력과 데이터 모델의 바인딩 검증
  // it('should have form inputs bound with data model', () => {
  //   const username = 'sunny'
  //   const emailAddress = 'sunny@local'
  //   const password = 'VueJsRocks!'
  //
  //   wrapper.vm.form.username = username
  //   wrapper.vm.form.emailAddress = emailAddress
  //   wrapper.vm.form.password = password
  //
  //   expect(fieldUsername.element.value).toEqual(username)
  //   expect(fieldEmailAddress.element.value).toEqual(emailAddress)
  //   expect(fieldPassword.element.value).toEqual(password)
  // })

  //제출 핸들러의 존재 여부 확인 테스트
  it('should have form submit event handler `submitForm`', () => {
    const stub = jest.fn() //jest 로 stub 생성
    wrapper.setMethods({submitForm: stub}) //wrapper.setMethods API로 submiForm 을 만든 스텁을 대체
    buttonSubmit.trigger('submit') //이벤트 발생
    expect(stub).toBeCalled() //stub 이 호출됐는지 검증
  })

  //회원가입 검증 테스트
  it('should register when it is a new user', () => {
    const stub = jest.fn()
    wrapper.vm.$router.push = stub //리다이렉트 발생 체크
    wrapper.vm.form.username = 'sunny'
    wrapper.vm.form.emailAddress = 'sunny@local'
    wrapper.vm.form.password = 'Jest!'
    wrapper.vm.submitForm()

    wrapper.vm.$nextTick(() => {
      expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
    })
  })


})




