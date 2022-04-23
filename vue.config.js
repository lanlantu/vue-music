const path = require('path');
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname,'src/styles/var.less'),
        
      ]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'https://cloud-music-api-red-rho.vercel.app',
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
