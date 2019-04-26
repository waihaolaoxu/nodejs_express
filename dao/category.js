/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-26 19:08:54
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
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback && callback(data);
    });
  }

  // 查询详情
  getDetaile(req,callback){
    let sql = this.selectSql({
      tableName: this.tableName,
      condition:{
        category_id:req.body.category_id || req.params.category_id
      }
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback && callback(data[0]);
    });
  }
}

module.exports = new Category();