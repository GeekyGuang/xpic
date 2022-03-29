import { Button, Divider, List } from 'antd'
import { observer } from 'mobx-react'
import { useStore } from '../store'
import InfiniteScroll from 'react-infinite-scroll-component'
import { createRef, MutableRefObject, useEffect, useRef } from 'react'
import Loading from '../components/Loading'
import styled from 'styled-components'
import { handleCopy } from '../models'

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  width: 100%;
  gap: 8px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex: 1;
    input {
      margin-top: 4px;
      border: 1px solid #d9d9d9;
      width: 100%;
      padding: 4px;

      &:focus {
        outline: none;
      }
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
    }
  }
`

const History: React.FC = observer(() => {
  const { HistoryStore } = useStore()
  const inputRef = useRef<HTMLInputElement[]>([])
  // inputRef.current = HistoryStore.list.map(
  //   (element, i) => inputRef.current[i] ?? createRef()
  // )

  const loadMore = () => {
    console.log('loadmore')
    HistoryStore.get()
  }

  useEffect(() => {
    console.log('refs')
    console.log(inputRef.current)
  }, [inputRef.current])

  useEffect(() => {
    loadMore()
    return () => HistoryStore.resetHistory()
  }, [])

  return (
    <>
      <InfiniteScroll
        dataLength={HistoryStore.list.length}
        next={loadMore}
        loader={<Loading />}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
        endMessage={<Divider plain>没有更多了 🤐</Divider>}
      >
        <List
          dataSource={HistoryStore.list}
          //@ts-ignore
          renderItem={(item: any, i) =>
            item ? (
              <List.Item key={item.id}>
                <ListItem>
                  <div>
                    <img src={item.attributes.url.attributes.url} />
                  </div>
                  <div className="info">
                    <h5>{item.attributes.filename}</h5>
                    <h1>{i}</h1>
                    <input
                      type="text"
                      value={item.attributes.url.attributes.url}
                      readOnly
                      ref={(dom) => {
                        if (dom) inputRef.current[i] = dom
                      }}
                    />
                    <div className="buttons">
                      <Button
                        type="default"
                        size="small"
                        onClick={() => {
                          handleCopy(inputRef.current[i])
                        }}
                      >
                        复制
                      </Button>
                      <Button type="default" size="small">
                        <a
                          target="_blank"
                          href={item.attributes.url.attributes.url}
                          rel="noreferrer"
                        >
                          打开
                        </a>
                      </Button>
                      <Button type="primary" size="small" danger>
                        删除
                      </Button>
                    </div>
                  </div>
                </ListItem>
              </List.Item>
            ) : (
              ''
            )
          }
        ></List>
      </InfiniteScroll>
    </>
  )
})

export default History
