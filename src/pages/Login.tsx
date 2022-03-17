import { useStore } from '../store'
import { observer } from 'mobx-react'
import { MutableRefObject, useRef } from 'react'

const Login = observer(() => {
  const { AuthStore } = useStore()
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const handleInput = () => {
    AuthStore.setUsername(inputRef.current.value)
  }
  return (
    <>
      <div>Login: {AuthStore.values.username}</div>
      <input type="text" onChange={handleInput} ref={inputRef} />
    </>
  )
})

export default Login
