import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home"
import Login from "./views/Login"

Vue.use(Router)

const router = new Router({
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
      path: "/login",
      name: "login",
      meta: {
        title: "登陆",
        fullpage: true
      },
      component: Login
    },
    {
      path: "/posts/list",
      name: "posts_list",
      meta: {
        title: "文章管理"
      },
      component: () => import("./views/posts/List")
    },
    {
      path: "/posts/edit/:id",
      name: "posts_edit",
      meta: {
        title: "文章管理"
      },
      component: () => import("./views/posts/Edit")
    },
    {
      path: "/posts/create",
      name: "posts_create",
      meta: {
        title: "创建文章"
      },
      component: () => import("./views/posts/Edit")
    }
  ]
})

export default router
