/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-23 18:57:56 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 16:38:23
 */

class Entity {
  constructor() {
    // 帖子表
    this.posts = {
      id:'posts_id', //主键id字段
      column:{ //表字段
        posts_id:null,
        posts_title:null,
        posts_content:null,
        posts_publish_time:null,
        posts_status:null,
        posts_author:null,
        posts_create_time:null,
        posts_category:null,
        posts_update_time:null
      }
    }
    // 用户表
    this.user = {
      id:"user_id",
      column:{
        user_id:null,
        user_name:null,
        user_pass:null,
        user_nickname:null
      }
    }
    // 分类表
    this.category = {
      id:"category_id",
      column:{
        category_id:null,
        category_name:null
      }
    }
  }
  // 反回创建数据字段
  getCreateData({tableName,body}){
    let obj = {}
    for(let x in this[tableName].column){
      if(body[x]){
        obj[x] = body[x]
      }
    }
    return obj;
  }
}

module.exports = Entity
