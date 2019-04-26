import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asideFolded: false, //左侧菜单折叠开关
    bigPic: { //大图预览
      open: false, //打开开关
      current: 0, //当前索引
      data: [ //图片数据
        // {
        //   url:'a.jpg', //图片地址
        //   type:1 //1：图片 2：视频
        // }
      ],
      des:[ // 描述
        // {
        //   name:"", //标题
        //   con:""//内容
        // }
      ]
    },
    userinfo: {}, //当前登陆用户信息
  },
  mutations: {
    ASIDE_TOGGLE(state, data) {
      if (typeof data === 'boolean') {
        state.asideFolded = data;
      } else {
        state.asideFolded = !state.asideFolded
      }
    },
    OPEN_BIGIMG(state, data) {
      state.bigPic = data;
    },
    CLOSE_BIGIMG(state) {
      state.bigPic = {};
    },
    USERINFO_UPDATE(state, data) {
      state.userinfo = data;
    }
  },
  actions: {
    
  },
  getters: {
    asideFolded: state => state.asideFolded,
    bigPic: state => state.bigPic,
    userinfo: state => state.userinfo
  }
})
