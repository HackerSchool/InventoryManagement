/*
import or const 
*/
import Vue from 'vue';
import Router from 'vue-router';
import MyRequests from './components/pages/MyRequests.vue';

Vue.use(Router);

const routes = [{ path: '/test', component: MyRequests }];

let router = new Router({
  base: '/frontend/',
  redirect: '/test', //change to '/'
  routes: routes,
});

export default router;
