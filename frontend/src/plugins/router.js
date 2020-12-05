/*
import or const 
*/
import { getAuthToken } from '@/api/httpClient';
import Dashboard from '@/components/pages/Dashboard.vue';
import Login from '@/components/pages/Login.vue';
import MyRequests from '@/components/pages/MyRequests.vue';
import Header from '@/components/HeaderAndFooter/HeaderBar.vue';
import Footer from '@/components/HeaderAndFooter/FooterBar.vue';
import Locations from '@/components/pages/Locations.vue';
import Materials from '@/components/pages/Materials.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { layout_h: Header, layout_f: Footer },
  },
  {
    path: '/test',
    name: 'requisitions',
    component: MyRequests,
    meta: { layout_h: Header, layout_f: Footer },
  },
  {
    path: '/locations',
    name: 'locations',
    component: Locations,
    meta: { layout_h: Header, layout_f: Footer },
  },
  {
    path: '/materials',
    name: 'materials',
    component: Materials,
    meta: { layout_h: Header, layout_f: Footer },
  },
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
