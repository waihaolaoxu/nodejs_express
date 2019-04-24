/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-24 18:44:42
 */

const category = require('../dao/category');
const posts = require('../dao/posts');
const utils = require('../utils/utils');

// 创建帖子
function createPosts(req, res, next) {
  posts.create(req, data => {
    utils.returnSuccess(res);
  });
}

// 删除帖子
function deletePosts(req, res, next) {
  posts.delete(req, data => {
    utils.returnSuccess(res);
  });
}

// 修改帖子
function updatePosts(req, res, next) {
  posts.update(req, data => {
    utils.returnSuccess(res);
  });
}

// 查询帖子列表
function queryPostsList(req, res, next) {
  posts.getList(req, data => {
    utils.returnSuccess(res,data);
  });
}

// 查询帖子详情
function queryPostsDetaile(req, res, next) {
  posts.getDetaile(req, data => {
    utils.returnSuccess(res,data);
  });
}

// 创建分类
function createCategory(req, res, next) {
  category.create(req, data => {
    utils.returnSuccess(res);
  });
}

// 删除分类
function deleteCategory(req, res, next) {
  category.delete(req, data => {
    utils.returnSuccess(res);
  });
}

// 修改分类
function updateCategory(req, res, next) {
  category.update(req, data => {
    utils.returnSuccess(res);
  });
}

// 查询分类列表
function queryCategoryList(req, res, next) {
  category.getList(req, data => {
    utils.returnSuccess(res,data);
  });
}

module.exports = {
  createPosts,
  deletePosts,
  updatePosts,
  queryPostsList,
  queryPostsDetaile,
  createCategory,
  deleteCategory,
  updateCategory,
  queryCategoryList,
}