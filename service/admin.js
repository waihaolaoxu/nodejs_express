/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-22 16:49:50 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 17:57:39
 */

const querysql = require('../utils/querysql');

// 登陆
function loginIn(req, res, next) {
  let sql = querysql.queryUser({
    user_name: req.body.name
  });
  req.pool.query(sql, function (err, response, fields) {
    if (err) throw err;
    if (response.length) {
      if (response[0].user_pass == req.body.password) {
        // 登录成功，设置 session
        req.session.userInfo = {
          user_id: response[0].user_id,
          user_name: response[0].user_name,
          user_nickname: response[0].user_nickname
        };
        res.redirect('/admin/index');
      } else {
        res.redirect('/admin/login?msg=密码错误');
      }
    } else {
      res.redirect('/admin/login?msg=账号不存在');
    }
  });
}

// 退出登陆
function loginOut(req, res, next) {
  req.session.userInfo = null;
  res.redirect('/admin/login');
}

module.exports = {
  loginIn,
  loginOut,
}