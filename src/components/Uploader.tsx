import { useStore } from '../store'
import { Button, message, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { observer, useLocalStore } from 'mobx-react'
import styled from 'styled-components'
import Loading from './Loading'
import { MutableRefObject, useRef } from 'react'

const { Dragger } = Upload

const Result = styled.div`
  margin-top: 20px;
  border: 1px dashed #6ebcfc;
  background: #fafafa;
  padding: 20px;

  > h2 {
    text-align: center;
  }

  > dl {
    .filename {
      border: 1px solid #d9d9d9;
      width: 100%;
      padding: 4px;

      &:focus {
        outline: none;
      }
    }

    > dt {
      padding-bottom: 6px;
      font-weight: 600;
    }

    img {
      max-height: 280px;
      max-width: 100%;
      object-fit: contain;
    }

    .resize {
      > input {
        width: 100px;
        border: 1px solid #d9d9d9;
        padding: 4px;

        &:focus {
          outline: none;
        }
      }
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Uploader = observer(() => {
  const { ImageStore } = useStore()
  const onlineUrlRef = useRef() as MutableRefObject<HTMLInputElement>
  const resizeUrlRef = useRef() as MutableRefObject<HTMLInputElement>
  const widthRef = useRef() as MutableRefObject<HTMLInputElement>
  const heightRef = useRef() as MutableRefObject<HTMLInputElement>

  const store = useLocalStore(() => ({
    width: '',
    setWidth() {
      store.width = widthRef.current.value
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },
    height: '',
    setHeight() {
      store.height = heightRef.current.value
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },
    get fullStr() {
      return (
        ImageStore.serverFile.attributes.url.attributes.url +
        '?imageView2/0' +
        store.widthStr +
        store.heightStr
      )
    },
  }))

  const handleCopy = (ref) => {
    ref.select()
    document.execCommand('copy')
    message.success('复制成功')
  }

  const props = {
    showUploadList: false,
    beforeUpload: (file: any) => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)

      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/gi.test(file.type)) {
        message.error('仅支持 png/svg/jpg/jpeg/gif 格式的图片')
        return false
      }

      if (file.size > 2048 * 1024) {
        message.error('图片最大支持2M')
        return false
      }

      ImageStore.upload()
        .then((file) => console.dir(file))
        .catch((err) => {
          console.error(err)
        })
      return false
    },
  }

  return (
    <>
      {ImageStore.isUploading ? (
        <>
          <Loading />
          <p
            style={{ textAlign: 'center', fontSize: '18px', color: '#40a9ff' }}
          >
            努力上传中...
          </p>
        </>
      ) : (
        <>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片到这里上传</p>
            <p className="ant-upload-hint">
              仅支持 png/svg/gif/jpg/jpeg 格式, 图片最大2M
            </p>
          </Dragger>
        </>
      )}

      <div>
        {ImageStore.serverFile ? (
          <Result>
            <h2>上传结果</h2>
            <dl>
              <dt>线上地址</dt>
              <dd>
                <input
                  type="text"
                  className="filename"
                  value={ImageStore.serverFile.attributes.url.attributes.url}
                  ref={onlineUrlRef}
                  readOnly
                />
                <ButtonWrapper>
                  <Button
                    type="default"
                    size="small"
                    onClick={() => handleCopy(onlineUrlRef.current)}
                  >
                    复制
                  </Button>
                  <Button type="default" size="small">
                    <a
                      target="_blank"
                      href={ImageStore.serverFile.attributes.url.attributes.url}
                      rel="noreferrer"
                    >
                      打开
                    </a>
                  </Button>
                </ButtonWrapper>
              </dd>
              <dt>文件名</dt>
              <dd>
                <input
                  className="filename"
                  type="text"
                  value={ImageStore.filename}
                  readOnly
                />
              </dd>
              <dt>图片预览</dt>
              <dd>
                <img
                  src={ImageStore.serverFile.attributes.url.attributes.url}
                  alt=""
                />
              </dd>
              <dt>自定义尺寸</dt>
              <dd className="resize">
                <input
                  type="text"
                  placeholder=" 宽度(可选)"
                  value={store.width}
                  ref={widthRef}
                  onChange={(e) => {
                    if (
                      e.target.value === '' ||
                      /^[1-9][0-9]*$/.test(e.target.value)
                    ) {
                      store.setWidth()
                    }
                  }}
                />{' '}
                -{' '}
                <input
                  type="text"
                  placeholder=" 高度(可选)"
                  ref={heightRef}
                  value={store.height}
                  onChange={(e) => {
                    if (
                      e.target.value === '' ||
                      /^[1-9][0-9]*$/.test(e.target.value)
                    ) {
                      store.setHeight()
                    }
                  }}
                />
              </dd>
              <dd>
                <input
                  type="text"
                  className="filename"
                  readOnly
                  ref={resizeUrlRef}
                  value={store.fullStr}
                />
                <ButtonWrapper>
                  <Button
                    type="default"
                    size="small"
                    onClick={() => {
                      handleCopy(resizeUrlRef.current)
                    }}
                  >
                    复制
                  </Button>
                  <Button type="default" size="small">
                    <a target="_blank" href={store.fullStr} rel="noreferrer">
                      打开
                    </a>
                  </Button>
                </ButtonWrapper>
              </dd>
            </dl>
          </Result>
        ) : (
          ''
        )}
      </div>
    </>
  )
})

export default Uploader
