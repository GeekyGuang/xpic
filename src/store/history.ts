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

  @action delete(id, i) {
    try {
      Uploader.delete(id)
      this.list.splice(i, 1)
      message.success('删除成功')
    } catch (e) {
      message.error('删除失败')
    }
  }

  @action resetHistory() {
    this.list = []
    this.isLoading = false
    this.hasMore = true
    this.page = 0
  }
}

export default new HistoryStore()
