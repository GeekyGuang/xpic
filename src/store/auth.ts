import { makeObservable, observable, action } from 'mobx'

export class AuthStore {
  @observable isLogin = false
  @observable isLoading = false
  @observable values = {
    username: 'aaa',
    password: '',
  }

  constructor() {
    makeObservable(this)
  }

  @action setIsLoading(isLogin: boolean) {
    this.isLogin = isLogin
  }

  @action setUsername(username: string) {
    console.log(username)
    this.values.username = username
  }

  @action setPassword(password: string) {
    this.values.password = password
  }

  @action login() {
    console.log('登录中')
    this.isLoading = true
    setTimeout(() => {
      console.log('登录成功')
      this.isLogin = true
      this.isLoading = false
    }, 1000)
  }

  @action register() {
    console.log('注册中')
    this.isLoading = true
    setTimeout(() => {
      console.log('注册成功')
      this.isLoading = false
    }, 1000)
  }

  @action logout() {
    this.isLogin = false
    console.log('已注销')
  }
}
