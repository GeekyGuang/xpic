import { useStore } from '../store'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import Loading from './Loading'

const { Dragger } = Upload

const Result = styled.div`
  margin-top: 20px;

  > dl {
    border: 1px dashed #6ebcfc;
    background: #fafafa;
    padding: 20px;

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
    }

    a {
      display: inline-block;
      width: 100%;
      border: 1px solid #d9d9d9;
      padding: 4px;
      white-space: wrap;
      word-wrap: break-word;
      background: white;
    }

    img {
      max-height: 280px;
      max-width: 100%;
      object-fit: contain;
    }
  }
`

const Uploader = observer(() => {
  const { ImageStore } = useStore()

  const props = {
    showUploadList: false,
    beforeUpload: (file: any) => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
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
          <h2>上传图片</h2>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片到这里上传</p>
            <p className="ant-upload-hint">
              严禁上传色情/暴力/侵犯版权等违规图片
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
                <a
                  target="_blank"
                  href={ImageStore.serverFile.attributes.url.attributes.url}
                  rel="noreferrer"
                >
                  {ImageStore.serverFile.attributes.url.attributes.url}
                </a>
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
              <dt>更多尺寸</dt>
              <dd>...</dd>
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
