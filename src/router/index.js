import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */
// 前台静态路由
export const frontendRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    isFrontend: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/frontend/allocate/index'),
        meta: { title: '站点总览', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    isFrontend: true,
    children: [
      {
        path: 'systemIndex',
        component: () => import('@/views/frontend/index'),
        meta: { title: '系统首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/power',
    component: Layout,
    meta: { title: '配置管理', icon: 'chart' },
    isFrontend: true,
    children: [
      { path: 'addPower',
        component: () => import('@/views/frontend/allocate/addPower'),
        name: 'addPower',
        meta: { title: '配置电站', keepAlive: true, requiresAuth: true } // 新增缓存配置
      },
      { path: 'list',
        component: () => import('@/views/frontend/allocate/listPower'),
        meta: { title: '电站列表' },
      },
      {
        path: 'list/edit/:id(\\d+)',
        hidden: true,
        component: () => import('@/views/frontend/allocate/editPower'),
        name: 'editPower',
        meta: { title: '电站列表 / 编辑电站', activeMenu: '/power/list' }
      }
    ]
  },
  {
    path: '/energy',
    component: Layout,
    meta: { title: '设备监控', icon: 'monitor' },
    isFrontend: true,
    children: [
      {
        path: '',
        component: () => import('@/views/frontend/energy'),
        meta: { title: '储能单元' }
      },
      {
        path: 'BMS',
        hidden: true,
        component: () => import('@/views/frontend/energy/batteryBMS'),
        meta: { title: 'BMS', addTitle: '储能单元' }
      },
      {
        path: 'BMS/clusters/:id(\\d+)',
        hidden: true,
        component: () => import('@/views/frontend/energy/batteryClusters'),
        meta: { title: '电池簇', activeMenu: '/energy/BMS', addTitle: '储能单元 / BMS' }
      },
      {
        path: 'PCS',
        hidden: true,
        component: () => import('@/views/frontend/energy/PCS'),
        meta: { title: 'PCS', addTitle: '储能单元' }
      },
      {
        path: 'airConditioning',
        hidden: true,
        component: () => import('@/views/frontend/energy/airConditioning'),
        meta: { title: '空调', addTitle: '储能单元' }
      },
      {
        path: 'fire',
        hidden: true,
        component: () => import('@/views/frontend/energy/fire'),
        meta: { title: '消防', addTitle: '储能单元' }
      },
      {
        path: 'meters',
        hidden: true,
        component: () => import('@/views/frontend/energy/meters'),
        meta: { title: '电表', addTitle: '储能单元' }
      },
      /*{
        path: 'temperature',
        component: () => import('@/views/frontend/energy/temperature'),
        meta: { title: '温度度主机', addTitle: '储能单元' }
      },
      {
        path: 'energyMeters',
        component: () => import('@/views/frontend/energy/energyMeters'),
        meta: { title: '储能电表', addTitle: '储能单元' }
      },
      {
        path: 'loadMeters',
        component: () => import('@/views/frontend/energy/loadMeters'),
        meta: { title: '负载电表', addTitle: '储能单元' }
      },
      {
        path: 'gridMeters',
        component: () => import('@/views/frontend/energy/gridMeters'),
        meta: { title: '电网电表', addTitle: '储能单元' }
      },
      {
        path: 'DI',
        component: () => import('@/views/frontend/energy/DI'),
        meta: { title: 'DI', addTitle: '储能单元' }
      },
      {
        path: 'DO',
        component: () => import('@/views/frontend/energy/DO'),
        meta: { title: 'DO', addTitle: '储能单元' }
      },*/
    ]
  },
  {
    path: '/logging',
    component: Layout,
    meta: { title: '事件记录', icon: 'chart' },
    isFrontend: true,
    children: [
      { path: 'current', component: () => import('@/views/frontend/logging/current.vue'), meta: { title: '当前事件' }},
      { path: 'history', component: () => import('@/views/frontend/logging/history.vue'), meta: { title: '历史事件' }},
      { path: 'event', component: () => import('@/views/frontend/bms'), meta: { title: '事件统计' }},
      { path: 'operate', component: () => import('@/views/frontend/logging/operate.vue'), meta: { title: '操作记录' }},
    ]
  },
  {
    path: '/report',
    component: Layout,
    meta: { title: '统计报表', icon: 'chart' },
    isFrontend: true,
    children: [
      { path: 'event', component: () => import('@/views/frontend/report/event'), meta: { title: '事件报表' }},
      { path: 'electricity', component: () => import('@/views/frontend/report/electricity'), meta: { title: '电量报表' }},
      { path: 'earnings', component: () => import('@/views/frontend/report/earnings'), meta: { title: '收益报表' }},
      { path: 'power', component: () => import('@/views/frontend/report/power'), meta: { title: '功率报表' }},
      { path: 'runStatus', component: () => import('@/views/frontend/report/runStatus'), meta: { title: '运行状态报表' }},
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '策略管理', icon: 'chart' },
    isFrontend: true,
    children: [
      { path: 'tactics', component: () => import('@/views/frontend/tactics'), meta: { title: '策略管理' }},
    ]
  },
  {
    path: '/ruleengine',
    component: Layout,
    meta: { title: '规则引擎', icon: 'chart' },
    isFrontend: true,
    children: [
      { path: 'script', component: () => import('@/views/iot/scene/script'), meta: { title: '规则脚本' }},
      { path: 'scene', component: () => import('@/views/iot/scene'), meta: { title: '场景联动' }},
      { path: 'alert', component: () => import('@/views/iot/alert'), meta: { title: '告警配置' }},
      { path: 'alertLog', component: () => import('@/views/iot/alert/log'), meta: { title: '告警记录' }},
    ]
  },
  {
    path: '/template',
    component: Layout,
    meta: { title: '运维管理', icon: 'chart' },
    isFrontend: true,
    children: [
      { path: 'info', component: () => import('@/views/energy/station'), meta: { title: '储能站点信息' }},
      { path: 'protocol', component: () => import('@/views/iot/protocol'), meta: { title: '协议管理' }},
      { path: 'alert', component: () => import('@/views/iot/varTemp/temp'), meta: { title: '采集点模板' }},
    ]
  },
]

// 公共路由
export const constantRoutes = [
    ...frontendRoutes,
    {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
    {
    path: '/bigScreen',
    component: () => import('@/views/bigScreen/home'),
    hidden: true,
    meta: { bigScreen: true }
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/index'),
  //       name: 'Index',
  //       meta: { title: '首页', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  },
  {
    path: '/iot',
    component: Layout,
    hidden: true,
    permissions: ['iot:device:add'],
    children: [
      {
        path: 'product-edit',
        component: () => import('@/views/iot/product/product-edit'),
        name: 'ProductEdit',
        meta: { title: '编辑产品', activeMenu: '/iot/product',nocache: true}
      },
      {
        path: 'device-edit',
        component: () => import('@/views/iot/device/device-edit'),
        name: 'DeviceEdit',
        meta: { title: '编辑设备', activeMenu: '/iot/device', noCache: true}
      }
    ]
  },
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
