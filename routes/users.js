var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/aa', function(req, res, next) {
  res.send('1111111111111');
});

module.exports = router;
