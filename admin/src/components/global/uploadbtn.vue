<template>
  <div class="pr">
    <el-button :type="type || 'default'" :id="id" :size="size" :icon="icon" v-if="button">
      <slot></slot>
    </el-button>
    <div class="upload-btn" :id="id" v-else>
      <img :src="data" v-if="!button && data && single">
      <div class="el-icon-plus" v-else></div>
      <!-- 单图上传并且是非按钮形式的默认会展示上传进度 -->
      <el-progress :text-inside="true" :percentage="percent" :stroke-width="18" class="progress" v-if="!button && single && percent!= 100"></el-progress>
    </div>
    <div class="pa disabled-layer" v-show="disabled"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: "",
      percent: 100
    };
  },
  props: {
    data: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    button: {
      //是否按钮形式展示
      type: Boolean
    },
    type: {
      //按钮风格
      type: String
    },
    size: {
      type: String
    },
    icon: {
      type: String
    },
    single: {
      //是否是单图上传模式 默认多图
      default: false,
      type: Boolean
    },
    maxPic: {
      //限制最大图片上传大小
      default: 10 * 1024 * 1024,
      type: Number
    },
    maxVideo: {
      //限制最大视频上传大小
      default: 20 * 1024 * 1024,
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
    },
    forbidPng: {
      //禁止png图片上传  默认可以上传
      default: false,
      type: Boolean
    },
    maxNum: {
      //单次最大可上传数量
      type: Number
    },
    disabled: {
      //上传组件禁用，默认不禁用
      default: false,
      type: Boolean
    }
  },
  mounted() {
    let uploadType = [
      { title: "Image files", extensions: "png" },
      { title: "Image files", extensions: "jpeg" },
      { title: "Image files", extensions: "jpg" },
      { title: "Image files", extensions: "bmp" },
      { title: "video files", extensions: "mp4" }
    ]
    this.$nextTick(() => {
      if (this.forbidPic){
        uploadType.splice(0,4);
      }
      if(this.forbidVideo){
        uploadType.splice(4,1);
      }
      if(this.forbidPng){
        uploadType.splice(0,1);
      }
      this.upload(uploadType);
    });
  },
  methods: {
    showLoading() {
      this.loading = this.$loading({
        background: "rgba(0,0,0,0.15)",
        text: "上传中..."
      });
    },
    upload(uploadType) {
      var _self = this;
      var qiniuDomain = "http://qn.nihaomc.com/"
      if(this.isDev()){
        qiniuDomain = "http://qiniu.dev.nihaomc.com/"
      }
      new window.QiniuJsSDK().uploader({
        disable_statistics_report: false,
        log_level: -1,
        multi_selection: _self.single
          ? false
          : !(window.moxie.core.utils.Env.OS.toLowerCase() === "ios"),
        runtimes: "html5", //上传模式,依次退化
        browse_button: _self.id, //上传选择的点选按钮，**必需**
        filters: {
          mime_types: uploadType
        },
        max_file_size: "100mb", //最大文件体积限制
        chunk_size: "4mb", //分块上传时，每片的体积
        // uptoken_url: "/api/file/getUpToken", //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        uptoken_func:function(){
          var xhr = new XMLHttpRequest(),res={};
          xhr.open("GET","/bms/file/getUpToken",false);
          xhr.send();
          res = JSON.parse(xhr.responseText);
          if(res.uptoken){
            return res.uptoken;
          }else{
            _self.$message({
              type:"warning",
              message:res.message
            });
            setTimeout(()=>{
              _self.$router.push({name:"login"});
            },1000);
          }
        },
        domain: qiniuDomain, //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: true, //设置上传文件的时候是否每次都重新获取新的token
        unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          FilesAdded: function(up, files) {
            _self.showLoading();
            if (_self.maxNum && files.length > _self.maxNum) {
              _self.$message({
                type: "warning",
                message: `只能上传（${_self.maxNum}）张图片或视频`
              });
              window.plupload.each(files, function(file) {
                up.removeFile(file);
              });
              return;
            }
            window.plupload.each(files, function(file) {
              // 文件添加进队列后，处理相关的事情
              if (file.type == "video/mp4" && file.size > _self.maxVideo) {
                let maxVideoText =
                  _self.maxVideo / 1024 / 1024 >= 1
                    ? _self.maxVideo / 1024 / 1024 + "MB"
                    : _self.maxVideo / 1024 + "KB";
                _self.$message({
                  type: "warning",
                  message: `不能选择上传大于${maxVideoText}的视频文件`
                });
                up.removeFile(file);
                return false;
              }
              if (file.type != "video/mp4" && file.size > _self.maxPic) {
                let maxPicText =
                  _self.maxPic / 1024 / 1024 >= 1
                    ? _self.maxPic / 1024 / 1024 + "MB"
                    : _self.maxPic / 1024 + "KB";
                _self.$message({
                  type: "warning",
                  message: `不能选择上传大于${maxPicText}的图片文件`
                });
                up.removeFile(file);
                return false;
              }
              _self.$emit("FilesAdded", up, file);
            });
          },
          BeforeUpload: function(up, file) {
            // 每个文件上传前，处理相关的事情
            _self.$emit("BeforeUpload", up, file);
          },
          UploadProgress: function(up, file) {
            // 每个文件上传时，处理相关的事情
            _self.percent = file.percent;
            _self.$emit("UploadProgress", up, file);
          },
          UploadComplete: function() {
            //队列文件处理完毕后，处理相关的事情
            _self.loading.close();
            _self.$emit("UploadComplete");
          },
          FileUploaded: function(up, file, info) {
            var fileType = 1;
            if(file.type.indexOf('video/mp4')>=0){
              fileType = 2;
            }
            // 每个文件上传成功后，处理相关的事情
            var path = up.getOption("domain") + file.target_name; //完整图片地址
            if(path.lastIndexOf('.JPG') == path.length-4){
              let paths = path.split('.JPG');
              path = '';
              for(let i in paths){
                if(i<paths.length-1){
                  path+=paths[i];
                }
              }
              path += '.jpg';
            }
            if(path.lastIndexOf('.PNG') == path.length-4){
              let paths = path.split('.PNG');
              path = '';
              for(let i in paths){
                if(i<paths.length-1){
                  path+=paths[i];
                }
              }
              path = paths[0]+'.png'
            }
            if(path.lastIndexOf('.MP4') == path.length-4){
              let paths = path.split('.MP4');
              path = '';
              for(let i in paths){
                if(i<paths.length-1){
                  path+=paths[i];
                }
              }
              path = paths[0]+'.mp4'
            }
            _self.$emit("FileUploaded", {
              up: up,
              file: file,
              info: info,
              fileType:fileType,//资源格式，1图片，2视频
              fileSize:file.size,//资源大小
              compressFileUrl: path + (fileType==1?"!lg":""), //生成水印图用
              sourceFileUrl: path //原图地址
            });
          },
          Error: function(up, err, errTip) {
            //上传出错时，处理相关的事情
            _self.loading.close();
            _self.$emit("Error", up, err, errTip);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.disabled-layer {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
}
.progress {
  width: 80%;
  left: 10%;
  top: 50%;
  font-size: 14px;
  margin-top: -9px;
  position: absolute;
}
</style>
