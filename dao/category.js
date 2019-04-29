/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-29 14:40:37
 */

const baseModel = require('./baseModel');

class Category extends baseModel {
  constructor() {
    super();
    this.tableName = "category";
  }

  // 创建
  create({ req, body }, callback) {
    let sql = this.insertSql({
      tableName: this.tableName,
      body
    });
    this.queryFn({sql, req, callback});
  }

  // 删除
  delete({ req, condition }, callback) {
    let sql = this.deleteSql({
      tableName: this.tableName,
      condition
    });
    this.queryFn({sql, req, callback});
  }

  // 修改
  update({ req, body }, callback) {
    let sql = this.updateSql({
      tableName: this.tableName,
      body
    });
    this.queryFn({sql, req, callback});
  }

  // 查询
  getList({ req }, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
    });
    this.queryFn({sql, req, callback});
  }

  // 查询详情
  getDetaile({ req, condition }, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
      condition
    });
    this.queryFn({sql, req, callback});
  }
}

module.exports = new Category();