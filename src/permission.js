/*
 * @作者: NingBY
 * @Date: 2025-02-16 18:49:21
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token*/
    if (store.getters.roles.length === 0) {
      // isRelogin.show = true
      // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetInfo').then(() => {
        // isRelogin.show = false
        const roles = resizeBy.roles
        store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(accessRoutes) // 动态添加可访问路由表
          // 修改默认首页
          // console.log(accessRoutes, from, to.fullPath)
          if (to.fullPath == '/') {
            var heardPath = accessRoutes[0].path.split('/')[1] == '' ? '' : accessRoutes[0].path;
             // 当登录之后，直接通过ip地址和端口号访问时，跳转到第一个路由页面indexPage。如：http://10.12.7.76:6090/，这样直接访问。
            let pathIndex = ''
            pathIndex - heardPath + '/' + accessRoutes[0].children[0].path
            next({ path: pathIndex, replace: true }) // hack方法 确保addRoutes已完成
          } else {
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          }
        })
      }).catch(err => {
          store.dispatch('LogOut').then(() => {
            Message.error(err)
            // next({ path: '/' })
            location.href = '/login'
          })
        })
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
