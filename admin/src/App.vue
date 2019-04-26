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
  </div>
</template>
<style scoped>
</style>
<script>
import { mapGetters } from "vuex";
import header from "./components/block/Header";
import menu from "./components/block/Menu";
export default {
  components: {
    "v-header": header,
    "v-menu": menu
  },
  computed: {
    ...mapGetters(["asideFolded","bigPic"]),
    isFullScreen() {
      if (typeof this.$route.meta.fullpage === "boolean") {
        return this.$route.meta.fullpage;
      } else {
        return false;
      }
    },
  }
};
</script>

<style lang="scss">
@import "./assets/css/app.scss";
</style>
