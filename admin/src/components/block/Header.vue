<template>
  <div class="header">
    <el-menu :default-active="activePath" mode="horizontal" @select="handleSelect" router>
      <li class="el-menu-item" @click="asideToggle">
        <i class="iconfont" :class="{'icon-dedent':!asideFolded,'icon-indent':asideFolded}"></i>
      </li>
      <el-menu-item index="" @click="goIndex()">
        网站首页
      </el-menu-item>
      <el-submenu index="" class="login-info fr">
        <template slot="title">{{userinfo.user_nickname || ""}}</template>
        <el-menu-item index="" @click="dialogVisible=true">修改密码</el-menu-item>
        <el-menu-item index="" @click="logout" class="text-danger">退出登录</el-menu-item>
      </el-submenu>
      <div class="head-pic fr" v-if="userinfo.headPictureUrl">
        <img :src="userinfo.headPictureUrl" width="30" height="30" alt="">
      </div>
    </el-menu>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px" append-to-body>
      <el-form :model="user" label-width="100px" size="medium">
        <el-form-item label="旧密码" required>
          <el-input v-model="user.user_oldpass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" required>
          <el-input v-model="user.user_pass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" required>
          <el-input v-model="user.user_pass2" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="changePwd" size="medium">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/config/api";
export default {
  data() {
    return {
      dialogVisible: false,
      user: {
        user_oldpass: "",
        user_pass: "",
        user_pass2: ""
      }
    };
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.checkWidth();
      });
    }
  },
  created() {
    this.checkWidth();
    window.onresize = this.checkWidth;
  },
  methods: {
    changePwd() {
      let { user_oldpass, user_pass, user_pass2 } = this.user;
      if (!user_oldpass || !user_pass || !user_pass2) {
        this.$message.warning("表单输入不完整！");
        return;
      }
      if (user_pass != user_pass2) {
        this.$message.warning("两次密码输入不一致！");
        return;
      }
      api
        .updateUserPwd({
          user_oldpass,
          user_pass
        })
        .then(res => {
          if (res.code == "200") {
            this.$message.success("密码修改成功！");
            this.dialogVisible = false;
          }
        });
    },
    goIndex() {
      window.location.href = "/";
    },
    logout() {
      api.logout().then(() => {
        this.$ls.remove("userinfo");
        this.$store.commit("USERINFO_UPDATE", {});
        this.$router.replace({ name: "login" });
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
    ...mapGetters(["asideFolded", "userinfo"]),
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
.head-pic {
  padding-top: 10px;
  margin-right: -10px;
  position: relative;
  outline: 0;
  img {
    border-radius: 50%;
  }
}
.el-menu--horizontal .el-menu {
  .menutit {
    background: #dfe6ec;
    cursor: default;
    line-height: 25px;
    height: 25px;
    padding: 0 10px;
    color: #666;
    font-size: 14px;
  }
}
</style>
