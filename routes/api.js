const express = require('express');
const router = express.Router();
const apiService = require("../service/api");
const apiRouter = require("./config/api");
const utils = require('../utils/utils');

apiRouter.forEach(d => {
  router.post(d.path, function (req, res, next) {
    if (d.login) {
      if (/^\/login$/.test(req.path)) {
        next();
        return;
      }
      if (req.session.userInfo) {
        next();
      } else {
        utils.returnError(res,1003);
      }
    }else{
      next();
    }
  }, function (req, res, next) {
    apiService[d.handler](req, res, next);
  });
});

module.exports = router;