<template>
  <div class="form-page">
    <el-tabs type="card">
      <el-tab-pane :label="$route.meta.title"></el-tab-pane>
    </el-tabs>
    <div class="wrapper bg-white b">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="medium">

        <el-form-item label="文章标题" prop="posts_title" required>
          <el-input v-model="ruleForm.posts_title" placeholder="文章标题" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="posts_category" required>
          <el-select v-model="ruleForm.posts_category" placeholder="文章分类">
            <el-option value="">请选择</el-option>
            <el-option v-for="(v,k) in category" :key="k" :value="k" :label="v.category_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示" prop="posts_status" required>
          <el-switch class="switch" v-model="ruleForm.posts_status" :active-value="1" :inactive-value="0" active-text="显示" inactive-text="隐藏">
          </el-switch>
        </el-form-item>
        <el-form-item label="文章内容" prop="posts_content" required>
          <el-input type="textarea" placeholder="文章内容" :autosize="{ minRows: 10, maxRows: 20}" v-model="ruleForm.posts_content"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom-toolbar">
        <div class="fixed-box">
          <el-button @click="$router.go(0)" size="medium">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" size="medium">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";
export default {
  data() {
    return {
      isCreate:this.$route.name == "posts_create",
      category: {},
      ruleForm: {
        posts_title: "",
        posts_category: "",
        posts_content: "",
        posts_status: 1
      },
      rules: {
        posts_title: [
          {
            required: true,
            message: "请输入文章标题"
          }
        ],
        posts_category: [
          {
            required: true,
            message: "请选择文章分类"
          }
        ],
        posts_content: [
          {
            required: true,
            message: "请输入文章内容"
          }
        ]
      }
    };
  },
  created() {
    if(!this.isCreate){
      this.getData();
    }
    this.getCategory();
  },
  methods: {
    getData(){
      api.getPostsInfo({
        posts_id:this.$route.params.id
      }).then(res => {
        if (res.code == 200) {
          this.ruleForm = res.data
        }
      });
    },
    getCategory() {
      api.getCategory().then(res => {
        if (res.code == 200) {
          this.category = this.arrayToObj("category_id", res.data);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isCreate) {
            api.createPosts(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message.success("创建成功！");
                this.$router.replace({ name: "posts_list" });
              }
            });
          }else{
            api.updatePosts(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message.success("编辑成功！");
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
