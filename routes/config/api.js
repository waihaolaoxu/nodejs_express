/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 19:07:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-25 14:38:39
 */

module.exports = [
  {
    "path": "/posts/create",
    "handler": "createPosts",
    "login": false
  },
  {
    "path": "/posts/delete",
    "handler": "deletePosts",
    "login": false
  },
  {
    "path": "/posts/update",
    "handler": "updatePosts",
    "login": false
  },
  {
    "path": "/posts/list",
    "handler": "queryPostsList",
    "login": false
  },
  {
    "path": "/posts/info",
    "handler": "queryPostsDetaile",
    "login": false
  },
  {
    "path": "/category/create",
    "handler": "createCategory",
    "login": false
  },
  {
    "path": "/category/delete",
    "handler": "deleteCategory",
    "login": false
  },
  {
    "path": "/category/update",
    "handler": "updateCategory",
    "login": false
  },
  {
    "path": "/user/login",
    "handler": "loginIn",
    "login": false
  },
  {
    "path": "/user/loginout",
    "handler": "loginOut",
    "login": false
  }
]