<template>
  <el-tabs type="card">
    <el-tab-pane :label="$route.meta.title">
      <div class="list-box">
        <div class="list-header tr">
          <el-button icon="el-icon-plus" size="small" style="margin-bottom:15px" @click="createCategory()">创建</el-button>
        </div>
        <div class="list-body">
          <el-table :data="data" size="small">
            <el-table-column prop="category_id" label="ID">
            </el-table-column>
            <el-table-column prop="category_name" label="名称">
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button @click="editCategory(scope.row)" size="mini">编辑</el-button>
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
          api.deleteCategory({ category_id: id }).then(res => {
            if (res.code == 200) {
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    createCategory() {
      this.$prompt("分类名称", "创建分类", {
        inputPattern: /^\S+$/,
        inputErrorMessage: "分类名称不能为空！"
      })
        .then(({ value }) => {
          api
            .createCategory({
              category_name: value
            })
            .then(res => {
              if (res.code == 200) {
                this.$message.success("创建成功！");
                this.getData();
              }
            });
        })
        .catch(() => {});
    },
    editCategory(data) {
      this.$prompt("分类名称", "分类编辑", {
        inputPattern: /^\S+$/,
        inputValue:data.category_name,
        inputErrorMessage: "分类名称不能为空！"
      })
        .then(({ value }) => {
          api
            .updateCategory({
              category_id: data.category_id,
              category_name: value
            })
            .then(res => {
              if (res.code == 200) {
                this.$message.success("更新成功！");
                this.getData();
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>
