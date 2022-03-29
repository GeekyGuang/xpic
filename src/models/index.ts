import { message } from 'antd'
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

  get(page = 0, limit = 10) {
    const query = new Query('Image')
    query.include('owner')
    query.include('url')
    query.limit(limit)
    query.skip(page * limit)
    query.descending('createAt')
    query.equalTo('owner', AV.User.current())
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((images) =>
          resolve(images.filter((image: any) => image.attributes.url))
        )
        .catch((error) => reject(error))
    })
  },

  delete(id) {
    const file = AV.File.createWithoutData(id)
    file.destroy()
  },
}

const handleCopy = (ref) => {
  ref.select()
  document.execCommand('copy')
  message.success('复制成功')
}

export { Auth, Uploader, handleCopy }
