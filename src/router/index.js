import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        redirect: '/music'
    },
    {
        path:'/music',
        component:()=>import('@/views/music'),
        redirect:'music/playlist',
        children:[
            {
                path:'/music/playlist',
                component:()=>import('@/views/playList/playList'),
                meta: {
                    keepAlive: true
                  }
            },
            {
                path:'/music/userlist',
                component:()=>import('@/views/userList/userList'),
                meta: {
                    title: '用户歌单',
                    keepAlive: true
                  }
            },
            {
                path:'/music/discoverylist',
                component:()=>import('@/views/discoveryList/discoveryList'),
                meta: {
                    title: '推荐歌单',
                    keepAlive: true
                  }
            },
            {
                path:'/music/search',
                component:()=>import('@/views/search/search'),
                meta: {
                    title: '搜索',
                    keepAlive: true
                  }
            },
            {
                path:'/music/comment/:id',
                component:()=>import('@/views/comment/comment')
            },
            {
                path: '/music/details/:id', // 音乐详情列表
                component: () => import('@/views/details/details')
              },
        ]
    }

]

export default new VueRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes
})