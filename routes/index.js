const express = require('express');
const router = express.Router();
const indexService = require("../service/index");

router.get('/', function (req, res, next) {
  indexService.getPostList(req, res, next)
});

router.get('/page/:page', function (req, res, next) {
  indexService.getPostList(req, res, next)
});


module.exports = router;
