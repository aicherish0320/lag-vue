import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Layout from '../components/Layout.vue'
// 1. 注册路由插件
// Vue.use 是用来注册插件，他会调用传入对象的 install 方法
Vue.use(VueRouter)
// 路由规则
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'index',
        path: '',
        component: Index
      },
      {
        name: 'detail',
        path: 'detail/:id',
        props: true,
        component: () => import('@/views/Detail.vue')
      }
    ]
  }
]
// 2. 创建 router 对象
const router = new VueRouter({
  routes
})

export default router
