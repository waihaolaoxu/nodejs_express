/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 18:07:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 19:33:17
 */
const entity = require('../entity/entity');

class baseModel extends entity {
  constructor(){}

  // 增
  insertSql(tableName,data){
    let column = Object.keys(data).join(',');
    let value = "";
    for(let x in data){
      value += ("'"+data[x]+"'");
    }
    return `INSERT INTO ${tableName} (${column}) VALUES (${value})`;
  }
  // 删
  deleteSql(tableName,data){
    let where = [], sql = `DELETE FROM ${tableName}`;
    for(let x in data){
      where.push(`${x} = '${data[x]}'`);
    }
    if(where.length){
      sql += ` WHERE ${where.join(' AND ')}`
    }
    return sql;
  }
  // 改
  updateSql(){
    
  }
  // 查
  selectSql(){

  }
}

module.exports = baseModel;
