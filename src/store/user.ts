import { makeObservable, observable, action } from 'mobx'
import Auth from '../models'

class UserStore {
  @observable currentUser:any = null

  constructor() {
    makeObservable(this)
  }

  @action fetchUser() {
    this.currentUser = Auth.getCurrentUser()
  }

  @action resetUser() {
    this.currentUser = null
  }

}

export default new UserStore();
