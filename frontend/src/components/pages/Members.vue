<template>
  <v-container v-if="members" class="mt-6">
    <!-- TODO Add refresh button that triggers the refresh function -->
    <MembersTable :members="members" @refresh="loadData" />
  </v-container>
</template>

<script>
import MembersTable from '@/components/members/MembersTable';
import { getAllMembers } from '@/api/members.api';

export default {
  name: 'MembersPage',

  components: {
    MembersTable,
  },

  data() {
    return {
      members: null,
    };
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.$loading.show();
      this.members = await getAllMembers();
      this.$loading.hide();
    },
  },
};
</script>
