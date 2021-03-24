<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container class="mt-6">
      <h1>Pending Requests</h1>
      <RequestItem v-for="item in pendingRequisitions" :key="item.id" :item="item" />
      <p v-if="pendingRequisitions.length === 0"><no-requisitions /></p>
      <h1>Active Requests</h1>
      <RequestItem v-for="item in activeRequisitions" :key="item.id" :item="item" />
      <p v-if="activeRequisitions.length === 0"><no-requisitions /></p>
      <h1>Archived Requests</h1>
      <RequestItem v-for="item in archivedRequisitions" :key="item.id" :item="item" />
      <p v-if="archivedRequisitions.length === 0"><no-requisitions /></p>
    </v-container>
  </div>
</template>

<script>
import RequestItem from '@/components/request/AdminRequestItem';
import { mapState, mapActions } from 'vuex';
import NoRequisitions from '../request/NoRequisitions.vue';
export default {
  name: 'RequestManagementPage',
  components: {
    RequestItem,
    NoRequisitions,
  },

  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState('requisitions', ['requisitions']),
    pendingRequisitions() {
      return this.requisitions.filter((req) => req.state === 'pending');
    },
    activeRequisitions() {
      return this.requisitions.filter((req) => ['active', 'can_pickup'].indexOf(req.state) !== -1);
    },
    archivedRequisitions() {
      return this.requisitions.filter(
        (req) => ['cancelled', 'returned', 'not_returning'].indexOf(req.state) !== -1
      );
    },
  },
  async mounted() {
    if (this.requisitions.length == 0) {
      //needs a better solution for this, otherwise i think it'll bug for someone without requisitions
      this.loading = true;
      await this.fetchAllRequisitions();
      this.loading = false;
    }
  },
  methods: {
    ...mapActions('requisitions', ['fetchAllRequisitions']),
  },
};
</script>

<style></style>
