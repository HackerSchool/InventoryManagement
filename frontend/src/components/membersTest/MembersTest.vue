<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <ul v-else>
      <p>Loaded</p>
      <li v-for="member in members" :key="member.id">{{ member.name }} - {{ member.ist_id }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'MembersTest',

  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState('members', ['members']),
  },
  async mounted() {
    // Make network request if the data is empty
    if (this.members.length === 0) {
      // set loading screen
      this.isLoading = true;
      await this.fetchMembers();
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions('members', ['fetchMembers']),
  },
};
</script>
