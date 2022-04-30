import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store  from '@/store'
import musicMessage from '@/base/music-message'
import Icon from '@/base/music-icon/music-icon'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
import'@/styles/index.less'

// 弹出层
Vue.use(musicMessage)


// 懒加载
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('@/assets/img/default.png')
})

// icon 组件
Vue.component(Icon.name, Icon)


const redirectList = ['/music/details', '/music/comment']
router.beforeEach((to, from, next) => {
  if (redirectList.includes(to.path)) {
    next()
  } else {
    document.title =
      (to.meta.title && `${to.meta.title} - 兰兰兔在线音乐播放器`) ||
      '兰兰兔在线音乐播放器'
    next()
  }
})


window.mmplayer = `欢迎使用 lanlantuPlayer!
作者：兰兰兔
Github：https://github.com/lanlantu
api接口来源于Github开源项目:Binaryify/NeteaseCloudMusicApi
歌曲来源于网易云音乐 (https://music.163.com)
`
// eslint-disable-next-line no-console
console.info(`%c${window.mmplayer}`, `color:green`)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
