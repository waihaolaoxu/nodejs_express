const express = require('express');
const router = express.Router();
const indexService = require("../service/index");

const config = [
  ['/','getPostList'],// 首页
  ['/page/:page','getPostList'],// 帖子列表
  ['/category/:type','getPostList'],// 分类帖子列表
  ['/category/:type/page/:page','getPostList'],// 分类帖子列表
  ['/archives/:id','getPostDetail'],// 帖子详情
];

config.forEach(d=>{
  router.get(d[0], function (req, res, next) {
    indexService[d[1]](req, res, next);
  });
});

module.exports = router;
