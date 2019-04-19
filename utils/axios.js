let axios = require('axios');

var $http = axios.create({
  baseURL: 'https://m.jiajuol.com',
  timeout: 10000
});

module.exports = function ({ data, url, method, req, callback }) {
  $http({
    data: data || {},
    url: url,
    method: method || 'get',
  })
    .then(function (response) {
      callback({
        code: "200",
        data: response.data.data,
        userName: req.session.userName 
      })
    })
    .catch(function (error) {
      callback({
        code: "1001"
      })
    });
}