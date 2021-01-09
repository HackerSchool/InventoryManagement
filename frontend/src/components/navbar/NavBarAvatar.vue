<template>
  <div class="d-flex mb-2">
    <v-avatar color="primary">
      <img v-if="getAvatarUrl" :src="getAvatarUrl" :alt="getName" />
      <v-icon v-else> mdi-account-circle </v-icon>
    </v-avatar>
    <p class="ml-3">
      <span class="grey--text text--lighten-1">Welcome,</span><br />
      {{ getName }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('user', ['getAvatarUrl', 'getName']),
  },
};
</script>

<style></style>
