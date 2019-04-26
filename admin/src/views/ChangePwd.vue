<template>
  <div class="findpwd-page">
    <div class="findpwd-logo tc">
      <img src="../assets/img/logo2.png">
    </div>
    <div class="findpwd-content">
      <div class="findpwd-title">重置密码</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="oldPassword" v-if="!resetPswd">
          <el-input type="password" v-model="ruleForm.oldPassword" placeholder="请输入原始密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" placeholder="请输入新密码" autocomplete="off" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword2">
          <el-input type="password" v-model="ruleForm.newPassword2" placeholder="请再次输入新密码" autocomplete="off" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">确定</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="copyright">美业云 copyright 北京云晰科技有限公司 版权所有</div>
  </div>
</template>
<script>
  import user from "@/api/user";
  import login from "@/api/login";
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value.trim() === "") {
          callback(new Error("请输入密码"));
        } else if (value.length < 6) {
          callback(new Error("请输入大于等于6位，小于20位的密码"));
        } else {
          if (this.ruleForm.newPassword2 !== "") {
            // this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value.trim() === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userId: this.$store.state.userinfo.userId,//用户id
          oldPassword: "",//旧密码
          newPassword: "",//新密码
          newPassword2: ""
        },
        rules: {
          oldPassword: [{
            required: true,
            message: "请输入原始密码",
            trigger: "blur"
          }],
          newPassword: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          newPassword2: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        },
        resetPswd:false,//用户首次登陆，会强制重置密码，发现这个参数，说明是首次登陆

      };
    },
    mounted(){
      if(this.$route.query.resetPswd){
        this.resetPswd = true
      };

      console.log(JSON.parse(JSON.stringify(this.$store.state.userinfo)))
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            
            if(this.resetPswd){
              //第一次登陆，重置密码
              this.initPassword();
            }else{
              //修改密码
              this.newPassword();
            }
            
          } else {
            return false;
          }
        });
      },
      //修改密码
      newPassword(){
        let ruleForm= {
          userId: this.ruleForm.userId,
          oldPassword: this.ruleForm.oldPassword,
          newPassword: this.ruleForm.newPassword,
        }
        user.newPassword(ruleForm).then(res => {
          if (res.code === '200') {
            this.$message.success('密码修改成功!');

            //跳转到登录页面，重新登陆
            this.logout();

          } else {
            this.$message.error(res.message);
          }
        })
        .catch(res => {
          console.log("error", res);
        });
      },
      //第一次登陆，重置密码
      initPassword(){
        let ruleForm= {
          userId: this.ruleForm.userId,
          password: this.ruleForm.newPassword,
        }
        user.initPassword(ruleForm).then(res => {
          if (res.code === '200') {
            this.$message.success('密码修改成功!');
            //跳转到登录页面，重新登陆
            this.logout();

          } else {
            this.$message.error(res.message);
          }
        })
        .catch(res => {
          console.log("error", res);
        });
      },
      logout(){
        login.logout().then(()=>{
          this.$ls.remove('userinfo');
          this.$store.commit('USERINFO_UPDATE',{});
          setTimeout(() => {
            this.$router.replace({name:'login'});
          }, 500);
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  @media screen and (max-width: 768px) {
    .findpwd-page {
      .findpwd-logo {
        margin-top: 50px;
      }

      .findpwd-content {
        width: auto;
        margin: 0 10px;
        padding: 20px;
      }
    }
  }

  .findpwd-page {
    background: #f0f0f0;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;

    .copyright {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 20px;
      font-size: 12px;
      line-height: 18px;
      color: #ccc;
      text-align: center;
    }
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .findpwd-logo {
    margin: 100px 0 30px;
  }

  .findpwd-content {
    max-width: 400px;
    background-color: #fff;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 0 auto 100px;
  }

  .findpwd-title {
    margin-bottom: 20px;
    font-size: 18px;
  }
</style>