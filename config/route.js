/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 17:56:34 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 17:57:18
 */

module.exports = [{
  root: "/",
  require: './routes/index'
},
{
  root: "/admin",
  require: './routes/admin'
},
{
  root: "/api",
  require: './routes/api'
}]
