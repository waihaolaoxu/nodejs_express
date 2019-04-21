/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 18:07:13 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-21 13:51:15
 */

// 帖子-列表查询
function queryPostList({ column, page, rows}) {
  return `select ${column} from wp_posts where post_type = 'post' order by ID desc limit ${(page - 1) * rows}, ${rows}`;
}

// 帖子-根据ID查询详情
function queryPostDetail({id, column}) {
  return `select ${column} from wp_posts where ID = ${id}`;
}

// 帖子-查询总条数
function queryPostCount() {
  return `select count(*) from wp_posts where post_type = 'post'`;
}

module.exports = {
  queryPostList,
  queryPostCount,
  queryPostDetail
}