import { message } from 'antd'
import { makeObservable, observable, action } from 'mobx'
import { Uploader } from '../models'

class HistoryStore {
  @observable list = []
  @observable isLoading = false
  @observable hasMore = true
  @observable page = 0
  limit = 10

  constructor() {
    makeObservable(this)
  }

  @action append(newList) {
    this.list = this.list.concat(newList)
  }

  @action get() {
    this.isLoading = true
    Uploader.get(this.page, this.limit)
      .then((newList) => {
        this.append(newList)
        console.log(this.list)
        this.page++
        if ((newList as any).length < this.limit) {
          this.hasMore = false
        }
      })
      .catch((error) => {
        message.error('加载数据失败')
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}

export default new HistoryStore()
