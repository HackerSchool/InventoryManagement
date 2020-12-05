<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate color="#6dba83" />
    <v-container>
      <!-- TODO Add refresh button that triggers the refresh function -->
      <LocationTable v-if="!loading" />
    </v-container>
  </div>
</template>

<script>
import LocationTable from '@/components/locations/LocationTable';
import { mapActions, mapState } from 'vuex';

export default {
  components: { LocationTable },

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
