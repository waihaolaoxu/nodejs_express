/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 17:19:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 17:25:03
 */

const statusCode = require('../config/status_code');

const utils = {
  // 服务端渲染页面反回页面
  returnView({data,template,req,res}){
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
  }
}

module.exports = utils;