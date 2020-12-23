<template>
  <v-footer absolute padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        &copy; {{ new Date().getFullYear() }} — Created with
        <v-icon color="primary">mdi-heart</v-icon> by <strong>Hackerschool</strong> - v{{ version }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },
};
</script>
