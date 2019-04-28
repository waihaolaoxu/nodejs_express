/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-28 11:53:45
 */

const baseModel = require('./baseModel');

class Posts extends baseModel {
  constructor() {
    super();
    this.tableName = "posts";
  }

  // 获取帖子列表
  getList({ req, page, rows, condition, sortColumn, sort }, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,//表名
      condition, //查询条件
      page, //当前页
      rows, //每页条数
      sortColumn, //排序字段
      sort //排序方式
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback(data);
    });
  }

  // 获取帖子总数
  getNumber({ req, condition }, callback) {
    let sql = this.selectCountSql({
      tableName: this.tableName,
      condition
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback(data[0].total);
    })
  }

  // 获取帖子详情
  getDetaile({ req, condition }, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
      condition
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback(data[0] || null)
    });
  }

  // 创建帖子
  create({req,body}, callback) {
    let sql = this.insertSql({
      tableName: this.tableName,
      body
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback()
    });
  }

  // 删除帖子
  delete({req,condition}, callback) {
    let sql = this.deleteSql({
      tableName: this.tableName,
      condition
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback()
    });
  }

  // 修改帖子
  update({req,body}, callback) {
    let sql = this.updateSql({
      tableName: this.tableName,
      body
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback()
    });
  }


}

module.exports = new Posts();