<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container class="mt-6">
      <Requisitions v-if="!loading"></Requisitions>
    </v-container>
  </div>
</template>

<script>
import Requisitions from '@/components/dashboard/RequisitionsTable';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'DashboardPage',
  components: {
    Requisitions,
  },

  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState('requisitions', ['requisitions']),
  },
  async mounted() {
    if (this.requisitions.length == 0) {
      //needs a better solution for this, otherwise i think it'll bug for someone without requisitions
      this.loading = true;
      await this.fetchSelfRequisitions();
      this.loading = false;
    }
  },
  methods: {
    ...mapActions('requisitions', ['fetchSelfRequisitions']),
  },
};
</script>
