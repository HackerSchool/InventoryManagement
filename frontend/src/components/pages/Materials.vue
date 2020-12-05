<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container class="mt-6">
      <!-- TODO Add refresh button that triggers the refresh function -->
      <MaterialTable v-if="!loading" />
    </v-container>
  </div>
</template>

<script>
import MaterialTable from '@/components/materials/materialstable';
import { mapActions, mapState } from 'vuex';

export default {
  components: { MaterialTable },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState('locations', ['locations']),
  },

  async mounted() {
    if (this.locations.length == 0) {
      this.loading = true;
      await this.fetchLocations();
      this.loading = false;
    }
  },

  methods: {
    ...mapActions('locations', ['fetchLocations']),
  },
};
</script>
