<template>
  <v-app id="app" style="width: 100%; height: 100%">
    <notifications />
    <HeaderBar> </HeaderBar>

    <router-view> </router-view>

    <FooterBar> </FooterBar>
  </v-app>
</template>

<script>
import HeaderBar from './components/HeaderAndFooter/HeaderBar.vue';
import FooterBar from './components/HeaderAndFooter/FooterBar.vue';

export default {
  name: 'App',

  components: {
    HeaderBar,
    FooterBar,
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
</style>
