<template>

  <el-tabs type="card">
    <el-tab-pane :label="$route.meta.title">
      <div class="list-box">
        <div class="list-header">
          <el-row :gutter="10">
            <el-col :lg="24" :xl="20">
              <el-form :inline="true" :model="query" class="demo-form-inline" size="small">
                <el-form-item>
                  <el-input v-model="query.user" placeholder="请输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" icon="el-icon-search" :loading="loading">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :lg="24" :xl="4" class="xlr">
              <el-button icon="el-icon-plus" size="small" style="margin-bottom:15px">创建</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="list-body">

          <el-table :data="tableData" size="small">
            <el-table-column prop="d" label="名称">
            </el-table-column>
            <el-table-column prop="d" label="发放/领取/使用">
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag size="mini" type="success">已上架</el-tag>
                <el-tag size="mini" type="info">已下架</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="d" label="下架时间">
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button @click="$router.push({name:'gift_detaile',params:{id:100}})" size="mini">详情</el-button>
                <el-button @click="$router.push({name:'gift_edit',params:{id:100}})" size="mini">编辑</el-button>
                <el-button size="mini" type="danger" @click="lower">下架</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <div class="list-footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="PAGE.PAGE_SIZES" :page-size="PAGE.PAGE_SIZE" :layout="PAGE.LAYOUT" :total="400" :current-page="4">
          </el-pagination>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
export default {
  data() {
    return {
      loading: false,
      query: {},
      tableData: [
        {
          d: 1
        }
      ]
    };
  },
  methods: {
    // 下架
    lower() {
      this.$confirm("确认下架该礼品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "下架成功!"
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSubmit() {
      var _self = this;
      this.loading = true;
      setTimeout(function() {
        _self.loading = false;
      }, 1000);
    }
  }
};
</script>
