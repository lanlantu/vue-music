const path = require('path');
const { defineConfig } = require('@vue/cli-service')
const dayjs = require('dayjs')

// 注入版本更新时间
process.env.VUE_APP_UPDATE_TIME = dayjs()
  .locale('zh-cn')
  .format('YYYY-MM-DD')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname,'src/styles/var.less'),
        path.join(__dirname,'src/styles/mixin.less'),
      ]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://cloud-music-api-red-rho.vercel.app',
        target: 'http://localhost:3000',
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
