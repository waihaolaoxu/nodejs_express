/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-28 20:12:57
 */

const baseModel = require('./baseModel');

class Category extends baseModel {
  constructor() {
    super();
    this.tableName = "user";
  }

  // 查
  getUser({ req, condition }, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
      condition
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback(data);
    });
  }

  // 增
  createUser({ req, body }, callback) {
    let sql = this.insertSql({
      tableName: this.tableName,
      body
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback();
    });
  }

  // 删
  deleteUser({ req, condition }, callback) {
    let sql = this.deleteSql({
      tableName: this.tableName,
      condition
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback();
    });
  }

  // 改
  updateUser({ req, body }, callback) {
    let sql = this.updateSql({
      tableName: this.tableName,
      body
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = new Category();