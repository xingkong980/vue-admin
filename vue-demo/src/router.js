import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout';
import Home from './views/Home.vue';
import store from './store';
import { readCookie } from './util/cookie';

Vue.use(Router);
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
      // component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Home,
    },
    {
      path: '/dashborad',
      name: 'dashborad',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('./views/index.vue'),
        },
        {
          path: 'training/trainManagement',
          name: 'trainManagement',
          component: () => import('./views/TrainManagement.vue'),
        },
        {
          path: 'training/trainManagement/:id',
          name: 'trainManagementEdit',
          component: () => import('./views/TrainManagementEdit.vue'),
        },
        {
          path: 'personal',
          name: 'personal',
          component: () => import('./views/Personal.vue'),
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('./views/Setting.vue'),
        },
      ],
    },
    { path: '*', name: '404', component: () => import('./views/404.vue'), },
  ],
});

// 路由全局钩子
router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    if (readCookie('Token')) {
      // 更新currentPath
      store.commit('SET_CURRENT_PATH', to.path.split('/dashborad')[1]);
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
});

export default router;

export const asyncRouterMap = [
  {
    path: '/permission',
    component: 'Layout',
    name: '权限测试',
    meta: { role: ['admin', 'super_editor'] }, //页面需要的权限
    children: [
      {
        path: 'index',
        component: 'Permission',
        name: '权限测试页',
        meta: { role: ['admin', 'super_editor'] }, //页面需要的权限
      },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
];
