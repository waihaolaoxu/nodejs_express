<template>
  <div id="app" :class="{'aside-folded':asideFolded}">
    <!-- 全屏 -->
    <template v-if="isFullScreen">
      <router-view></router-view>
    </template>
    <!-- 非全屏 -->
    <template v-else>
      <v-header></v-header>
      <v-menu></v-menu>
      <div class="content">
        <div class="wrapper">
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </div>
    </template>
    <!-- 全局公用放大预览 -->
    <transition name='scale'>
      <slide-layer :data="bigPic.data" :des="bigPic.des" :current="bigPic.current" v-if="bigPic.open" class="tran"></slide-layer>
    </transition>
    <!-- 报名入口 -->
    <activity-link v-if="isShow"></activity-link>
  </div>
</template>
<style scoped>
</style>
<script>
import { mapGetters } from "vuex";
import header from "./components/block/Header";
import menu from "./components/block/Menu";
import login from "@/api/login";
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {
    '$route' (val) {
      if(val.name != "login" && val.name != "findpwd"){
        login.getCurrentUser().then(() => {}); //过期登陆用
      }
      if (window._czc) {
         window._czc.push(['_trackPageview', location.pathname+location.search, document.referrer])
      }
    }
  },
  created() {},
  components: {
    "v-header": header,
    "v-menu": menu
  },
  computed: {
    ...mapGetters(["asideFolded", "bigPic"]),
    isFullScreen() {
      if (typeof this.$route.meta.fullpage === "boolean") {
        return this.$route.meta.fullpage;
      } else {
        return false;
      }
    },
    isShow() {
      switch (this.$route.meta.title) {
        case "大转盘":
        case "活动编辑":
        case "中奖纪录":
        case "拼团活动":
        case "拼团活动编辑":
        case "拼团活动用户":
        case "海报管理":
        case "礼品管理":
        case "创建礼品":
        case "礼品编辑":
        case "礼品领取详情":
        case "优惠券管理":
          return true;
        default:
          return false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/app.scss";
</style>
