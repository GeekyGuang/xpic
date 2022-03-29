import { message } from 'antd'
import { makeObservable, observable, action } from 'mobx'
import { Uploader } from '../models'

class HistoryStore {
  @observable list = []
  @observable isLoading = false
  @observable hasMore = true
  @observable page = 0
  limit = 20

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
        console.log('我在historyStore get')
        console.log(this.list)
        this.page++
        if ((newList as any).length < this.limit) {
          this.hasMore = false
        }
      })
      .catch((error) => {
        console.log('historyStore get失败')
        message.error('加载数据失败')
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  @action resetHistory() {
    this.list = []
    this.isLoading = false
    this.hasMore = true
    this.page = 0
  }
}

export default new HistoryStore()
