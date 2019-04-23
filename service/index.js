/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 13:48:00
 */

const querysql = require('../utils/querysql');

// 获取帖子列表
function getPostsList(req, res, next) {
  let page = req.params.page || 1;
  let rows = 20;
  let sqlList = querysql.queryPostsList({
    page:page,
    rows:rows,
    column:"posts_id,posts_title,posts_publish_time"
  });
  let sqlCount = querysql.queryPostsCount();
  req.pool.query(sqlList, function (err, list, fields) {
    if (err) throw err;
    req.pool.query(sqlCount, function (err, count, fields) {
      if (err) throw err;
      let total = count[0].total;
      res.render('./index/index', {
        data:{
          list: list,
          page:Number(page),
          rows:Number(rows),
          total:total,
          page_total:Math.ceil(total/rows)
        },
        path:req.path
      });
    })
  });
}

// 获取帖子详情
function getPostsDetail(req, res, next) {
  let sql = querysql.queryPostsDetail({
    id:req.params.id,
    column:"posts_id,posts_title,posts_publish_time,posts_content"
  });
  req.pool.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('./index/archives', {
      data: data[0]
    });
  });
}

module.exports = {
  getPostsList,
  getPostsDetail
}