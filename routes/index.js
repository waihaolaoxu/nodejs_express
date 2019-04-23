const express = require('express');
const router = express.Router();
const indexService = require("../service/index");
const indexRouter = require("./config/index");

indexRouter.forEach(d=>{
  router.get(d.path, function (req, res, next) {
    indexService[d.handler](req, res, next);
  });
});

module.exports = router;
