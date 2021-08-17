<template>
  <v-container v-if="locations" class="mt-6">
    <!-- TODO Add refresh button that triggers the refresh function -->
    <LocationTable :locations="locations" @refresh="loadData" />
  </v-container>
</template>

<script>
import LocationTable from '@/components/locations/LocationTable';
import { getAllLocations } from '@/api/locations.api';

export default {
  components: { LocationTable },

  data() {
    return {
      locations: null,
    };
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.$loading.show();
      this.locations = await getAllLocations();
      this.$loading.hide();
    },
  },
};
</script>
