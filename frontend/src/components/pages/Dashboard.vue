<template>
  <v-container class="mt-6">
    <requisitions :requisitions="requisitions" />
  </v-container>
</template>

<script>
import Requisitions from '@/components/dashboard/RequisitionsTable';

export default {
  name: 'DashboardPage',
  components: {
    Requisitions,
  },
  props: {
    requisitions: {
      type: Array,
      required: true,
    },
  },
};
</script>
