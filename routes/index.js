let express = require('express');
let router = express.Router();
let axios = require('axios');

router.get('/', function(req, res, next) {
    if(req.session.userName){  //判断session 状态，如果有效，则返回主页，否则转到登录页面

        res.cookie('aaa', 111, {    
            'signed': true
        });
        
        axios.get('https://m.jiajuol.com/api/subject/subject_list.php', {
                params: {
                    page:2,
                    limit:10,
                    house_type:0,
                    house_style:0,
                    house_area:0,
                    city:1
                }
            })
            .then(function (response) {
                res.render('index', { data: response.data.data,cookies:req.signedCookies,userName:req.session.userName});
            })
            .catch(function (error) {
                // console.log(error);
            });
    }else{
        res.redirect('/users/login');
    }
});

module.exports = router;
