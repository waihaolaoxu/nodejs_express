/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-29 11:45:43 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-29 15:02:43
 * @Doc https://log4js-node.github.io/log4js-node/dateFile.html
 *      https://github.com/log4js-node/streamroller
 */

var log4js = require('log4js');
var path = require('path');
log4js.configure({
  appenders: {
    out: { type: 'stdout'},
    log: {
      type: 'dateFile',
      filename: path.join(__dirname, '../logs/info.log'), //写入文件的路径
      pattern: 'yyyy-MM-dd',
      keepFileExt: true, //保留文件原扩展名。例如：abc.log -> abc.2013-08-30.log
      alwaysIncludePattern: true //(默认为false)-将模式包括在当前日志文件的名称中以及备份中。
    }
  },
  categories: {
    default: {
      appenders: ['out', 'log'],
      level: 'info'
    }
  }
});
module.exports = log4js.getLogger;
