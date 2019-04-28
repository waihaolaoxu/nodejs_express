<template>
  <el-tabs type="card">
    <el-tab-pane :label="$route.meta.title">
      <div class="list-box">
        <div class="list-header tr">
          <el-button icon="el-icon-plus" size="small" style="margin-bottom:15px" @click="$router.push({name:'posts_create'})">创建</el-button>
        </div>
        <div class="list-body">
          <el-table :data="data" size="small">
            <el-table-column prop="category_id" label="ID">
            </el-table-column>
            <el-table-column prop="category_name" label="名称">
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button @click="$router.push({name:'category_edit',params:{id:scope.row.category_id}})" size="mini">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.category_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
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
      api.getCategory().then(res => {
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
          api.deletePosts({ category_id: id }).then(res => {
            if (res.code == 200) {
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    edit(id) {
      this.$prompt("分类名称", id ? "分类编辑" : "创建分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S+$/,
        inputErrorMessage: "分类名称不能为空！"
      })
        .then(({ value }) => {
          if (id) {
            api
              .updateCategory({
                category_id: id,
                category_name: value
              })
              .then(res => {
                if(res.code == 200){
                  this.$message.success("创建成功！");
                  this.getData();
                }
              });
          }else{
            api
              .createCategory({
                category_id: id,
                category_name: value
              })
              .then(res => {
                if(res.code == 200){
                  this.$message.success("创建成功！");
                  this.getData();
                }
              });
          }
        })
        .catch(() => {});
    }
  }
};
</script>
