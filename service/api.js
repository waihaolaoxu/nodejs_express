/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 15:28:40
 */

const querysql = require('../utils/querysql');
const statusCode = require('../config/status_code');

// 帖子创建
function createPosts(req, res, next){
  let date = new Date();
  let sql = querysql.createPosts({
    posts_title:req.body.posts_title,
    posts_content:req.body.posts_content,
    posts_publish_time:date,
    posts_status:1,
    posts_author:req.session.userInfo.user_id,
    posts_create_time:date,
    posts_category:req.body.posts_category,
    posts_update_time:date
  });
  req.pool.query(sql, function (err, response, fields) {
    if (err) throw err;
    res.json({
      code:200,
      msg:statusCode['200']
    });
  });
}

// 获取帖子分类
function getPostsCategory(req, res, next){
  let sql = querysql.getList('');
  req.pool.query(sql, function (err, response, fields) {
    if (err) throw err;
    res.json({
      code:200,
      data:response,
      msg:statusCode['200']
    });
  });
}

module.exports = {
  createPosts,
  getPostsCategory,
}