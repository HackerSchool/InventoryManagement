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
import Members from '@/components/pages/Members.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard', layoutHeader: Header, layoutFooter: Footer },
  },
  {
    path: '/test',
    name: 'requisitions',
    component: MyRequests,
    meta: { layoutHeader: Header, layoutFooter: Footer },
  },
  {
    path: '/locations',
    name: 'locations',
    component: Locations,
    meta: { title: 'Locations', layoutHeader: Header, layoutFooter: Footer },
  },
  {
    path: '/materials',
    name: 'materials',
    component: Materials,
    meta: { title: 'Materials', layoutHeader: Header, layoutFooter: Footer },
  },
  {
    path: '/members',
    name: 'members',
    component: Members,
    meta: { title: 'Members', layoutHeader: Header, layoutFooter: Footer },
  },
  { path: '/login', name: 'login', component: Login, meta: { title: 'Login', noAuth: true } },
];

const router = new Router({
  mode: 'history',
  base: '/',
  redirect: '/',
  routes: routes,
});

router.beforeEach((to, _from, next) => {
  // Change the document title
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  if (nearestWithTitle) document.title = `${nearestWithTitle.meta.title} | Hackerschool Inventory`;
  else document.title = 'Hackerschool Inventory';

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
