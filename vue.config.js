const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {

    proxy: {
      '/api': {
        target: 'https://cloud-music-api-red-rho.vercel.app',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/test': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        }
      }
    }
  }

})
