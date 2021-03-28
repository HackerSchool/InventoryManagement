<template>
  <v-dialog v-model="openDialog" max-width="500px" scrollable>
    <v-card>
      <v-card-title>Project Members for {{ project && project.name }}</v-card-title>
      <v-card-text style="max-height: 600px">
        <div v-if="project && project.members">
          <v-container class="py-0">
            <v-row align="center" justify="start">
              <v-col v-for="(selection, i) in selections" :key="selection.id" class="shrink">
                <v-chip close @click:close="removeProjectMember(selection.id, i)">
                  {{ selection.name }}
                </v-chip>
              </v-col>

              <v-col v-if="!allSelected" cols="12">
                <v-text-field
                  ref="search"
                  v-model="search"
                  full-width
                  hide-details
                  label="Search"
                  single-line
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-list>
            <template v-for="item in list">
              <v-list-item
                v-if="!selected.some((e) => e.id == item.id)"
                :key="item.name"
                @click="addProjectMember(item.id, item)"
              >
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </div>
        <div v-else class="d-flex justify-center">
          <v-progress-circular color="primary" indeterminate />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
  model: {
    prop: 'projectId',
    event: 'change',
  },
  props: {
    projectId: { type: Number, default: null },
  },
  data: function () {
    return {
      search: '',
      selected: [],
    };
  },
  computed: {
    ...mapState('members', ['members']),
    ...mapGetters('projects', ['getProjectMembers']),
    openDialog: {
      get: function () {
        return this.projectId !== null;
      },
      set: function (newValue) {
        this.$emit('change', newValue ? newValue : null);
      },
    },
    project() {
      if (!this.projectId) return null;
      const project = this.getProjectMembers(this.projectId);
      // Fetch full project data if data is not in Vuex store
      if (!project.members) this.fetchProject(this.projectId);
      this.sel(project);
      return project;
    },
    allSelected() {
      return this.selected.length === this.members.length;
    },
    list() {
      const search = this.search.toLowerCase();

      if (!search) return this.members;

      return this.members.filter((item) => {
        const text = item.name.toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(selection);
      }

      return selections;
    },
  },
  watch: {
    selected() {
      this.search = '';
    },
  },
  methods: {
    ...mapActions('projects', ['fetchProject', 'addMember', 'deleteMember']),
    sel(data) {
      this.selected = data.members;
    },
    removeProjectMember(memberId, i) {
      this.deleteMember({
        id: this.project.id,
        memberId,
      });
      this.selected.splice(i, 1);
    },
    addProjectMember(memberId, item) {
      this.selected.push(item);
      this.addMember({
        id: this.project.id,
        memberId,
      });
    },
  },
};
</script>

<style></style>
