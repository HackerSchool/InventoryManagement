<template>
  <v-container v-if="projects" class="mt-6">
    <ProjectTable :projects="projects" @refresh="loadData" />
  </v-container>
</template>

<script>
import ProjectTable from '@/components/projects/ProjectsTable';
import { getAllProjects } from '@/api/projects.api';

export default {
  name: 'ProjectsPage',

  components: {
    ProjectTable,
  },

  data() {
    return {
      projects: null,
    };
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.$loading.show();
      this.projects = await getAllProjects();
      this.$loading.hide();
    },
  },
};
</script>

<style></style>
