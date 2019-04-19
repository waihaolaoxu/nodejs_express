/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-18 19:49:59 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-19 12:00:11
 */
const config = [
  {
    root:"/",
    require: '../routes/index'
  },
  {
    root:"/list",
    require: '../routes/list'
  },
  {
    root:"/users",
    require: '../routes/users'
  }
];

function registor(app){
  config.forEach(d=>{
    app.use(d.root, require(d.require));
  })
}

module.exports = registor;
