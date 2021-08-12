<template>
  <v-tabs v-model="activeTab">
    <v-tab v-for="tab in tabs" :key="tab.id">
      {{ tab.name }}
    </v-tab>

    <v-tab-item>
      <requisitions-tab-item :items="requisitions" empty-message="You don't have any requests." />
    </v-tab-item>

    <v-tab-item>
      <requisitions-tab-item
        :items="inProgress"
        empty-message="You don't have any requests in progress."
      />
    </v-tab-item>

    <v-tab-item>
      <requisitions-tab-item :items="active" empty-message="You don't have any active requests." />
    </v-tab-item>

    <v-tab-item>
      <requisitions-tab-item
        :items="archived"
        empty-message="You don't have any archived requests."
      />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import RequisitionsTabItem from './RequisitionsTabItem.vue';

export default {
  components: { RequisitionsTabItem },
  props: {
    requisitions: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    tabs: [
      { id: 1, name: 'All' },
      { id: 2, name: 'In progress' },
      { id: 3, name: 'Active' },
      { id: 4, name: 'Archived' },
    ],
    activeTab: null,
  }),
  computed: {
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
  mounted() {
    this.activeTab = this.inProgress.length > 0 ? 1 : 0; //if there are items inProgress it defaults to that tab, otherwise to All
  },
};
</script>

<style></style>
