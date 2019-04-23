var express = require('express');
var router = express.Router();
const adminService = require("../service/admin");

// 页面配置 [路径，模版地址]
const views = [
  ['/index', './admin/index'],
  ['/create', './admin/create'],
  ['/login', './admin/login'],
]

// API配置 [路径，处理函数]
const apis = [
  ['/login', 'loginIn'],
  ['/loginout', 'loginOut','get'],
]

// 登陆验证
router.all('/*', function (req, res, next) {
  if (req.session.userInfo) {
    next();
  } else if (/^\/login$/.test(req.path)) {
    next();
  } else {
    res.redirect('/admin/login');
  }
});

// 批量定义页面路由
views.forEach(d => {
  router.get(d[0], function (req, res, next) {
    res.render(d[1], {
      userInfo: req.session.userInfo
    });
  });
});

// 批量定义接口
apis.forEach(d => {
  router[d[2] || 'post'](d[0], function (req, res, next) {
    adminService[d[1]](req, res, next)
  });
});

module.exports = router;
