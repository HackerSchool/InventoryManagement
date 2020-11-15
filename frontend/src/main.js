import Vue from 'vue';
import App from './App.vue';
import './plugins/notifications';
import router from './plugins/router';
import store from './plugins/store';
import vuetify from './plugins/vuetify';

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
