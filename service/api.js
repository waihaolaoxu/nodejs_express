/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 17:06:39
 */

const posts = require('../dao/posts');
const utils = require('../utils/utils');

// 创建帖子
function createPosts(req, res, next) {
  posts.createPosts(req, data => {
    utils.returnSuccess(res);
  });
}

// 删除帖子
function deletePosts(req, res, next) {
  posts.deletePosts(req, data => {
    utils.returnSuccess(res);
  });
}

module.exports = {
  createPosts,
  deletePosts
}