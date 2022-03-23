import { MutableRefObject, useRef } from 'react'
import { useStore } from '../store'
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Uploading = () => {
  const { ImageStore } = useStore()

  const props = {
    showUploadList: false,
    beforeUpload: (file:any) => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      ImageStore.upload()
        .then((file) => console.dir(file))
        .catch((err) => {
          console.error(err)
        })
      return false;
    },
  }

  return (
    <>
      <h2>文件上传</h2>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      <div>
        <h2>保存地址</h2>
        {ImageStore.serverFile ? ImageStore.serverFile.attributes.url.attributes.url : ''}
      </div>
    </>
  )
}

export default Uploading
