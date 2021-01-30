<template>
  <v-tabs v-model="activeTab">
    <v-tab v-for="tab in tabs" :key="tab.id">
      {{ tab.name }}
    </v-tab>

    <v-tab-item>
      <requisitions-tab-item
        :items="requisitions"
        empty-message="You don't have any requisitions."
      />
    </v-tab-item>

    <v-tab-item>
      <requisitions-tab-item
        :items="inProgress"
        empty-message="You don't have any requisitions in progress."
      />
    </v-tab-item>

    <v-tab-item>
      <requisitions-tab-item
        :items="active"
        empty-message="You don't have any active requisitions."
      />
    </v-tab-item>

    <v-tab-item>
      <requisitions-tab-item
        :items="archived"
        empty-message="You don't have any archived requisitions."
      />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import { mapState } from 'vuex';
import RequisitionsTabItem from './RequisitionsTabItem.vue';

export default {
  components: { RequisitionsTabItem },
  data: () => ({
    tabs: [
      { id: 1, name: 'All' },
      { id: 2, name: 'In progress' },
      { id: 3, name: 'Active' },
      { id: 4, name: 'Archived' },
    ],
    activeTab: 1,
  }),
  computed: {
    ...mapState('requisitions', ['requisitions']),
    inProgress() {
      return this.requisitions.filter((item) => {
        return item.state == 'can_pickup' || item.state == 'pending';
      });
    },
    active() {
      return this.requisitions.filter((item) => {
        return item.state == 'active';
      });
    },
    archived() {
      return this.requisitions.filter((item) => {
        return (
          item.state == 'cancelled' || item.state == 'returned' || item.state == 'not_returning'
        );
      });
    },
  },
};
</script>

<style></style>
