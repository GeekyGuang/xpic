import { observable, action } from 'mobx'

export class AuthStore {
  @observable isLogin = false
  @observable isLoading = false
  @observable values = {
    username: '',
    password: '',
  }

  @action setIsLoading(isLogin: boolean) {
    this.isLogin = isLogin
  }

  @action setUsername(username: string) {
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
