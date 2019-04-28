/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 19:08:15 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-28 11:27:48
 */

module.exports = [
  {
    "path": "/",
    "handler": "getPostsList"
  },
  {
    "path": "/page/:page",
    "handler": "getPostsList"
  },
  {
    "path": "/category/:category_id",
    "handler": "getPostsList"
  },
  {
    "path": "/category/:category_id/page/:page",
    "handler": "getPostsList"
  },
  {
    "path": "/archives/:posts_id",
    "handler": "getPostsDetail"
  }
]