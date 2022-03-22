import { MutableRefObject, useRef } from 'react'
import { useStore } from '../store'

const Uploading = () => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const { ImageStore } = useStore()
  const handleUpload = () => {
    if (inputRef.current.files && inputRef.current.files.length > 0) {
      ImageStore.setFile(inputRef.current.files[0])
      ImageStore.setFilename(inputRef.current.files[0].name)
      ImageStore.upload()
        .then((file) => console.dir(file))
        .catch((err) => {
          console.error(err)
        })
    }
  }
  return (
    <>
      <h2>文件上传</h2>
      <input type="file" ref={inputRef} onChange={handleUpload} />
    </>
  )
}

export default Uploading
