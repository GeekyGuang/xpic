import { useStore } from '../store'
import { observable } from 'mobx'

const Login = observable(() => {
  const a = useStore()
  console.log(a)
  return <div>Login: </div>
})

export default Login
