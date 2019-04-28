/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-28 14:07:08
 */

const baseModel = require('./baseModel');

class Category extends baseModel {
  constructor() {
    super();
    this.tableName = "category";
  }

  // 创建
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

  // 删除
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

  // 修改
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

  // 查询
  getList({req}, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback(data);
    });
  }

  // 查询详情
  getDetaile({ req, condition }, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
      condition
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback(data[0]);
    });
  }
}

module.exports = new Category();