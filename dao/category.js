/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 18:38:51
 */

const baseModel = require('./baseModel');
const utils = require('../utils/utils');

class Category extends baseModel {
  constructor() {
    super();
    this.tableName = "category";
  }

  // 创建
  create(req, callback) {
    let sql = this.insertSql({
      tableName: this.tableName,
      body: req.body
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback && callback()
    });
  }

  // 删除
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

  // 修改
  update(req,callback){
    let sql = this.updateSql({
      tableName: this.tableName,
      data: req.body
    });
    req.pool.query(sql, function (err, data, fields) {
      if (err) throw err;
      callback && callback()
    });
  }
  
  // 查询
  getList(req,callback){
    let sql = this.selectSql({
      tableName: this.tableName,
    });
    req.pool.query(sql, (err, list, fields) => {
      if (err) throw err;
      callback && callback({
        list: list,
        total:list.length
      });
    });
  }
}

module.exports = new Category();