import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import vuetify from './vuetify.js';

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
