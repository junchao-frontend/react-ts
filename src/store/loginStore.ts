import { makeAutoObservable } from 'mobx'
import { loginForm } from '../types/login'
import axios from 'axios'
class LoginStore {
  token: string = ''
  constructor() {
    makeAutoObservable(this)
  }
  setToken = async (loginData: loginForm) => {
    const { mobile, code } = loginData
    const res = await axios.post(
      'http://geek.itheima.net/v1_0/authorizations',
      {
        mobile,
        code,
      }
    )
    sessionStorage.setItem('token', res.data.data.token)
  }
}
export default LoginStore
