import { makeObservable, observable, action } from 'mobx'
import { Auth } from '../models'
import UserStore from '../store/user'

class AuthStore {
  @observable isLogin = false
  @observable isLoading = false
  @observable values = {
    username: 'jack',
    password: '1234',
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
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password).then(
        (user) => {
          console.log('登录成功')
          UserStore.fetchUser()
          resolve(user)
        },
        (err) => {
          console.log('登录失败')
          reject(err)
        }
      )
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then(
        (user) => {
          console.log('注册成功')
          UserStore.fetchUser()
          resolve(user)
        },
        (err) => {
          console.log('注册失败')
          reject(err)
        }
      )
    })
  }

  @action logout() {
    Auth.logOut()
    UserStore.resetUser()
    console.log('已注销')
  }
}

export default new AuthStore()
