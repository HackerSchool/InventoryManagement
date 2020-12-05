import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  iconfont: 'fa',
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        background: '#2B2A29',
        primary: 'blue',
        secondary: '#6dba83',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});

export default vuetify;
