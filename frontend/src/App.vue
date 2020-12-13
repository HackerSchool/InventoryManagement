<template>
  <v-app id="app" style="width: 100%; height: 100%">
    <notifications />
    <component :is="$route.meta.layoutHeader"> </component>

    <router-view> </router-view>

    <component :is="$route.meta.layoutFooter"> </component>
  </v-app>
</template>

<script>
import HeaderBar from './components/HeaderAndFooter/HeaderBar.vue';
import FooterBar from './components/HeaderAndFooter/FooterBar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',

  components: {
    HeaderBar,
    FooterBar,
  },

  mounted() {
    const jwt = localStorage.getItem('token');
    if (jwt) this.loginUser(jwt);
  },

  methods: {
    ...mapActions('user', ['loginUser']),
  },
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
#app {
  background-color: var(--v-background-base);
}
</style>
