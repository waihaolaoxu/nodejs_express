/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-22 14:05:14
 */

const querysql = require('../utils/querysql');
/**
 * 获取帖子列表
 */
function getPostList(req, res, next) {
  let page = req.params.page || 1;
  let rows = 20;
  let sqlList = querysql.queryPostList({
    page:page,
    rows:rows,
    column:"ID,post_title,post_date,comment_count"
  });
  let sqlCount = querysql.queryPostCount();
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
        username:"",
        path:req.path
      });
    })
  });
}

/**
 * 获取帖子详情
 */
function getPostDetail(req, res, next) {
  let sql = querysql.queryPostDetail({
    id:req.params.id,
    column:"ID,post_title,post_date,post_content"
  });
  req.pool.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('./index/archives', {
      data: data[0]
    });
  });
}

module.exports = {
  getPostList,
  getPostDetail
}