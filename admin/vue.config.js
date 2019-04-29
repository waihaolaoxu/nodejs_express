module.exports = {
  assetsDir:"./assets",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8990',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
