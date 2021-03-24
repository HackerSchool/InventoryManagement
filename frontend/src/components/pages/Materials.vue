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
import MaterialTable from '@/components/materials/MaterialsTable';
import { mapActions, mapState } from 'vuex';

export default {
  components: { MaterialTable },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState('materials', ['materials']),
  },

  async mounted() {
    this.loading = true;
    await Promise.all([this.fetchLocations(), this.fetchMaterials()]);
    this.loading = false;
  },

  methods: {
    ...mapActions('locations', ['fetchLocations']),
    ...mapActions('materials', ['fetchMaterials']),
  },
};
</script>
