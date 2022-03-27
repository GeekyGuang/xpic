import { makeObservable, observable, action } from 'mobx'
import { Auth } from '../models'

class UserStore {
  @observable currentUser: any = JSON.parse(window.localStorage.getItem('currentUser') || '""') || null

  constructor() {
    makeObservable(this)
  }

  @action saveUser() {
    window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
  }

  @action fetchUser() {
    this.currentUser = Auth.getCurrentUser().attributes
    console.log(this.currentUser)
    this.saveUser()
  }

  @action resetUser() {
    this.currentUser = null
    this.saveUser()
  }
}

export default new UserStore()
