import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

// 组件库
import './plugins/element'
import globalComponents from './components/index'
Vue.use(globalComponents)



// axios 全局配置
import './config/axios'


// 工具函数
import { utils } from './config/utils';
Vue.use(utils)

// 本地存储
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
