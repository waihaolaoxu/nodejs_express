<template>
  <div class="findpwd-page">
    <div class="findpwd-logo tc">
      <img src="../assets/img/logo.png">
    </div>
    <div class="findpwd-content">
      <div class="findpwd-title">找回密码</div>
      <el-form :model="ruleForm" status-icon>
        <el-form-item>
          <el-input v-model="ruleForm.loginName" placeholder="请输入登录名" autocomplete="off" :maxlength="12"></el-input>
        </el-form-item>
        <el-row :gutter="15" style="margin-bottom:22px;">
          <el-col :span="14">
            <el-form-item>
              <el-input v-model="ruleForm.verifyCode" placeholder="手机验证码" autocomplete="off" :maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <el-button type="primary" style="width:100%;" v-if="!countDownState" @click="getVerifyCode">获取验证码</el-button>
              <el-button style="width:100%;" v-else>{{countDownTime}}s</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <input name="DummyUsername" type="text" style="display:none;"> <!-- 解决火狐自动填充 勿删 -->
          <input name="DummyPassword" type="password" style="display:none;"><!-- 解决火狐自动填充 勿删  -->
          <el-input v-model="ruleForm.passWord" type="password" placeholder="请输入新密码" autocomplete="new-password" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="copyright">美业云 copyright 北京云晰科技有限公司 版权所有</div>
  </div>
</template>
<script>
  let countDownName;
  import user from "@/api/user";
  import login from "@/api/login";
  
  export default {
    data() {
      return {
        pwdType:"text",// 解决浏览器自动填充
        ruleForm: {
          loginName: "",
          verifyCode: "",
          passWord:'',
        },
        countDownState: false, //倒计时状态
        countDownTime: 59, //倒计时时间

      };
    },
    methods: {
      //获取验证码
      getVerifyCode() {
        let loginName = this.ruleForm.loginName;
        if (!loginName) {
          this.$message.error("请输入正确的登录名");
          return false;
        }

        let data = {
          loginName: this.ruleForm.loginName,
        }
        user.getVerifyCode(data).then(res => {
            if (res.code === '200') {
              this.$message.success('获取验证码成功!');
              this.countDownState = true; //倒计时状态
              this.FCountDownTime(); //开启倒计时
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(res => {
            console.log("error", res);
          });
      },
      // 确认
      submitForm() {
        let {loginName,verifyCode,passWord} = this.ruleForm;
        if (!loginName) {
          this.$message.error("请输入正确的登录名");
          return false;
        }
        if (verifyCode.length < 6 || !/^[0-9]+$/.test(verifyCode)) {
          this.$message.error("请输入正确的手机验证码");
          return false;
        }

        if (passWord.trim() === "") {
          this.$message.error("请输入密码");
          return;
        } else if (passWord.length < 6) {
          this.$message.error("请输入大于等于6位，小于20位的密码");
          return;
        }

        user.forgerPassword(this.ruleForm).then(res => {
            if (res.code === '200') {
              this.$message.success('密码修改成功!');
              this.logout();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(res => {
            console.log("error", res);
          });
      },
      //倒计时方法
      FCountDownTime() {
        countDownName = setInterval(() => {
          this.countDownTime -= 1;

          if (this.countDownTime == 0) {
            clearInterval(countDownName); //清除定时器
            this.countDownState = false; //倒计时状态
            this.countDownTime = 59;
          }
        }, 1000);
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
    background: url("../assets/img/loginbg.jpg") center;
    background-size: cover;
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
    width: 400px;
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