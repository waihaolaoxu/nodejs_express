/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 18:07:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-23 15:28:09
 */

// 帖子-列表查询
function queryPostsList({ column, page, rows}) {
  return `select ${column} from posts where posts_status = 1 order by posts_id desc limit ${(page - 1) * rows}, ${rows}`;
}

// 帖子-根据ID查询详情
function queryPostsDetail({id, column}) {
  return `select ${column} from posts where posts_id = ${id}`;
}

// 帖子-查询总条数
function queryPostsCount() {
  return `select count(*) total from posts where posts_status = 1`;
}

// 用户表查询
function queryUser({user_name}){
  return `select * from user where user_name = '${user_name}'`
}

// 发布新帖
function createPosts({posts_title,posts_content,posts_publish_time,posts_status,posts_author,posts_create_time,posts_category,posts_update_time}){
  return `INSERT INTO posts (posts_title,posts_content,posts_publish_time,posts_status,posts_author,posts_create_time,posts_category,posts_update_time) VALUES ('${posts_title}','${posts_content}','${posts_publish_time}','${posts_status}','${posts_author}','${posts_create_time}','${posts_category}','${posts_update_time}')`
}

// 查询表数据
function getList({name}){
  return `select * from ${name}`;
}

module.exports = {
  queryPostsList,
  queryPostsCount,
  queryPostsDetail,
  queryUser,
  createPosts
}