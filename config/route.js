/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-18 19:49:59 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-21 17:46:34
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
    root:"/admin",
    require: '../routes/admin'
  }
];

function registor(app){
  config.forEach(d=>{
    app.use(d.root, require(d.require));
  })
}

module.exports = registor;
