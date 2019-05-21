/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-05-05 09:30:22
 */

const posts = require('../dao/posts');
const category = require('../dao/category');
const utils = require('../utils/utils');

// 获取帖子列表
function getPostsList(req, res, next) {
  let condition = {
    posts_status: 1,
  }
  let page = req.params.page || 1;
  let rows = req.params.rows || 20;
  if (req.params.category_id) {
    condition.posts_category = req.params.category_id;
  }
  let params = {
    req,
    condition,
    sortColumn: "posts_id",
    sort: "desc",
    page: Number(page),
    rows: Number(rows)
  }
  posts.getList(params, list => {
    posts.getNumber({ req, condition }, total => {
      total = total.length ? total[0].total : 0;
      category.getList({ req }, category => {
        let cat = utils.arrayToObj('category_id', category);
        utils.each(list, function (i, d) {
          if(d.posts_category){
            d.category_name = cat[d.posts_category].category_name;
          }
        });
        utils.returnView({
          template: './index/index',
          data: {
            list,
            page,
            rows,
            total,
            page_total: Math.ceil(total / rows)
          },
          req: req,
          res: res
        })
      });
    });
  });
}

// 获取帖子详情
function getPostsDetail(req, res, next) {
  let params = {
    req,
    condition: {
      posts_id: req.params.posts_id
    }
  }
  posts.getDetaile(params, data => {
    category.getDetaile({ req, condition: { category_id: data[0].posts_category } }, category => {
      if (category.length == 1) {
        data[0].category_name = category[0].category_name || "";
      }
      utils.returnView({
        template: './index/archives',
        data: data[0],
        req: req,
        res: res
      })
    });
  })
}

module.exports = {
  getPostsList,
  getPostsDetail
}