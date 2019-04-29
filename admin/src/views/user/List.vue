<template>
  <el-tabs type="card">
    <el-tab-pane :label="$route.meta.title">
      <div class="list-box">
        <div class="list-header tr">
          <el-button icon="el-icon-plus" size="small" style="margin-bottom:15px" @click="create()">创建</el-button>
        </div>
        <div class="list-body">
          <el-table :data="data" size="small">
            <el-table-column prop="user_id" label="ID">
            </el-table-column>
            <el-table-column prop="user_nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="user_name" label="登陆名">
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button @click="edit(scope.row)" size="mini">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.user_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <el-dialog :title="isCreate?'创建用户':'编辑用户'" :visible.sync="dialogVisible" width="500px" :append-to-body="true" @closed="resetForm">
        <el-form :model="user" label-width="80px" size="medium">
          <el-form-item label="登陆名称" required v-if="isCreate">
            <el-input v-model="user.user_name"></el-input>
          </el-form-item>
          <el-form-item label="昵称" required>
            <el-input v-model="user.user_nickname"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码" :required="isCreate" v-if="isCreate">
            <el-input v-model="user.user_pass"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="submit" size="medium">确 定</el-button>
        </span>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
//TODO 增删改 弹层实现 权限
import api from "@/config/api";
export default {
  data() {
    return {
      isCreate: true,
      user: {
        user_id: "",
        user_name: "",
        user_nickname: "",
        user_pass: ""
      },
      dialogVisible: false,
      loading: false,
      data: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      api.getUserList().then(res => {
        if (res.code == 200) {
          this.data = res.data;
        }
      });
    },
    // 删除
    del(id) {
      this.$confirm("确认删除吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          api.deleteUser({ user_id: id }).then(res => {
            if (res.code == 200) {
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    resetForm() {
      this.user = {
        user_id: "",
        user_name: "",
        user_nickname: "",
        user_pass: ""
      };
    },
    edit(data) {
      this.isCreate = false;
      this.dialogVisible = true;
      this.user.user_id = data.user_id;
      this.user.user_nickname = data.user_nickname;
    },
    create() {
      this.isCreate = true;
      this.dialogVisible = true;
    },
    submit() {
      let {user_name,user_nickname,user_pass} = this.user;
      if (this.isCreate) {
        if(!user_name || !user_nickname || !user_pass){
          this.$message.warning("表单填写不完整！")
          return;
        }
        api
          .createUser({
            user_name: this.user.user_name,
            user_nickname: this.user.user_nickname,
            user_pass: this.user.user_pass
          })
          .then(res => {
            if (res.code == 200) {
              this.$message.success("创建成功！");
              this.getData();
              this.dialogVisible = false;
            }
          });
      } else {
        if(!user_nickname){
          this.$message.warning("昵称不能为空！")
          return;
        }
        api
          .updateUser({
            user_id:this.user.user_id,
            user_nickname: this.user.user_nickname
          })
          .then(res => {
            if (res.code == 200) {
              this.$message.success("修改成功！");
              this.getData();
              this.dialogVisible = false;
            }
          });
      }
    }
  }
};
</script>
