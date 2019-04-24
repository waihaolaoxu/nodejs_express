/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 18:07:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 17:10:00
 */
const entity = require('../entity/entity');

class baseModel extends entity {
  constructor() {
    super();
  }

  // 增
  insertSql({tableName, body = {}}) {
    let data = this.getCreateData({tableName,body});
    let column = Object.keys(data).join(',');
    let value = [];
    for (let x in data) {
      value.push("'" + data[x] + "'");
    }
    let sql = `INSERT INTO ${tableName} (${column}) VALUES (${value.join(',')})`;
    return sql;
  }
  // 删
  deleteSql({ tableName, where = {} }) {
    let _where = [], sql = `DELETE FROM ${tableName}`;
    for (let x in where) {
      _where.push(`${x} = '${where[x]}'`);
    }
    if (_where.length) {
      sql += ` WHERE ${_where.join(' AND ')}`
    }
    return sql;
  }
  // 改
  updateSql({ tableName, data = {} }) {
    let idKey = this[tableName].id;
    let id = data[idKey];
    let column = [];
    for (let x in data) {
      column.push(`${x} = '${data[x]}'`);
    }
    let sql = ` UPDATE Person SET ${column.join(',')} WHERE ${idKey} = ${id}`;
    return sql;
  }
  // 查列表
  selectSql({ tableName, where, sort, sortColumn, page, rows }) {
    let sql = `SELECT ${Object.keys(this[tableName].column).join(',')} FROM ${tableName}`;
    if (where) {
      sql += ` WHERE ${where}`
    }
    if (sort) {
      sql += ` ORDER BY ${sortColumn} ${sort || 'DESC'}`
    }
    if (page && rows) {
      sql += ` LIMIT ${(page - 1) * rows}, ${rows}`
    }
    return sql;
  }
  // 查总数
  selectCountSql({ tableName, where }) {
    let sql = `SELECT count(*) total FROM ${tableName}`;
    if (where) {
      sql += ` WHERE ${where}`
    }
    return sql;
  }
}

module.exports = baseModel;
