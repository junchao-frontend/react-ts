import { getUser } from '@/api/user'
import { makeAutoObservable } from 'mobx'
interface userInfo {
  id: string
  name: string
  photo: string
  mobile: string
  gender: string
  birthday: string
}
class UserStore {
  userData: userInfo = {
    id: '',
    name: '',
    photo: '',
    mobile: '',
    gender: '',
    birthday: '',
  }
  constructor() {
    makeAutoObservable(this)
  }
  getUserData = async () => {
    let res = await getUser()
    this.userData = res.data
  }
  // 退出登录
  logOut = () => {
    sessionStorage.clear()
    window.location.reload()
  }
}
export default UserStore
