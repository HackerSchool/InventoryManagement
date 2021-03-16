<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container class="mt-6">
      <ProjectTable v-if="!loading" />
    </v-container>
  </div>
</template>

<script>
import ProjectTable from '@/components/projects/ProjectsTable';
import { mapActions, mapState } from 'vuex';

export default {
  components: { ProjectTable },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState('projects', ['projects']),
    ...mapState('members', ['members']),
  },

  async mounted() {
    if (this.projects.length == 0) {
      this.loading = true;
      await Promise.all([this.fetchProjects(), this.fetchMembers()]);
      this.loading = false;
    }
  },

  methods: {
    ...mapActions('projects', ['fetchProjects']),
    ...mapActions('members', ['fetchMembers']),
  },
};
</script>

<style></style>
