import AV, { Query, User } from 'leancloud-storage'

AV.init({
  appId: 'rp4figvP1pteyxRAyzYjRSHo-gzGzoHsz',
  appKey: 'SsjIAupQFlvKqHtnpeOOan5j',
  serverURL: 'https://rp4figvp.lc-cn-n1-shared.com',
})

const Auth = {
  register(username: string, password: string) {
    const user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(
        (user) => resolve(user),
        (error) => reject(error)
      )
    })
  },

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(
        (user) => resolve(user),
        (error) => reject(error)
      )
    })
  },

  logOut() {
    User.logOut()
  },

  getCurrentUser() {
    return User.current()
  },
}

const Uploader = {
  add(file: any, filename: string) {
    const item = new AV.Object('Image')
    const avFile = new AV.File(filename, file)

    item.set('filename', filename)
    item.set('owner', AV.User.current())
    item.set('url', avFile)

    return new Promise((resolve, reject) => {
      item.save().then(
        (serverFile) => {
          console.log('保存成功')
          resolve(serverFile)
        },
        (error) => {
          console.log('保存失败')
          reject(error)
        }
      )
    })
  },
}

export { Auth, Uploader }
