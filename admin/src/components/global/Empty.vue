<template>
  <div class="empty">
    <div v-if="loading" class="tc">
      <div class="iconfont icon-sousuo1" style="font-size:80px;"></div>
      检索中...
    </div>
    <div v-else>
      <div class="iconfont icon-wushuju" style="font-size:80px;"></div>
      <slot>暂无数据</slot>
    </div>
  </div>
</template>
<script>
export default {
  props:["loading"]
}
</script>
<style lang="scss" scoped>
.empty{
  padding:100px 0;
  text-align:center;
  color:#ccc;
}
</style>


