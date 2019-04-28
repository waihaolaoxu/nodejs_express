/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-26 11:20:45 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-28 15:31:42
 */

import { ajaxByObj } from './utils'

const api = {
  login(data) { //登陆
    return ajaxByObj('/user/login', data)
  },
  getCurrentUser() {// 获取当前登陆用户信息
    return ajaxByObj('/user/getCurrentUser')
  },
  logout() {// 退出登陆
    return ajaxByObj('/user/loginout')
  },
  getPostList(data) {// 获取文章列表
    return ajaxByObj('/posts/list', data)
  },
  createPosts(data) {// 创建文章
    return ajaxByObj('/posts/create', data)
  },
  getPostsInfo(data) {// 文章详情
    return ajaxByObj('/posts/info', data)
  },
  updatePosts(data) {// 文章编辑
    return ajaxByObj('/posts/update', data)
  },
  deletePosts(data) {// 删除文章
    return ajaxByObj('/posts/delete', data)
  },
  getCategory(data) {// 文章分类
    return ajaxByObj('/category/list', data)
  },
  createCategory(data) {// 创建分类
    return ajaxByObj('/category/create', data)
  },
  deleteCategory(data) {// 创建分类
    return ajaxByObj('/category/delete', data)
  },
  updateCategory(data) {// 创建分类
    return ajaxByObj('/category/update', data)
  },
}

export default api;