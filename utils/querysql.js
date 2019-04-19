/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 18:07:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-19 19:14:05
 */

// 列表查询 sql
function queryList({ name, column, page, rows}) {
  return `SELECT ${column} FROM ${name} order by ID limit ${(page - 1) * rows}, ${rows}`;
}

// 列表条数 sql
function queryCount({name}) {
  return `select count(*) from ${name}`;
}

module.exports = {
  queryList,
  queryCount
}