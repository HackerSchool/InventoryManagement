/*
import or const 
*/
import { getAuthToken } from '@/api/httpClient';
import Dashboard from '@/components/pages/Dashboard.vue';
import Login from '@/components/pages/Login.vue';
import MyRequests from '@/components/pages/MyRequests.vue';
import Locations from '@/components/pages/Locations.vue';
import Materials from '@/components/pages/Materials.vue';
import Members from '@/components/pages/Members.vue';
import NavBar from '@/components/NavAndFooter/NavBar.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard', layoutNav: NavBar },
  },
  {
    path: '/test',
    name: 'requisitions',
    component: MyRequests,
    meta: { layoutNav: NavBar },
  },
  {
    path: '/locations',
    name: 'locations',
    component: Locations,
    meta: { title: 'Locations', layoutNav: NavBar },
  },
  {
    path: '/materials',
    name: 'materials',
    component: Materials,
    meta: { title: 'Materials', layoutNav: NavBar },
  },
  {
    path: '/members',
    name: 'members',
    component: Members,
    meta: { title: 'Members', layoutNav: NavBar },
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
