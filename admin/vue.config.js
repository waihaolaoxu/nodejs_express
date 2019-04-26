module.exports = {
  devServer: {
    proxy: {
      '/bms': {
        // target: 'http://188.131.191.181:8997',//dev
        // target: 'http://188.131.183.12:8997',//test
        target: 'http://bms-uat.51beauty.com.cn',//uat
        // target: 'http://bms.51beauty.com.cn',//prd
        ws: true,
        changeOrigin: true
      }
    }
  }
}
