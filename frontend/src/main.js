import Vue from 'vue';
import App from './App.vue';
import './plugins/notifications';
import router from './plugins/router';
import store from './plugins/store';
import vuetify from './plugins/vuetify';

Vue.prototype.$loading = {
  show: function () {
    store.dispatch('showLoadingBar');
  },
  hide: function () {
    store.dispatch('hideLoadingBar');
  },
};

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
