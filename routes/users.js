var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('login',{});
});

router.post('/login', function(req, res, next) {
    if(req.body.name == 'admin' && req.body.password == 'admin123'){
        req.session.userName = req.body.name; // 登录成功，设置 session
        res.redirect('/');
    }
    else{
        res.json({ret_code : 1, ret_msg : '账号或密码错误'});// 若登录失败，重定向到登录页面
    }
});

module.exports = router;
