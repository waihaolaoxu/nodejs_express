/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-24 10:29:44 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-29 14:46:17
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
    this.queryFn({sql, req, callback});
  }

  // 获取帖子总数
  getNumber({ req, condition }, callback) {
    let sql = this.selectCountSql({
      tableName: this.tableName,
      condition
    });
    this.queryFn({sql, req, callback});
  }

  // 获取帖子详情
  getDetaile({ req, condition }, callback) {
    let sql = this.selectSql({
      tableName: this.tableName,
      condition
    });
    this.queryFn({sql, req, callback});
  }

  // 创建帖子
  create({req,body}, callback) {
    let sql = this.insertSql({
      tableName: this.tableName,
      body
    });
    this.queryFn({sql, req, callback});
  }

  // 删除帖子
  delete({req,condition}, callback) {
    let sql = this.deleteSql({
      tableName: this.tableName,
      condition
    });
    this.queryFn({sql, req, callback});
  }

  // 修改帖子
  update({req,body}, callback) {
    let sql = this.updateSql({
      tableName: this.tableName,
      body
    });
    this.queryFn({sql, req, callback});
  }
}

module.exports = new Posts();