<template>
  <div class="aside-wrap">
    <div class="logo">
      <router-link to="/">管理后台</router-link>
    </div>
    <div class="menu-wrap">
      <el-menu :default-active="activePath" background-color="#324157" :default-openeds="openList" text-color="#B4BCCC" active-text-color="#fff" style="border-right:0" router>
        <el-submenu :index="'group-'+key" v-for="(value, key) in data" :key="key">
          <template slot="title">
            <i :class="value.icon"></i>
            <span slot="title" v-text="value.group"></span>
          </template>
          <el-menu-item :index="value.href" v-for="(value, key) in value.list" :key="key" :route="{path:value.href}">
            {{value.name}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      openList:['group-0'],
      data: [
        {
          icon: "iconfont icon-yijin10-zixunanli",
          group: "文章管理",
          list: [
            {
              href: "/posts/list",
              name: "文章管理"
            },
            {
              href: "/category/list",
              name: "分类管理"
            },
            {
              href: "/user/list",
              name: "用户管理"
            },
          ]
        }
      ]
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(["userinfo"]),
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
.iconfont {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
}
.point{
  width:6px;
  height:6px;
  display:inline-block;
  border-radius:50%;
  background:#c74747;
}
</style>
