const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser')
const routeConfig = require('./config/route');
const viewEngine = require('./config/viewengine');
const connectDatabase = require('./connect_database');
const app = express();

// 连接数据库
connectDatabase(app);

//中间件
app.use(cookieParser('secret'));
app.use(expressSession({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
  }
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//静态资源
app.use('/static', express.static('.tmp'));
app.use('/static', express.static('dist'));

// 调用路由中间件
routeConfig.forEach(d=>{
  app.use(d.root, require(d.require));
});

// 模版引擎配置
viewEngine(app);

// 创建服务器
app.listen(3000, function () {
  console.log('Example app listening at http://localhost:3000');
});

// 404 处理
app.use(function (req, res, next) {
  res.status(404).render('404');
});

// 错误处理
app.use(function (err, req, res, next) {
  res.status(500).send(err.stack);
});
