<template>
  <el-tabs type="card">
    <el-tab-pane :label="$route.meta.title">
      <div class="list-box">
        <div class="list-header tr">
          <el-button icon="el-icon-plus" size="small" style="margin-bottom:15px" @click="$router.push({name:'user_create'})">创建</el-button>
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
                <el-button @click="$router.push({name:'user_edit',params:{id:scope.row.user_id}})" size="mini">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.user_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
//TODO 增删改 弹层实现 权限
import api from "@/config/api";
export default {
  data() {
    return {
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
    }
  }
};
</script>
