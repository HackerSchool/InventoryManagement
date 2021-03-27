<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container class="mt-6">
      <v-row>
        <v-col sm="12" offset-md="6" md="6" offset-lg="9" lg="3">
          <v-select
            v-model="project"
            :items="getProjectsSelect"
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
            <RequestItem v-for="item in pendingRequisitions" :key="item.id" :item="item" />
          </v-expansion-panels>
          <p v-if="pendingRequisitions.length === 0"><no-requisitions /></p>
        </v-tab-item>

        <v-tab-item>
          <v-expansion-panels accordion>
            <RequestItem v-for="item in activeRequisitions" :key="item.id" :item="item" />
          </v-expansion-panels>
          <p v-if="activeRequisitions.length === 0"><no-requisitions /></p>
        </v-tab-item>

        <v-tab-item>
          <v-expansion-panels accordion>
            <RequestItem v-for="item in archivedRequisitions" :key="item.id" :item="item" />
          </v-expansion-panels>
          <p v-if="archivedRequisitions.length === 0"><no-requisitions /></p>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
import RequestItem from '@/components/request/AdminRequestItem';
import { mapState, mapActions, mapGetters } from 'vuex';
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
      project: null,
    };
  },
  computed: {
    ...mapGetters('projects', ['getProjectsSelect']),
    ...mapState('requisitions', ['requisitions']),
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
    if (this.requisitions.length == 0) {
      //needs a better solution for this, otherwise i think it'll bug for someone without requisitions
      this.loading = true;
      await Promise.all([this.fetchAllRequisitions(), this.fetchProjects()]);
      this.loading = false;
    }
  },
  methods: {
    ...mapActions('requisitions', ['fetchAllRequisitions']),
    ...mapActions('projects', ['fetchProjects']),
  },
};
</script>

<style></style>
