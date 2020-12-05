<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container class="mt-6">
      <v-row justify="center">The main dashboard will be here.</v-row>
      <v-skeleton-loader class="mx-auto" width="300" type="card"></v-skeleton-loader>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',

  data() {
    return {
      loading: false,
    };
  },
};
</script>
