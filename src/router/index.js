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
        children:[
            {
                path:'/music/playlist',
                component:()=>import('@/views/playList/playList')
            },
            {
                path:'/music/userlist',
                component:()=>import('@/views/userList/userList')
            },
            {
                path:'/music/discoverylist',
                component:()=>import('@/views/discoveryList/discoveryList')
            },
            {
                path:'/music/search',
                component:()=>import('@/views/search/search')
            }
        ]
    }

]

export default new VueRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes
})