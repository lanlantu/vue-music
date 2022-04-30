import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store  from '@/store'
import musicMessage from '@/base/music-message'
import Icon from '@/base/music-icon/music-icon'
Vue.config.productionTip = false
import'@/styles/index.less'

// 弹出层
Vue.use(musicMessage)


// icon 组件
Vue.component(Icon.name, Icon)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
