/*
 * @Author: qdlaoxu 
 * @Date: 2018-11-13 15:21:29 
 * @Last Modified by: qdlaoxu
 * @Last Modified time: 2019-04-26 14:44:20
 */
import store from '../store/store'
import router from '../router'

var utils = {
  install(Vue) {

    const P = Vue.prototype;

    //分页配置
    P.PAGE = {
      PAGE_SIZES: [10, 20, 50, 100],
      LAYOUT: "total, sizes, prev, pager, next, jumper"
    }

    //同步用户信息到vuex
    let userinfo = JSON.parse(window.localStorage.getItem('userinfo')) || {};
    store.commit('USERINFO_UPDATE', userinfo);
    if (!userinfo.user_id) {
      router.replace({ name: "login" })
    }


    /**
     * 对象遍历
     * @method each
     * @param  {Object}   data     遍历的对象
     * @param  {Function} callback 回调
     */
    P.each = function (data, callback) {
      for (var x in data) {
        var d = callback(x, data[x]);
        if (d === false) {
          break;
        }
      }
    }


    //获取服务器时间
    P.dateFormater = function (datetime,formater) {
      formater = formater || "yyyy-MM-dd hh:mm:ss";
      function _formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
      }
      var date = new Date(datetime);
      var year = date.getFullYear();
      var month = _formatNumber(date.getMonth() + 1);
      var day = _formatNumber(date.getDate());
      var hour = _formatNumber(date.getHours());
      var minute = _formatNumber(date.getMinutes());
      var second = _formatNumber(date.getSeconds());
      return formater.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("hh", hour).replace("mm", minute).replace("ss", second);
    }
    Vue.filter('date', P.dateFormater);


    //数组转对象
    P.arrayToObj = function (key, data) {
      let obj = {}
      for (let x in data) {
        obj[data[x][key]] = data[x];
      }
      return obj;
    }


    /**
     * 大图预览
     * @method popSlider
     * @param  {Object} data
     * @param  {Array} data.piclist
     * @param  {Array} data.des
     * @param  {Number} index
     */
    P.popSlider = function ({ data = [], current = 0, des = [] }) {
      let d = {
        current,
        data,
        des,
        open: true,
      }
      console.log('popSlider=>data', d)
      this.$store.commit('OPEN_BIGIMG', d)
    }
  }
}

function ajaxByObj(url, data) {
  return window.$http({
    url: url,
    method: 'post',
    data: data
  })
}

export { utils, ajaxByObj } 