var express = require('express');
var router = express.Router();
const adminService = require("../service/api");
const statusCode = require('../config/status_code');


// API配置 [路径，处理函数, 是否为登陆用户]
const apis = [
  ['/post/create', 'createPosts', true],
  ['/post/category', 'getPostsCategory'],
]

// 批量定义接口
apis.forEach(d => {
  router.post(d[0],function(req, res, next){
    if(d[2]){
      if (req.session.userInfo) {
        next();
      } else {
        res.json({
          code:1003,
          msg:statusCode['1003']
        });
      }
    }else{
      next();
    }
  }, function (req, res, next) {
    adminService[d[1]](req, res, next)
  });
});

module.exports = router;
