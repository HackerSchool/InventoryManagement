<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container class="mt-6">
      <!-- TODO Add refresh button that triggers the refresh function -->
      <MembersTable v-if="!loading" />
    </v-container>
  </div>
</template>

<script>
import MembersTable from '@/components/members/MembersTable';
import { mapActions, mapState } from 'vuex';

export default {
  components: { MembersTable },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState('members', ['members']),
  },

  async mounted() {
    if (this.members.length == 0) {
      this.loading = true;
      await Promise.all([this.fetchMembers()]);
      this.loading = false;
    }
  },

  methods: {
    ...mapActions('members', ['fetchMembers']),
  },
};
</script>
