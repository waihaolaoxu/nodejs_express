/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-19 19:17:30
 */
const querysql = require('../utils/querysql');

/**
 * 获取帖子列表
 */
function getPostList(req, res, next) {
  let sqlList = querysql.queryList({
    page:req.params.page || 1,
    rows:20,
    name:"wp_posts",
    column:"ID,post_title,post_date"
  });
  let sqlCount = querysql.queryCount({
    name:"wp_posts"
  });
  req.pool.query(sqlList, function (err, rows, fields) {
    if (err) throw err;
    req.pool.query(sqlCount, function (err, count, fields) {
      if (err) throw err;
      res.render('index', {
        data: rows,
        total:count[0]['count(*)']
      });
    })
  });
}

module.exports = {
  getPostList
}