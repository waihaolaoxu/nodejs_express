import Vue from "vue"
import store from "./store/store"
import Router from "vue-router"
import Home from "./views/Home"
import Login from "./views/Login"
import Findpwd from "./views/Findpwd"
import ChangePwd from "./views/ChangePwd"

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "后台管理系统"
      },
      component: Home
    },
    {
      path: "/yx/login",
      name: "login",
      meta: {
        title: "登陆",
        fullpage: true
      },
      component: Login
    },
    {
      path: "/yx/findpwd",
      name: "findpwd",
      meta: {
        title: "找回密码",
        fullpage: true
      },
      component: Findpwd
    },
    {
      path: "/yx/changepwd",
      name: "changepwd",
      meta: {
        title: "修改密码",
        fullpage: true
      },
      component: ChangePwd
    },
    {
      path: "/yx/advise/list",
      name: "advise_list",
      meta: {
        title: "咨询台"
      },
      component: () => import("./views/advise/List")
    }
  ]
})

export default router
