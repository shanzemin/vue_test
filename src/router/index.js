import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from '@/components/login/register'
import home from '@/components/home/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/register',
      name: 'register',
      component: register
    }, {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})

// 设置全局守卫 监听路由中是否包含token 没有则跳转到登录界面
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
