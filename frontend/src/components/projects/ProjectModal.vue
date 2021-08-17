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
import { addMember, deleteMember, getProject } from '@/api/projects.api';
import { getAllMembers } from '@/api/members.api';

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
      project: null,
      members: [],
    };
  },
  computed: {
    openDialog: {
      get: function () {
        return this.projectId !== null;
      },
      set: function (newValue) {
        this.$emit('change', newValue ? newValue : null);
      },
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
    projectId: 'fetchProject',
  },
  async mounted() {
    this.members = await getAllMembers();
  },
  methods: {
    async fetchProject() {
      if (this.projectId === null) {
        this.project = null;
        return;
      }

      this.$loading.show();
      this.project = await getProject(this.projectId);
      this.$loading.hide();

      this.sel(this.project);
    },

    sel(data) {
      this.selected = data.members;
    },

    async removeProjectMember(memberId, i) {
      await deleteMember(this.project.id, memberId);
      this.selected.splice(i, 1);
    },

    async addProjectMember(memberId, item) {
      await addMember(this.project.id, memberId);
      this.selected.push(item);
    },
  },
};
</script>

<style></style>
