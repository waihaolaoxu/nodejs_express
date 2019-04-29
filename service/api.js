/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 17:48:00 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-29 14:54:54
 */

const category = require('../dao/category');
const posts = require('../dao/posts');
const user = require('../dao/user');
const utils = require('../utils/utils');

// 创建帖子
function createPosts(req, res, next) {
  let date = utils.getDate();
  let userInfo = req.session.userInfo;
  let params = {
    req,
    body: {
      posts_title: req.body.posts_title,
      posts_content: req.body.posts_content,
      posts_author: userInfo ? userInfo.user_id : 0,
      posts_status: 1,
      posts_publish_time: date,
      posts_create_time: date,
      posts_update_time: date
    }
  }
  posts.create(params, data => {
    utils.returnSuccess(res);
  });
}

// 删除帖子
function deletePosts(req, res, next) {
  let params = {
    req,
    condition: {
      posts_id: req.body.posts_id
    }
  }
  posts.delete(params, data => {
    utils.returnSuccess(res);
  });
}

// 修改帖子
function updatePosts(req, res, next) {
  let userInfo = req.session.userInfo;
  let params = {
    req,
    body: {
      posts_id: req.body.posts_id,
      posts_title: req.body.posts_title,
      posts_content: req.body.posts_content,
      posts_status: req.body.posts_status,
      posts_category: req.body.posts_category,
      posts_author: userInfo ? userInfo.user_id : 0,
      posts_update_time: utils.getDate()
    }
  }
  posts.update(params, data => {
    utils.returnSuccess(res);
  });
}

// 查询帖子列表
function queryPostsList(req, res, next) {
  let condition = {}
  let page = req.body.page || 1;
  let rows = req.body.rows || 20;
  if (req.body.category_id) {
    condition.posts_category = req.body.category_id;
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
          d.category_name = cat[d.posts_category].category_name;
        });
        utils.returnSuccess(res, {
          list,
          page,
          rows,
          total,
          page_total: Math.ceil(total / rows)
        });
      });
    });
  });
}

// 查询帖子详情
function queryPostsDetaile(req, res, next) {
  let params = {
    req,
    condition: {
      posts_id: req.body.posts_id
    }
  }
  posts.getDetaile(params, data => {
    utils.returnSuccess(res, data);
  });
}

// 创建分类
function createCategory(req, res, next) {
  let params = {
    req,
    body: {
      category_name: req.body.category_name
    }
  }
  category.create(params, data => {
    utils.returnSuccess(res);
  });
}

// 删除分类
function deleteCategory(req, res, next) {
  let category_id = req.body.category_id;
  posts.getNumber({ req, condition: { posts_category: category_id } }, total => {
    total = total.length ? total[0].total : 0;
    if (total > 0) {
      utils.returnError(res, 1004);
    } else {
      let params = {
        req,
        condition: {
          category_id
        }
      }
      category.delete(params, data => {
        utils.returnSuccess(res);
      });
    }
  })
}

// 修改分类
function updateCategory(req, res, next) {
  let params = {
    req,
    body: {
      category_id: req.body.category_id,
      category_name: req.body.category_name
    }
  }
  category.update(params, data => {
    utils.returnSuccess(res);
  });
}

// 查询分类列表
function queryCategoryList(req, res, next) {
  let params = {
    req
  }
  category.getList(params, data => {
    utils.returnSuccess(res, data);
  });
}

// 查询用户列表
function queryUserList(req, res, next) {
  let params = {
    req
  }
  user.getUser(params, data => {
    utils.returnSuccess(res, data);
  });
}

// 增加用户
function createUser(req, res, next) {
  let { user_id } = req.session.userInfo;
  if (user_id == 1) {
    let params = {
      req,
      body: {
        user_nickname: req.body.user_nickname,
        user_name: req.body.user_name,
        user_name: req.body.user_pass
      }
    }
    user.createUser(params, data => {
      utils.returnSuccess(res, data);
    });
  } else {
    utils.returnError(res, 1005);
  }
}

// 删除用户
function deleteUser(req, res, next) {
  let { user_id } = req.session.userInfo;
  if (user_id == 1 && req.body.user_id != user_id) {
    let params = {
      req,
      condition: {
        user_id: req.body.user_id
      }
    }
    user.deleteUser(params, data => {
      utils.returnSuccess(res, data);
    });
  } else {
    utils.returnError(res, 1005);
  }
}

// 更新用户
function updateUser(req, res, next) {
  let { user_id } = req.session.userInfo;
  if (user_id == 1 || user_id == req.body.user_id) {
    let params = {
      req,
      body: {
        user_id: req.body.user_id,
        user_nickname: req.body.user_nickname,
      }
    }
    user.updateUser(params, data => {
      utils.returnSuccess(res, data);
    });
  } else {
    utils.returnError(res, 1005);
  }
}

// 用户信息
function queryUserInfo(req, res, next) {
  let { user_id } = req.session.userInfo;
  if (user_id == 1 || user_id == req.body.user_id) {
    let params = {
      req,
      condition: {
        user_id: req.body.user_id
      }
    }
    user.getUser(params, data => {
      utils.returnSuccess(res, data[0]);
    });
  } else {
    utils.returnError(res, 1005);
  }
}


// 登陆
function loginIn(req, res, next) {
  let params = {
    req,
    condition: {
      user_name: req.body.user_name,
      user_pass: utils.encrypt(req.body.user_pass)
    }
  }
  user.getUser(params, data => {
    if (data.length) {
      req.session.userInfo = {
        user_id: data[0].user_id,
        user_name: data[0].user_name,
        user_nickname: data[0].user_nickname
      };
      utils.returnSuccess(res, data[0]);
    } else {
      utils.returnError(res, 1002);
    }
  });
}

// 退出登陆
function loginOut(req, res, next) {
  req.session.userInfo = null;
  utils.returnSuccess(res);
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
  createUser,
  deleteUser,
  updateUser,
  queryUserList,
  queryUserInfo,
  loginIn,
  loginOut
}