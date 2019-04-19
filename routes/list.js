let express = require('express');
let router = express.Router();
let axios = require('../utils/axios');

router.get('/', function (req, res, next) {
  if (req.session.userName) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
    res.cookie('aaa', 111, {
      'signed': true
    });

    axios({
      req:req,
      data:{
        page: 2,
        limit: 10,
        house_type: 0,
        house_style: 0,
        house_area: 0,
        city: 1
      },
      url:"/api/subject/subject_list.php",
      callback(data){
        if(data.code == 200){
          res.render('list',data);
        }else{
          console.log(data)
        }
      }
    })
  } else {
    res.redirect('/users/login');
  }
});

module.exports = router;
