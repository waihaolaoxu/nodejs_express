/*
 * @Author: qdlaoxu 
 * @Date: 2018-11-13 15:21:29 
 * @Last Modified by:   qdlaoxu
 * @Last Modified time: 2019-04-26 10:35:26
 */
import store from '../store/store'
const uuidv1 = require('uuid/v1');

var utils = {
  install(Vue) {

    const P = Vue.prototype;


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

    //uuid
    P.uuidv1 = uuidv1;


    /**
     * 时间戳格式化
     * @method _dateFormat
     * @param  {Number}   date 时间戳
     * @param  {String}   fmt  日期格式
     */
    const _dateFormat = function (date, fmt) {
      if(!date){return ""}
      date = new Date(Number(date));
      fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
      date = new Date(date);
      var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'H+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      // var nowDate = new Date();
      // if (date.getDate() != nowDate.getDate() || date.getMonth() != nowDate.getMonth() || date.getFullYear() != nowDate.getFullYear()) {
      return fmt;
      // }
      // return fmt.replace(/\d{4}-\d{2}-\d{2}/, '');
    }
    Vue.filter('date', _dateFormat);
    P.date = _dateFormat;
    Vue.filter('fdate', function (date) {
      if (!date) return '';
      if(date > new Date().getTime()){
        date = new Date().getTime()
      }
      var time = new Date(date).getTime();
      var curTime = new Date().getTime();
      var c = curTime - time;
      if (c < 1000 * 60) {
        return Math.floor(c / 1000) + '秒钟前';
      }
      if (c < 1000 * 60 * 60) {
        return Math.floor(c / 1000 / 60) + '分钟前';
      }
      if (c < 1000 * 60 * 60 * 24) {
        return Math.floor(c / 1000 / 60 / 60) + '小时前';
      }
      if (c < 1000 * 60 * 60 * 24 * 7) {
        return Math.floor(c / 1000 / 60 / 60 / 24) + '天前';
      }
      return _dateFormat(new Date(date));
    });


    /**
     * 大图预览
     * @method popSlider
     * @param  {Object} data
     * @param  {Array} data.piclist
     * @param  {Array} data.des
     * @param  {Number} index
     */
    P.popSlider = function ({data=[],current=0,des=[]}) {
      let d = {
        current,
        data,
        des,
        open: true,
      }
      console.log('popSlider=>data',d)
      this.$store.commit('OPEN_BIGIMG', d)
    }


    /**
     * 过滤空对象
     * @param  {Object} obj
     */
    P.filterEmptyObj = function (obj) {
      var o = {};
      P.each(obj, function (i, d) {
        if (d !== null) {
          o[i] = d;
        }
      });
      return o;
    }


    /**
     * 对象合并 更新、创建接口用 （更新及创建不能传多余字段，只有data里定义的是可以传的，不能detaile的接口返回的所有字段原样提交）
     * @param  {Object} obj1
     * @param  {Object} obj2
     */
    P.extendObj = function (obj1, obj2) {
      var obj = {};
      this.each(obj1, function (i) {
        obj[i] = obj2[i]
      });
      return obj;
    }


    /**
     * 直传七牛云
     *  @param  {} blob
     */
    P.uploadQiniu = function (blob) {
      return new Promise(function (resolve, reject) {
        window.$http({
          url: '/file/getUpToken',
          method: 'get',
        }).then((res) => {
          var fdata = new FormData();
          fdata.append('file', blob);
          fdata.append('key', uuidv1().replace(/-/g, '') + '.' + blob.type.split('/')[1]);
          fdata.append('token', res.uptoken);
          window.$http({
            url: "https://upload.qiniup.com/",
            method: "POST",
            data: fdata
          }).then((res) => {
            var _url = "http://qn.nihaomc.com/"
            if(P.isDev()){
              _url = "http://qiniu.dev.nihaomc.com/"
            }
            _url += res.key;
            resolve({
              url: _url,
              size: blob.size,
              type: blob.type
            });
          }).catch(() => {
            reject('上传失败！');
          })
        }).catch(() => {
          reject('获取 uploadToken 失败');
        })
      })
    }

    
    /**
     * 手机号脱敏过滤器
     */
    Vue.filter('phoneHide',function(data){
      var pat=/(\d{3})\d*(\d{4})/
      if(!data){
        return '';
      }
      return data.replace(pat,'$1****$2');
    });


    /**
     * 数字 w+ 过滤器
     */
    Vue.filter('numberw',function(num){
      if(!num){
          return 0;
      }
      if (num / 10000 >=1) {
          return Math.floor(num / 10000) + 'w+';
      } else {
          return num;
      }
    })

  }
}

export { utils } 