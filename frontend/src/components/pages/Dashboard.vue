<template>
  <v-container v-if="requisitions" class="mt-6">
    <requisitions :requisitions="requisitions" />
  </v-container>
</template>

<script>
import Requisitions from '@/components/dashboard/RequisitionsTable';
import { getSelfRequisitions } from '@/api/requisitions.api';

export default {
  name: 'DashboardPage',
  components: {
    Requisitions,
  },
  data() {
    return {
      requisitions: null,
    };
  },
  async mounted() {
    this.$loading.show();
    const requisitions = await getSelfRequisitions();
    this.$loading.hide();

    this.requisitions = requisitions;
  },
};
</script>
