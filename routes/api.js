const express = require('express');
const router = express.Router();
const apiService = require("../service/api");
const apiRouter = require("./config/api");
const utils = require('../utils/utils');
apiRouter.forEach(d => {
  router.post(d.path, function (req, res, next) {
    if (req.session.userInfo || d.login === false) {
      next();
    } else {
      utils.returnError(res, 1003);
    }
  }, function (req, res, next) {
    apiService[d.handler](req, res, next);
  });
});

module.exports = router;