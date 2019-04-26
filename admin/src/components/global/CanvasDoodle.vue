<template>
  <div class="tc">
    <div class="pr">
      <div class="canvas-box" ref="canvasBox" :style="{maxHeight:`${winHeight}px`}">
        <div style="display:inline-block;overflow:hidden" :style="{width:rotate%180?`${height}px`:`${width}px`,height:rotate%180?`${width}px`:`${height}px`}">
          <canvas ref="canvas" :width="width" :height="height" :style="{'width':`${width}px`,'height':`${height}px`,transform: `rotate(${rotate}deg)`,marginTop:marginTop,marginLeft:marginLeft}" @mousedown="canvasDown($event)" @mouseup="canvasUp($event)" @mousemove="canvasMove($event)">
          </canvas>
        </div>
      </div>
      <div class="move-layer" v-if="move" @mousedown="layerDown($event)" @mouseup="layerUp($event)" @mousemove="layerMove($event)" :style="{'line-height':`${height<500?height:winHeight}px`}">按住鼠标可拖动图片</div>
    </div>
    <div class="toolbar">
      <span class="el-icon-rank" title="移动" @click="toolMove" :class="{active:move}"></span>
      <span class="iconfont icon-nishizhenxuanzhuan f18" title="左转90°" @click="toolRotate(-90)"></span>
      <span class="iconfont icon-shunshizhenxuanzhuan f18" title="右转90°" @click="toolRotate(90)"></span>
      <span class="el-icon-edit" title="编辑" @click="toolEdit" :class="{active:edit}"></span>
      <span class="el-icon-back" title="回退" @click="revoke"></span>
      <span class="el-icon-check" title="确定" @click="ok"></span>
    </div>
    <div class="edit-setting" v-if="edit">
      <ul class="sizes">
        <li :class="{active:sizes.current == item}" v-for="(item,index) in sizes.data" :key="index" @click="sizes.current = item"><span :style="{width:item+'px',height:item+'px'}"></span></li>
      </ul>
      <ul class="colors">
        <li :class="{active:colors.current == item}" v-for="(item,index) in colors.data" :key="index" @click="colors.current = item"><span :style="{borderColor:item,background:item}"></span></li>
      </ul>
    </div>
  </div>
</template>
<script>
var canvas = null;
var canvasBox = null;
export default {
  data() {
    return {
      //工具栏
      move: false,
      edit: true,
      moveFlag: false,
      offset: {
        x: 0,
        y: 0
      },
      sizes: {
        current: 6,
        data: [6, 10, 14]
      },
      colors: {
        current: "#ff0f00",
        data: ["#ff0f00", "#ffbe00", "#1a9bff", "#1aad19", "#4d4d4d"]
      },
      rotate: 0,

      // canvas
      width: 200,
      height: 200,
      ctx: null,
      imgData: [],
      flag: false,
      winHeight:500
    };
  },
  props: {
    img: {
      type: String
    }
  },
  mounted() {
    this.init();
    this.winHeight = window.innerHeight-200;
    window.onresize = ()=>{
      this.winHeight = window.innerHeight-200;
    }
  },
  methods: {
    init() {
      canvas = this.$refs.canvas;
      canvasBox = this.$refs.canvasBox;
      this.ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = this.img;
      img.onload = () => {
        if(img.height > img.width && img.width > 1400){
          this.width = 1400;
          this.height = img.height * 1400/img.width
        }else if(img.width > img.height && img.height > 1400){
          this.width = img.width * 1400/img.height;
          this.height = 1400;
        }else{
          this.width = img.width;
          this.height = img.height;
        }
        setTimeout(() => {
          this.ctx.drawImage(img, 0, 0, this.width, this.height);
          this.imgData.push(
            this.ctx.getImageData(0, 0, this.width, this.height)
          );
        }, 100);
      };
    },
    // 鼠标在画布上按下
    canvasDown(e) {
      this.flag = true;
      // this.ctx.shadowBlur = 10;
      // this.ctx.shadowColor = "red";
      this.ctx.lineWidth = this.sizes.current;
      this.ctx.strokeStyle = this.colors.current;
      console.log(e.offsetX, e.offsetY);
      this.ctx.beginPath();
      this.ctx.moveTo(e.offsetX, e.offsetY);
    },
    // 鼠标在画布上松开
    canvasUp() {
      this.flag = false;
      this.imgData.push(this.ctx.getImageData(0, 0, this.width, this.height));
    },
    // 鼠标在画布上移动
    canvasMove(e) {
      if (this.flag) {
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
      }
    },
    // 撤销一步操作
    revoke() {
      let data = this.imgData,
        len = data.length;
      if (len > 1) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.putImageData(data[len - 2], 0, 0);
        this.imgData.pop();
      }
    },
    // 启用编辑模式
    toolEdit() {
      this.edit = true;
      this.move = false;
    },
    // 启用拖动模式
    toolMove() {
      this.move = true;
      this.edit = false;
    },
    // 旋转
    toolRotate(deg) {
      let curDeg = this.rotate + deg;
      this.rotate = curDeg;
    },
    // 鼠标在拖拽层按下
    layerDown(e) {
      this.moveFlag = true;
      this.offset = {
        x: e.offsetX,
        y: e.offsetY,
        oldx: canvasBox.scrollLeft,
        oldy: canvasBox.scrollTop
      };
      console.log("left", canvasBox.scrollLeft);
      console.log("top", canvasBox.scrollTop);
    },
    // 鼠标在拖拽层拖动
    layerMove(e) {
      if (this.moveFlag) {
        let x = this.offset.x - e.offsetX + this.offset.oldx;
        let y = this.offset.y - e.offsetY + this.offset.oldy;
        canvasBox.scroll(x, y);
      }
    },
    // 鼠标在拖拽层松开
    layerUp() {
      this.moveFlag = false;
    },
    ok() {
      var loading = this.$loading({
        background: 'rgba(0,0,0,0.15)',
        text: '生成中...'
      });
      setTimeout(()=>{
        var canvasObj = document.createElement("canvas");
        var maxNum = Math.max(this.width, this.height);
        var num = maxNum / 2;
        canvasObj.width = maxNum;
        canvasObj.height = maxNum;
        var ctx = canvasObj.getContext("2d");
        ctx.translate(num, num);
        ctx.rotate((this.rotate * Math.PI) / 180);
        var img = new Image();
        img.src = canvas.toDataURL("image/png");
        img.onload = () => {
          ctx.drawImage(
            img,
            -num + (maxNum - this.width) / 2,
            -num + (maxNum - this.height) / 2,
            this.width,
            this.height
          );
          // 去掉空白操作
          let x,y,data;
          if(this.rotate % 180){
              if(this.width > this.height){
                  x = (this.width-this.height)/2;
                  y = 0;
              }else{
                  x = 0;
                  y = (this.height-this.width)/2;
              }
              data = ctx.getImageData(x,y,this.height,this.width);
              canvasObj.width = this.height;
              canvasObj.height = this.width;
          }else{
              if(this.width > this.height){
                  x = 0;
                  y = (this.width-this.height)/2;
              }else{
                  x = (this.height-this.width)/2;
                  y = 0;
              }
              data = ctx.getImageData(x,y,this.width,this.height);
              canvasObj.width = this.width;
              canvasObj.height = this.height;
          }
          ctx.putImageData(data,0,0);
          loading.close();
          this.$emit("update", canvasObj.toDataURL("image/png"));
        };
      },100);
    }
  },
  computed:{
    marginTop(){
      if(this.rotate%180){
        return -(this.height-this.width)/2+"px";
      }
      return "0px"
    },
    marginLeft(){
      if(this.rotate%180 && this.width > this.height){
        return -(this.width-this.height)/2+"px";
      }
      return "0px"
    }
  }
};
</script>
<style lang="scss" scoped>
.tc {
  text-align: center;
}
.pr {
  position: relative;
}
.canvas-box {
  max-height: 500px;
  overflow: hidden;
  margin: 0 auto;
}
.move-layer {
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  line-height: 500px;
  left: 0;
  top: 0;
  cursor: move;
  color: rgba(255, 255, 255, 0.3);
  user-select: none;
  font-size: 50px;
}
.toolbar {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  background: #f5f5f5;
  margin: 20px 0;
  span {
    padding: 0 10px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #000;
    }
    &.active {
      color: #000;
    }
  }
}
.edit-setting {
  display: inline-block;
  padding: 0 40px;
  background: #f5f5f5;
  ul {
    margin: 0 10px;
    padding: 5px 0 10px;
  }
  ul,
  li {
    display: inline-block;
    vertical-align: middle;
  }
  li {
    width: 20px;
    margin: 0 2px;
    cursor: pointer;
  }
  .sizes {
    span {
      background: #ccc;
      display: block;
      border-radius: 50%;
    }
    li.active {
      span {
        background: #9083ed !important;
      }
    }
  }
  .colors {
    span {
      display: block;
      width: 16px;
      height: 16px;
      border-style: solid;
      border-width: 4px;
      box-sizing: border-box;
    }
    li.active {
      span {
        background: #fff !important;
      }
    }
  }
}
</style>
