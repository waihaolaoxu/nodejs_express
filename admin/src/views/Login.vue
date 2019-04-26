<template>
  <div class="login-page">
    <div class="logo tc">
      后台管理系统
    </div>
    <div class="login-content">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="user_name">
          <el-input v-model="ruleForm.user_name" placeholder="请输登录名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.user_pass" placeholder="请输入密码" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";

export default {
  data() {
    return {
      ruleForm: {
        user_name: "",
        user_pass: ""
      },
      rules: {
        user_name: [
          { required: true, message: "请输入登录名称", trigger: "blur" }
        ],
        user_pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
    document.onkeydown = e => {
      e = e || window.event;
      if (e.keyCode == 13) {
        this.submitForm("ruleForm");
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .login(this.ruleForm)
            .then(res => {
              if (res.code == 200) {
                this.$store.commit("USERINFO_UPDATE", res.data);
                this.$ls.set("userinfo", JSON.stringify(res.data)); //这里存储，header组件内读取同步
                window.location.href = this.$route.query.callback || "/"; //刷新页面为了执行util里更新userinfo状态信息
              }
            })
            .catch(res => {
              console.log("error", res);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .login-page {
    .login-logo {
      margin-top: 50px;
    }
    .login-content {
      width: auto;
      margin: 0 10px;
      padding: 40px 20px 20px;
    }
  }
}
.login-page {
  background: url("../assets/img/loginbg.jpg") center;
  background-size: cover;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
.el-form-item:nth-child(3) {
  margin-bottom: 5px;
}
.logo {
  margin: 100px 0 30px;
  color: #fff;
  font-size: 28px;
}
.login-content {
  width: 400px;
  background-color: #fff;
  padding: 60px 40px;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0 auto 100px;
}
</style>

