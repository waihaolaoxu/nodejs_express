/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 19:07:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-26 14:31:04
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
    "login":false
  },
  {
    "path": "/user/login",
    "handler": "loginIn",
    "login": false
  },
  {
    "path": "/user/loginout",
    "handler": "loginOut",
    "login":false
  }
]