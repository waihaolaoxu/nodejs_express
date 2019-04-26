/*
 * @Name 全局组件
 * @Author: qdlaoxu 
 * @Date: 2018-11-19 20:34:27 
 * @Last Modified by:   qdlaoxu
 * @Last Modified time: 2019-04-26 10:36:02
 */

import slideLayer from './global/SlideLayer';
import uploadbtn from './global/uploadbtn.vue';
import Empty from './global/Empty.vue';
import UploadLayer from './global/UploadLayer.vue';
import CanvasDoodle from './global/CanvasDoodle.vue';
var obj = {
  install(Vue) {
    Vue.component('empty', Empty);
    Vue.component('slide-layer', slideLayer);
    Vue.component('upload-btn', uploadbtn);
    Vue.component('upload-layer', UploadLayer);
    Vue.component('canvas-doodle', CanvasDoodle);
  }
}
export default obj;