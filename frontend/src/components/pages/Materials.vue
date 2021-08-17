<template>
  <v-container v-if="materials" class="mt-6">
    <!-- TODO Add refresh button that triggers the refresh function -->
    <MaterialTable :materials="materials" @refresh="loadData" />
  </v-container>
</template>

<script>
import MaterialTable from '@/components/materials/MaterialsTable';
import { getAllMaterials } from '@/api/materials.api';

export default {
  components: {
    MaterialTable,
  },

  data() {
    return {
      materials: null,
    };
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.$loading.show();
      this.materials = await getAllMaterials();
      this.$loading.hide();
    },
  },
};
</script>
