/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 19:44:49
 */

const baseModel = require('./baseModel');
const utils = require('../utils/utils');

class Category extends baseModel {
  constructor() {
    super();
    this.tableName = "user";
  }

  // 查询
  getUser(req,callback){
    let sql = this.selectSql({
      tableName: this.tableName,
      condition: req.body
    });
    req.pool.query(sql, (err, data, fields) => {
      if (err) throw err;
      callback && callback(data);
    });
  }
}

module.exports = new Category();