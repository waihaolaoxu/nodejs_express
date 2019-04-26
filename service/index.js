/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-26 15:20:29
 */

const posts = require('../dao/posts');
const category = require('../dao/category');
const utils = require('../utils/utils');

// 获取帖子列表
function getPostsList(req, res, next) {
  posts.getList(req, data => {
    category.getList(req,rows2=>{
      let cat = utils.arrayToObj('category_id',rows2);
      utils.each(data.list,function(i,d){
        d.category_name = cat[d.posts_category].category_name;
      });
      utils.returnView({
        template:'./index/index',
        data: data,
        req: req,
        res:res
      })
    });
  });
}

// 获取帖子详情
function getPostsDetail(req, res, next) {
  posts.getDetaile(req, data => {
    req.body = {
      category_id: data[0].posts_category
    }
    category.getDetaile(req,data2=>{
      if(data2.length){
        data[0].category_name = data2[0].category_name;
      }else{
        data[0].category_name = ""
      }
      utils.returnView({
        template:'./index/archives',
        data: data,
        req: req,
        res:res
      })
    });
  })
}

module.exports = {
  getPostsList,
  getPostsDetail
}