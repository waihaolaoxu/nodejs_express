import Vue from 'vue'
import axios from 'axios';
import { Loading, Message } from 'element-ui';

var instance = axios.create({
  baseURL: '/bms',
  timeout: 10000
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  window.loading = Loading.service({
    background: 'rgba(0,0,0,0.15)',
    // spinner: ' ',
    text: '加载中...'
  });
  return config;
}, function (error) {
  window.loading.close();
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
  window.loading.close();
  if (res.data.code === "100004") {
    Message({
      message: res.data.message,
      type: 'error'
    });
    window.location.href = "/yx/login?callback="+window.location.href;
  } else if(res.data.code !== "200" && typeof res.data.code !== "undefined") {
    Message({
      message: res.data.message,
      type: 'error'
    });
  }
  return res.data;
}, function (error) {
  // 对响应错误做点什么
  Message({
    message: '接口异常',
    type: 'error'
  });
  window.loading.close();
  return Promise.reject(error);
});

Vue.prototype.$http = instance;
window.$http = instance;
export { instance as $http }
