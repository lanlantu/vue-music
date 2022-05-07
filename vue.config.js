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


})
