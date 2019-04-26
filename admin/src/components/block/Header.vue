<template>
  <div class="header">
    <el-menu :default-active="activePath" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <li class="el-menu-item" @click="asideToggle">
        <i class="iconfont" :class="{'icon-dedent':!asideFolded,'icon-indent':asideFolded}"></i>
      </li>
      <el-submenu index="" class="login-info fr">
        <template slot="title">{{userinfo.userName || ""}}</template>
        <el-menu-item index="" :route="{name:'changepwd'}">修改密码</el-menu-item>
        <el-menu-item index=""  @click="logout" class="text-danger">退出登录</el-menu-item>
      </el-submenu>
      <div class="head-pic fr" v-if="userinfo.headPictureUrl">
        <img :src="userinfo.headPictureUrl" width="30" height="30" alt="">
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import login from "@/api/login.js";
export default {
  data() {
    return {};
  },
  watch:{
    '$route'(){
     this.$nextTick(()=>{
       this.checkWidth();
     })
    }
  },
  created() {
    this.checkWidth();
    window.onresize = this.checkWidth;
  },
  methods: {
    logout(){
      login.logout().then(()=>{
        this.$ls.remove('userinfo');
        this.$store.commit('USERINFO_UPDATE',{});
        this.$router.replace({name:'login'});
      });
    },
    checkWidth() {
      if (window.innerWidth > 768) {
        this.$store.commit("ASIDE_TOGGLE", false);
      } else {
        this.$store.commit("ASIDE_TOGGLE", true);
      }
    },
    asideToggle() {
      this.$store.commit("ASIDE_TOGGLE");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    ...mapGetters(["asideFolded","userinfo"]),
    activePath() {
      var path = this.$route.path;
      var light = this.$route.meta.light;
      var param = this.$route.meta.param;
      if (light) {
        path = light;
        if (param) {
          path = path + "/" + this.$route.params[param];
        }
      }
      return path;
    }
  }
};
</script>

<style lang="scss" scoped>
.head-pic{
  padding-top: 10px;
  margin-right: -10px;
  position: relative;
  outline: 0;
  img{
    border-radius: 50%;
  }
}
.el-menu--horizontal .el-menu{
  .menutit{
    background: #dfe6ec;
    cursor: default;
    line-height: 25px;
    height: 25px;
    padding: 0 10px;
    color:#666;
    font-size: 14px;
  }
}
</style>
