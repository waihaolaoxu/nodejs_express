<template>
  <div>
    <div class="card-box">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="card">
            <div class="iconfont icon-tianxieziliao" style="color:#9481f4;"></div>
            <div class="tit f18">文章管理</div>
            <div class="des f14 mt15">文章管理</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'posts_create'})">去创建</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="card">
            <div class="iconfont icon-lingshoucaigou" style="color:#d27ff3;"></div>
            <div class="tit f18">分类管理</div>
            <div class="des f14 mt15">分类管理</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'category_create)'})">去创建</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="card">
            <div class="iconfont icon-xitongguanli-" style="color:#f482b6;"></div>
            <div class="tit f18">用户管理</div>
            <div class="des f14 mt15">用户管理</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'user_create'})">去创建</el-button>
          </div>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="card">
            <div class="iconfont icon-send" style="color:#80f2c1;"></div>
            <div class="tit f18">营销推广</div>
            <div class="des f14 mt15">...</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'setactivity_list'})">去创建</el-button>
          </div>
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>


<script>
export default {

};
</script>

<style lang="scss" scoped>
@media screen and(min-width: 1470px) {
  .card-box{
    width: 1050px;
    margin:100px auto;
  }
}
@media screen and(max-width: 768px) {
  .card-box{
    margin:0 auto;
  }
}
.card {
  height: 460px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  padding: 25px;
  box-sizing: border-box;
  border: solid 1px #dfe4ed;
  max-width: 320px;
  margin: 10px auto;
  .iconfont {
    height: 50px;
    font-size: 50px;
    padding: 60px 0;
  }
  .tit {
    font-weight: bold;
    color: #324156;
  }
  .des {
    line-height: 1.8;
    color: #adb0b7;
    height: 125px;
  }
}
</style>
