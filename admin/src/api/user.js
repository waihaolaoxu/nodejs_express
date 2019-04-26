/*
 * @Author: qdlaoxu 
 * @Date: 2019-01-03 09:57:41 
 * @Last Modified by: shiweihua
 * @Last Modified time: 2019-04-15 14:11:54
 */
import {ajaxByParam,ajaxByObj} from './utils'

const user = {
  //列表相关
  getCurrentClinicAllUser(data) { //当前机构下所有用户，不带分页
    return ajaxByParam('user/getCurrentClinicAllUser',data);
  },
  getCurrentClinicUsers(data) { //获取当前机构下的所有用户(不包含用户角色和权限),比getCurrentClinicAllUser接口响应快
    return ajaxByParam('user/getCurrentClinicUsers',data);
  },
  getCurrentClinicUserByPage(data) { //当前机构下所有用户，带分页
    return ajaxByParam('user/getCurrentClinicUserByPage',data);
  },
  
  enableUser(data) { // 启用
    return ajaxByParam('/user/enableUser', data);
  },
  forbiddenUser(data) { // 禁用
    return ajaxByParam('/user/forbiddenUser', data);
  },

  // 详情相关
  getUserByUserId(data) { // 根据用户Id获取用户信息
    return ajaxByParam('/user/getUserByUserId', data);
  },
  addUser(data) { // 添加用户
    return ajaxByObj('/user/addUser', data);
  },
  updateUser(data) { // 修改用户
    return ajaxByObj('/user/updateUser', data);
  },
  checkLoginName(data) { // 校验登陆名是否重复
    return ajaxByParam('/user/checkLoginName', data);
  },
  cancelWxBind(data) { // 微信解绑
    return ajaxByParam('/user/cancelWxBind', data);
  },
  resetPassword(data) { // 用户详情页，重置密码
    return ajaxByParam('/user/resetPassword', data);
  },
  checkMobile(data) { // 校验手机号是否重复
    return ajaxByParam('/user/checkMobile', data);
  },
  getVerifyCodeByMobile(data) { // 用户异常时给用户发送验证码
    return ajaxByParam('/user/getVerifyCodeByMobile', data);
  },
  updateUserDataStatus(data) { // 用户更换机构将原来账户置为异常
    return ajaxByParam('/user/updateUserDataStatus', data);
  },
  getWxBindCode({userId}) { // 用户获取绑定微信二维码
    return ajaxByParam('/user/getWxBindCode', {userId});
  },
  getUsersByClinicIdAndShare() { // 获取网咨列表（认证二维码）
    return ajaxByParam('/user/getUsersByClinicIdAndShare');
  },


  //获取当前登录用户
  getCurrentUser(data) { // 获取当前登录用户
    return ajaxByParam('/user/getCurrentUser', data);
  },

   //获取当前登录用户
   getVerifyCode(data) { // 获取当前登录用户
    return ajaxByParam('/user/getVerifyCode', data);
  },

  //忘记密码
  forgerPassword(data) { // 忘记密码，手机号和code
    return ajaxByParam('/user/forgerPassword', data);
  },

  //修改密码
  newPassword(data) { // 修改密码，新老密码
    return ajaxByParam('/user/newPassword', data);
  },
  
  //第一次登陆，提示登录初始化新密码
  initPassword(data) { // 登录初始化新密码 密码
    return ajaxByParam('/user/initPassword', data);
  },
  //设置默认网咨
  setDefaultUser(data) { // 代发布小程序 - 设置默认网咨
    return ajaxByParam('/user/setDefaultUser', data);
  },
  //联系人列表使用
  getServiceUser(data) { // 根据当前登录用户获取服务人员
    return ajaxByParam('/user/getServiceUser', data);
  },

}

export default user;