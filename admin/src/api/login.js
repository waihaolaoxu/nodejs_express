/*
 * @Author: qdlaoxu 
 * @Date: 2019-01-02 10:52:41 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-01-08 21:04:05
 */
import {ajaxByParam} from './utils'

const login = {
  loginByUsername(loginName, pswd) { //登陆
    const data = {
      loginName,
      pswd
    }
    return ajaxByParam('/login',data)
  },
  getCurrentUser() {// 获取当前登陆用户信息
    return ajaxByParam('/user/getCurrentUser')
  },
  logout() {// 退出登陆
    return ajaxByParam('/logout')
  }
}

export default login;
