/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 17:00:50
 */

const posts = require('../dao/posts');
const utils = require('../utils/utils');

// 获取帖子列表
function getPostsList(req, res, next) {
  posts.getList(req, data => {
    utils.returnView({
      template:'./index/index',
      data: data,
      req: req,
      res:res
    })
  });
}

// 获取帖子详情
function getPostsDetail(req, res, next) {
  posts.getDetaile(req, data => {
    utils.returnView({
      template:'./index/archives',
      data: data[0],
      req: req,
      res:res
    })
  })
}

module.exports = {
  getPostsList,
  getPostsDetail
}