import { makeObservable, observable, action } from 'mobx'
import { Uploader } from '../models'

class ImageStore {
  @observable filename = ''
  @observable file: any = null
  @observable isUploading = false
  @observable serverFile: any = null

  constructor() {
    makeObservable(this)
  }

  @action setFilename(newFilename: string) {
    this.filename = newFilename
  }

  @action setFile(newFile: any) {
    this.file = newFile
  }

  @action upload() {
    this.isUploading = true
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename)
        .then((serverFile: any) => {
          this.serverFile = serverFile
          resolve(serverFile)
        })
        .catch((err: any) => {
          console.log('上传失败')
          reject(err)
        })
        .finally(() => {
          this.isUploading = false
        })
    })
  }
}

export default new ImageStore()
