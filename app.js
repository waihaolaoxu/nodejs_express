var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser')
var app = express();


//中间件
app.use(cookieParser('secret'));
app.use(expressSession({
    name:'_session',
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
    }
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 路由配置
var index = require('./routes/index');
var users = require('./routes/users');
app.use('/', index);
app.use('/users', users);


// 视图引擎设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');


//静态资源
app.use('/static', express.static('public'));


// 创建服务器
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


// 404 处理
app.use(function(req, res, next) {
  // res.status(404).send('404');
  res.status(404).render('404',{});
});


// 错误处理
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.stack);
});
