<template>
  <v-app id="app" style="width: 100%; height: 100%">
    <notifications />
    <component :is="$route.meta.layoutNav"> </component>
    <v-main>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',

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
