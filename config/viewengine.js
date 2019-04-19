/*
 * @Author: qdlaoxu 
 * @Date: 2019-04-19 19:50:30 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-19 20:03:05
 */

const path = require('path');
function viewEngine(app) {
  app.engine('art', require('express-art-template'));
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'art');
  app.set('view options', {
    imports: {
      //时间格式化
      date(date, formater) {
        function _formatNumber(n) {
          n = n.toString();
          return n[1] ? n : '0' + n;
        }
        if (!date) {
          return "";
        }
        formater = formater || "yyyy-MM-dd hh:mm:ss";
        date = new Date(date);
        var curdate = new Date();
        var curYear = curdate.getFullYear();
        var curMonth = _formatNumber(curdate.getMonth() + 1);
        var curDay = _formatNumber(curdate.getDate());
        var year = date.getFullYear();
        var month = _formatNumber(date.getMonth() + 1);
        var day = _formatNumber(date.getDate());
        var hour = _formatNumber(date.getHours());
        var minute = _formatNumber(date.getMinutes());
        var second = _formatNumber(date.getSeconds());
        if (year == curYear && curMonth == month && curDay == day) {
          formater = 'hh:mm';
        }
        return formater.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("hh", hour).replace("mm", minute).replace("ss", second);
      }
    },
    minimize: true,
    // HTML 压缩器。仅在 NodeJS 环境下有效
    // htmlMinifier: htmlMinifier,
    // HTML 压缩器配置。参见 https://github.com/kangax/html-minifier
    htmlMinifierOptions: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    }
  });
}
module.exports = viewEngine;