/*
import or const 
*/
import Vue from 'vue';
import Router from 'vue-router';

const Test = { template: '<div> test</div>' }

Vue.use(Router);

const routes = [
    {path: 'test', component: Test},
]

let router = new Router({
    base: '/frontend/',
    redirect: "/",
    routes: routes,
});

export default router;