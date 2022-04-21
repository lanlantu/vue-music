import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        component: () => import('@/views/test')
    }

]

export default new VueRouter({
    routes
})