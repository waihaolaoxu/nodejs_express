<template>
  <div>
    <ul class="piclist">
      <li v-for="(x,index) in data" :key="index">
        <div class="percent" v-if="x.id && percent[x.id] != 100">
          <div class="percent-bar" :style="{width:percent[x.id]+'%'}"></div>
        </div>
        <img :src="x.sourceFileUrl+(x.fileSize?'!xs':'')" class="cover" v-if="x.fileType == 1">
        <video class="cover" preload="none" controls v-if="x.fileType == 2">
          <source :src="x.sourceFileUrl" type="video/mp4">
        </video>
        <el-button circle icon="el-icon-delete" type="danger" size="mini" class="delbtn tran" @click="del(index)"></el-button>
      </li>
      <li class="uploadMaterial">
        <upload-btn id="material_add_pic" :maxPic="maxPic" :forbidVideo="forbidVideo" :forbidPic="forbidPic" @FileUploaded="FileUploaded" @FilesAdded="FilesAdded" @UploadProgress="UploadProgress" @Error="Error"></upload-btn>
        <span class="f12" v-if="forbidVideo">上传图片</span>
        <template v-else>
          <span class="f12" v-if="forbidPic">上传视频</span>
          <span class="f12" v-else>上传图片/视频</span>
        </template>
      </li>
    </ul>
    <div slot="footer" class="dialog-footer tr">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button type="primary" size="medium" @click="ok">确 定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [], //图片数据
      percent:{ //上传进度

      }
    };
  },
  props:{
    maxPic: {
      //限制最大图片上传大小
      default: 10 * 1024 * 1024,
      type: Number
    },
    forbidVideo: {
      //禁止视频上传  默认可以上传
      default: false,
      type: Boolean
    },
    forbidPic: {
      //禁止图片上传  默认可以上传
      default: false,
      type: Boolean
    }
  },
  methods: {
    // 图片上传钩子 start
    FilesAdded(up,file){
      this.data.push({
        id:file.id,
        fileType:1,
        fileSize:0,
        sourceFileUrl:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
      })
    },
    UploadProgress(up, file) {
      this.$set(this.percent,file.id,file.percent);
    },
    FileUploaded(opt){
      this.each(this.data,(i,d)=>{
        if(d.id == opt.file.id){
          this.data.splice(i,1,{
            fileType:opt.fileType,
            fileSize:opt.file.size,
            compressFileUrl:opt.compressFileUrl,
            sourceFileUrl:opt.sourceFileUrl
          });
        }
      });
    },
    Error(up){
      let index = 0;
      let flag = false;
      this.each(this.data,function(i,d){
        if(d.id === up.id){
          flag = true;
          index = i;
        }
      });
      if(flag){
        this.data.splice(index,1);
      }
    },
    // 图片上传钩子 end

    del(index){
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         this.data.splice(index,1);
      });
    },
    close() {
      this.$emit("close");
    },
    ok(){
      this.$emit("update",JSON.parse(JSON.stringify(this.data)));
      this.close();
    }
  }
};
</script>
<style lang="scss">
.uploadMaterial {
  .upload-btn {
    border: 0;
    min-height: 70px;
  }
  text-align: center;
  color: #999;
  &:hover {
    border-color: #9083ed !important;
  }
}
</style>
<style lang="scss" scoped>
.piclist {
  padding-bottom: 20px;
  overflow: hidden;
  min-height: 200px;
  li {
    width: 100px;
    height: 100px;
    float: left;
    border: dashed 1px #ddd;
    position: relative;
    margin: 10px 10px 0 0;
    overflow: hidden;
    .percent{
      height: 10px;
      width:90%;
      position:absolute;
      left:5%;
      top:50%;
      margin-top: -5px;
      background:#ccc;
      border-radius:5px;
      overflow: hidden;
      .percent-bar{
        width:0;
        height:100%;
        background:#9083ED;
      }
    }
    &:hover {
      .delbtn {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .delbtn {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    margin: -14px 0 0 -14px;
    visibility: hidden;
    opacity: 0;
  }
  .uploadbtn {
    text-align: center;
    font-size: 20px;
    color: #999;
    cursor: pointer;
    &:hover {
      border-color: #9083ed;
    }
    .icon {
      display: block;
      margin-top: 30px;
    }
    .tit {
      font-size: 12px;
    }
  }
}
</style>
