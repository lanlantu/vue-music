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
        component:()=>import('@/views/music')
    }

]

export default new VueRouter({
    routes
})