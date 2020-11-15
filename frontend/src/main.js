import Vue from 'vue';
import App from './App.vue';
import './notifications';
import router from './router';
import store from './store';
import vuetify from './vuetify';

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
