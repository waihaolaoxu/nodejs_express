let express = require('express');
let router = express.Router();
let axios = require('axios');
// var mysql = require('mysql');
// var dbConfig = require('../db/config');
// var sql = require('../db/sql');
// var pool  = mysql.createPool(dbConfig.mysql);

/* GET home page. */
router.get('/', function(req, res, next) {
    
    // pool.getConnection(function(err, connection) {
    //     connection.query(sql.test, function (error, results, fields) {
    //         if (error) throw error;
    //         console.log(results);
    //         res.render('index', { data: results });
    //     });
        
    //     connection.release();
    // });
    // console.log('22222')
    
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
            res.render('index', { data: response.data.data });
        })
        .catch(function (error) {
            // console.log(error);
        });
    
    // let data = [{
    //     tit:'标题222233333333332',
    //     con:'内容内容内容内容内容内容'
    // },{
    //     tit:'标题',
    //     con:'内容内容内容内容内容内容'
    // },{
    //     tit:'标题',
    //     con:'内容内容内容内容内容内容'
    // },{
    //     tit:'标题',
    //     con:'内容内容内容内容内容内容'
    // }]
    // res.render('index', { data: data });


});

module.exports = router;
