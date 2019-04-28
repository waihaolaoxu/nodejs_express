/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-28 14:12:54
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
      category.getList({req}, category => {
        let cat = utils.arrayToObj('category_id', category);
        utils.each(list, function (i, d) {
          d.category_name = cat[d.posts_category].category_name;
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
    let params2 = {
      req,
      condition: {
        category_id: data.posts_category
      }
    }
    category.getDetaile(params2, data2 => {
      data.category_name = data2.category_name || "";
      utils.returnView({
        template: './index/archives',
        data: data,
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