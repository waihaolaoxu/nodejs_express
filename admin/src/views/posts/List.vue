<template>

  <el-tabs type="card">
    <el-tab-pane :label="$route.meta.title">
      <div class="list-box">
        <div class="list-header">
          <el-row :gutter="10">
            <el-col :lg="24" :xl="20">
              <el-form :inline="true" :model="query" class="demo-form-inline" size="small">
                <!-- <el-form-item>
                  <el-input v-model="query.user" placeholder="请输入关键字"></el-input>
                </el-form-item> -->
                <el-form-item>
                  <el-select v-model="query.category_id" placeholder="请选择">
                    <el-option value="">全部</el-option>
                    <el-option v-for="(v,k) in category" :key="k" :value="k" :label="v.category_name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" icon="el-icon-search" :loading="loading">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :lg="24" :xl="4" class="xlr">
              <el-button icon="el-icon-plus" size="small" style="margin-bottom:15px" @click="$router.push({name:'posts_create'})">创建</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="list-body">

          <el-table :data="data" size="small">
            <el-table-column prop="posts_id" label="ID">
            </el-table-column>
            <el-table-column prop="posts_title" label="标题">
            </el-table-column>
            <el-table-column prop="category_name" label="分类">
            </el-table-column>
            <el-table-column prop="d" label="状态">
              <template slot-scope="scope">
                <el-tag type="success" size="mini" v-if="scope.row.posts_status==1">显示</el-tag>
                <el-tag type="info" size="mini" v-else>隐藏</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="d" label="发布时间">
              <template slot-scope="scope">
                {{scope.row.posts_publish_time|date}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button @click="$router.push({name:'posts_edit',params:{id:scope.row.posts_id}})" size="mini">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.posts_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <div class="list-footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="PAGE.PAGE_SIZES" :page-size="PAGE.PAGE_SIZE" :layout="PAGE.LAYOUT" :total="total" :current-page="query.page">
          </el-pagination>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import api from '@/config/api'
export default {
  data() {
    return {
      loading: false,
      category:{},
      total:0,
      query: {
        category_id:"",
        page:1,
        rows:20
      },
      data: []
    };
  },
  created(){
    this.getData();
    this.getCategory();
  },
  methods: {
    getData(){
      api.getPostList(this.query).then(res=>{
        if(res.code == 200){
          this.data = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    getCategory(){
      api.getCategory().then(res=>{
        if(res.code == 200){
          this.category = this.arrayToObj('category_id',res.data);
        }
      })
    },
    // 删除
    del(id) {
      this.$confirm("确认删除吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          api.deletePosts({posts_id:id}).then(res=>{
            if(res.code == 200){
              this.getData();
            }
          })
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.rows = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.page = val;
      this.getData();
    },
    onSubmit() {
      this.getData();
    }
  }
};
</script>
