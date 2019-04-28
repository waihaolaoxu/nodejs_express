/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 19:07:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-28 20:23:09
 */

module.exports = [
  {
    "path": "/posts/create",
    "handler": "createPosts",
  },
  {
    "path": "/posts/delete",
    "handler": "deletePosts",
  },
  {
    "path": "/posts/update",
    "handler": "updatePosts",
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
  },
  {
    "path": "/category/delete",
    "handler": "deleteCategory",
  },
  {
    "path": "/category/update",
    "handler": "updateCategory",
  },
  {
    "path": "/category/list",
    "handler": "queryCategoryList",
    "login": false
  },
  {
    "path": "/user/create",
    "handler": "createUser",
  },
  {
    "path": "/user/delete",
    "handler": "deleteUser",
  },
  {
    "path": "/user/update",
    "handler": "updateUser",
  },
  {
    "path": "/user/list",
    "handler": "queryUserList",
  },
  {
    "path": "/user/info",
    "handler": "queryUserInfo",
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