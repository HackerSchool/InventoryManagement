/*
import or const 
*/
import { getAuthToken } from '@/api/httpClient';
import Dashboard from '@/components/pages/Dashboard.vue';
import Login from '@/components/pages/Login.vue';
import MyRequests from '@/components/pages/MyRequests.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/test', name: 'requisitions', component: MyRequests },
  { path: '/login', name: 'login', component: Login, meta: { noAuth: true } },
];

const router = new Router({
  mode: 'history',
  base: '/',
  redirect: '/',
  routes: routes,
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => !record.meta.noAuth) && !getAuthToken()) {
    next({
      path: '/login',
      params: { nextUrl: to.fullPath },
    });
    return;
  }

  if (to.matched.some((record) => record.name == 'login') && getAuthToken()) {
    next({ path: '/' });
    return;
  }

  next();
});

export default router;
