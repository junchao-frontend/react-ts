import LoginStore from './loginStore'
import React from 'react'
class rootStore {
  loginStore
  constructor() {
    this.loginStore = new LoginStore()
  }
}
const root = new rootStore()
// 使用react context机制完成统一方法的封装
// Provider value = {}
// 查找机制 useContext时优先从Provider value中 如果找不到就会找creatContext默认参数
const context = React.createContext(root)
const useStore = () => React.useContext(context)
export { useStore }
