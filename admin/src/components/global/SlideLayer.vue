<template>
    <div class="slide-box">
        <div class="flexbox">
            <div class="pr full flex">
                <div class="slide-pic full tc flexbox" v-if="data[index].type==1">
                    <img :src="data[index].url" alt=""  ref="slideImg">
                </div>
                <video :poster="data[index].cover" ref="slideVideo" controls class="slide-video full" v-if="data[index].type==2">
                    <source :src="data[index].url" type="video/ogg">
                    <source :src="data[index].url" type="video/mp4">
                    <source :src="data[index].url" type="video/webm">
                </video>
                <div class="el-icon-arrow-left arrow-left" @click="prev"></div>
                <div class="el-icon-arrow-right arrow-right" @click="next"></div>
            </div>
            <ul class="slide-des" v-if="des.length">
              <li v-for="(item,index) in des" :key="index">
                <span class="des-tit">{{item.name}}：</span>
                <span class="des-con">{{item.con}}</span>
              </li>
            </ul>
        </div>
        <span class="closebtn el-icon-close" :class="{isdes:des.length>0}" @click="$store.commit('CLOSE_BIGIMG')"></span>
    </div>
</template>
<script>
export default {
  data() {
    return {
      index: this.current
    };
  },
  props: {
    current: Number, //当前索引
    data: {
      //数据列表
      type: Array,
      required: true
    },
    des: {
      type:Array
    }
  },
  methods: {
    prev() {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.data.length - 1;
      }
      let item = this.data[this.index];
      if(item.type == '2'){
        //更新视频url
        this.$refs.slideVideo.src = item.url;
      }else if(item.type == '1'){
        //更新图片url
        this.$refs.slideImg.src = item.url;
      }
    },
    next() {
      if (this.index < this.data.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
      let item = this.data[this.index];
      if(item.type == '2'){
        //更新视频url
        this.$refs.slideVideo.src = item.url;
      }else if(item.type == '1'){
        //更新图片url
        this.$refs.slideImg.src = item.url;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.slide-box {
  background: rgba(0, 0, 0, 0.8);
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  .flexbox {
    height: 100%;
  }
  .slide-pic {
      line-height: 100%;
      align-items: center;
      justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }
  .slide-video {
    object-fit: contain;
  }
  .slide-des {
    width: 300px;
    background: #fff;
    padding: 40px 20px 20px;
    box-sizing: border-box;
    overflow-y: auto;
    line-height: 1.6;
    font-size: 14px;
    li{
      padding: 5px 0;
    }
    .des-tit{
      color:#999;
    }
    .des-con{
      color:#666;
    }
  }
  .closebtn {
    position: absolute;
    right: 50px;
    top: 50px;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    &.isdes{
      color:#666;
      top:10px;
      right:10px;
      &:hover{
        color:#2b2b2b;
      }
    }
  }
  .arrow-left,
  .arrow-right {
    position: absolute;
    top: 50%;
    font-size: 50px;
    color: #c1c1c1;
    cursor: pointer;
    &:hover{
      color:#fff;
    }
  }
  .arrow-left {
    left: 20px;
  }
  .arrow-right {
    right: 20px;
  }
}
.shadow-layer {
  position: fixed;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
