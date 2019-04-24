/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 18:48:33
 */

const baseModel = require('./baseModel');
const utils = require('../utils/utils');

class Posts extends baseModel {
  constructor() {
    super();
    this.tableName = "posts";
    this.page = 1;
    this.rows = 20;
  }

  // 获取帖子列表
  getList(req, callback) {
    let page = req.params.page || req.body.page || this.page;
    let rows = req.params.rows || req.body.rows || this.rows;
    let sql = this.selectSql({
      tableName: this.tableName,
      page,
      rows,
      condition: { //查询条件
        posts_status: 1
      },
      sortColumn: "posts_id", //排序字段
      sort: "desc" //倒序
    });
    req.pool.query(sql, (err, list, fields) => {
      if (err) throw err;
      let sql = this.selectCountSql({
        tableName: this.tableName,
        condition: { //查询条件
          posts_status: 1
        }
      })
      req.pool.query(sql, (err, data, fields) => {
        if (err) throw err;
        let total = data[0].total;
        callback && callback({
          list: list,
          page: Number(page),
          rows: Number(rows),
          total: total,
          page_total: Math.ceil(total / rows)
        });
      })
    });
  }

  // 获取帖子详情
  getDetaile(req, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
      condition:{
        posts_id:req.params.id || req.body.posts_id
      }
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback && callback(data)
    });
  }

  // 创建帖子
  create(req, callback) {
    let date = utils.getDate();
    let userInfo = req.session.userInfo;
    req.body.posts_author = userInfo ? userInfo.user_id : 0;
    req.body.posts_status = 1;
    req.body.posts_publish_time = date;
    req.body.posts_create_time = date;
    req.body.posts_update_time = date;
    let sql = this.insertSql({
      tableName: this.tableName,
      body: req.body
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback && callback()
    });
  }

  // 删除帖子
  delete(req, callback) {
    let sql = this.deleteSql({
      tableName: this.tableName,
      condition: req.body
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback && callback()
    });
  }

  // 修改帖子
  update(req, callback) {
    let date = utils.getDate();
    let userInfo = req.session.userInfo;
    req.body.posts_author = userInfo ? userInfo.user_id : 0;
    req.body.posts_status = typeof req.body.posts_status != 'undefined' ? req.body.posts_status : 1;
    req.body.posts_update_time = date;
    let sql = this.updateSql({
      tableName: this.tableName,
      data: req.body
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback && callback()
    });
  }


}

module.exports = new Posts();