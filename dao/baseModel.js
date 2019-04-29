/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 18:07:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-29 14:40:02
 */
const entity = require('../entity/entity');
const logger = require('../utils/logger')('dao');

class baseModel extends entity {
  constructor() {
    super();
  }

  // 增
  insertSql({ tableName, body = {} }) {
    let data = this.getCreateData({ tableName, body });
    let column = Object.keys(data).join(',');
    let value = [];
    for (let x in data) {
      value.push("'" + data[x] + "'");
    }
    let sql = `INSERT INTO ${tableName} (${column}) VALUES (${value.join(',')})`;
    return sql;
  }
  // 删
  deleteSql({ tableName, condition = {} }) {
    let where = [], sql = `DELETE FROM ${tableName}`;
    for (let x in condition) {
      where.push(`${x} = '${condition[x]}'`);
    }
    if (where.length) {
      sql += ` WHERE ${where.join(' AND ')}`
    }
    return sql;
  }
  // 改
  updateSql({ tableName, body = {} }) {
    let idKey = this[tableName].id;
    let id = body[idKey];
    let column = [];
    for (let x in body) {
      if (x != idKey) {
        column.push(`${x} = '${body[x]}'`);
      }
    }
    let sql = `UPDATE ${tableName} SET ${column.join(',')} WHERE ${idKey} = ${id}`;
    return sql;
  }
  // 查列表
  selectSql({ tableName, condition, sort, sortColumn, page, rows }) {
    let sql = `SELECT ${Object.keys(this[tableName].column).join(',')} FROM ${tableName}`;
    let where = [];
    for (let x in condition) {
      where.push(`${x} = '${condition[x]}'`);
    }
    if (where.length) {
      sql += ` WHERE ${where.join(' AND ')}`
    }
    if (sortColumn) {
      sql += ` ORDER BY ${sortColumn} ${sort || 'DESC'}`
    }
    if (page && rows) {
      sql += ` LIMIT ${(page - 1) * rows}, ${rows}`
    }
    return sql;
  }
  // 查总数
  selectCountSql({ tableName, condition }) {
    let sql = `SELECT count(*) total FROM ${tableName}`;
    let where = [];
    for (let x in condition) {
      where.push(`${x} = '${condition[x]}'`);
    }
    if (where.length) {
      sql += ` WHERE ${where.join(' AND ')}`
    }
    return sql;
  }
  //执行查询及回调处理
  queryFn({sql, req, callback}) {
    req.pool.query(sql, function (err, data) {
      if (err) {
        logger.error(err);
      } else {
        callback(data);
      }
    });
  }
}

module.exports = baseModel;
