/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 17:19:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 17:26:31
 */

const statusCode = require('../config/status_code');

const utils = {
  getReturn(data,code){
    return {
      code:code,
      data:data,
      msg:statusCode[code]
    }
  }
}

module.exports = utils;