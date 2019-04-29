/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 19:07:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-29 14:58:25
 */

module.exports = [
  {
    "path": "/posts/create",
    "handler": "createPosts"
  },
  {
    "path": "/posts/delete",
    "handler": "deletePosts"
  },
  {
    "path": "/posts/update",
    "handler": "updatePosts"
  },
  {
    "path": "/posts/list",
    "handler": "queryPostsList"
  },
  {
    "path": "/posts/info",
    "handler": "queryPostsDetaile"
  },
  {
    "path": "/category/create",
    "handler": "createCategory"
  },
  {
    "path": "/category/delete",
    "handler": "deleteCategory"
  },
  {
    "path": "/category/update",
    "handler": "updateCategory"
  },
  {
    "path": "/category/list",
    "handler": "queryCategoryList"
  },
  {
    "path": "/user/create",
    "handler": "createUser"
  },
  {
    "path": "/user/delete",
    "handler": "deleteUser"
  },
  {
    "path": "/user/update",
    "handler": "updateUser"
  },
  {
    "path": "/user/list",
    "handler": "queryUserList"
  },
  {
    "path": "/user/info",
    "handler": "queryUserInfo"
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