/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 19:08:15 
 * @Last Modified by:   qdlaoxu 
 * @Last Modified time: 2019-04-24 19:08:15 
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
    "path": "/archives/:id",
    "handler": "getPostsDetail"
  }
]