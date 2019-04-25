/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 17:19:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-25 17:55:15
 */

const statusCode = require('../config/status_code');
const crypto = require('crypto');
const secret = "20130607";

const utils = {
  // 服务端渲染页面反回页面
  returnView({data,template,req,res}){
    data.path = req.path;
    res.render(template, {
      data:data,
      path:req.path
    })
  },
  // api接口用直接反回json
  returnSuccess(res,data){
    res.json({
      code:200,
      data:data || null,
      msg:statusCode['200']
    })
  },
  returnError(res,code){
    res.json({
      code:code,
      msg:statusCode[code]
    })
  },
  //获取服务器时间
  getDate(formater){
    formater = formater || "yyyy-MM-dd hh:mm:ss";
    function _formatNumber(n) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }
    var date = new Date();
    var year = date.getFullYear();
    var month = _formatNumber(date.getMonth() + 1);
    var day = _formatNumber(date.getDate());
    var hour = _formatNumber(date.getHours());
    var minute = _formatNumber(date.getMinutes());
    var second = _formatNumber(date.getSeconds());
    return formater.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("hh", hour).replace("mm", minute).replace("ss", second);
  },
  //数组转对象
  arrayToObj(key,data){
    let obj = {}
    for(let x in data){
      obj[data[x][key]] = data[x];
    }
    return obj;
  },
  // 遍历
  each(data,callback){
    for (let x in data) {
      let d = callback(x, data[x]);
      if (d === false) {
        break;
      }
    }
  },
  // 加密
  encrypt(str){
    return crypto.createHmac('sha1',secret).update(str).digest('hex').substring(0,32);
  }
}

module.exports = utils;