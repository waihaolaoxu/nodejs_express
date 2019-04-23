/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 17:30:36 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 17:50:23
 */

const dataBase = require('./config/database');
const mysql = require('mysql');

function connectDatabase(app){
  app.use(function(req, res, next){
    req.pool = mysql.createPool(dataBase);
    next();
  })
}

module.exports = connectDatabase;