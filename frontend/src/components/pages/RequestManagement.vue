<template>
  <v-container v-if="requisitions" class="mt-6">
    <v-row>
      <v-col sm="12" offset-md="6" md="6" offset-lg="9" lg="3">
        <v-select
          v-model="project"
          :items="projectsSelect"
          label="Project"
          placeholder="Filter by Project..."
          :menu-props="{ offsetY: true }"
          clearable
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-tabs>
      <v-tab>
        <span class="mr-3">{{ pendingRequisitions.length }}</span>
        Pending Requests
      </v-tab>
      <v-tab>
        <span class="mr-3">{{ activeRequisitions.length }}</span>
        Active Requests
      </v-tab>
      <v-tab> Archived Requests </v-tab>

      <v-tab-item>
        <v-expansion-panels accordion>
          <RequestItem
            v-for="item in pendingRequisitions"
            :key="item.id"
            :item="item"
            @updateItem="updateItem"
          />
        </v-expansion-panels>
        <p v-if="pendingRequisitions.length === 0"><no-requisitions /></p>
      </v-tab-item>

      <v-tab-item>
        <v-expansion-panels accordion>
          <RequestItem
            v-for="item in activeRequisitions"
            :key="item.id"
            :item="item"
            @updateItem="updateItem"
          />
        </v-expansion-panels>
        <p v-if="activeRequisitions.length === 0"><no-requisitions /></p>
      </v-tab-item>

      <v-tab-item>
        <v-expansion-panels accordion>
          <RequestItem
            v-for="item in archivedRequisitions"
            :key="item.id"
            :item="item"
            @updateItem="updateItem"
          />
        </v-expansion-panels>
        <p v-if="archivedRequisitions.length === 0"><no-requisitions /></p>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import RequestItem from '@/components/request/AdminRequestItem';
import NoRequisitions from '../request/NoRequisitions.vue';
import { getAllRequisitions } from '@/api/requisitions.api';
import { getAllProjects } from '@/api/projects.api';

export default {
  name: 'RequestManagementPage',
  components: {
    RequestItem,
    NoRequisitions,
  },
  data() {
    return {
      project: null,
      projects: [],
      requisitions: null,
    };
  },
  computed: {
    projectsSelect() {
      return this.projects.map((project) => ({ text: project.name, value: project.id }));
    },
    pendingRequisitions() {
      return this.requisitions.filter(
        (req) =>
          req.state === 'pending' &&
          (!this.project || this.project === (req.project && req.project.id))
      );
    },
    activeRequisitions() {
      return this.requisitions.filter(
        (req) =>
          ['active', 'can_pickup'].indexOf(req.state) !== -1 &&
          (!this.project || this.project === (req.project && req.project.id))
      );
    },
    archivedRequisitions() {
      return this.requisitions.filter(
        (req) =>
          ['cancelled', 'returned', 'not_returning'].indexOf(req.state) !== -1 &&
          (!this.project || this.project === (req.project && req.project.id))
      );
    },
  },
  async mounted() {
    this.$loading.show();
    const [requisitions, projects] = await Promise.all([getAllRequisitions(), getAllProjects()]);
    this.requisitions = requisitions;
    this.projects = projects;
    this.$loading.hide();
  },
  methods: {
    async updateItem(data) {
      const index = this.requisitions.findIndex((requisition) => requisition.id == data.id);

      if (index >= 0) {
        this.requisitions.splice(index, 1, data);
      }
    },
  },
};
</script>

<style></style>
