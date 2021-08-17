<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    :search="search"
    sort-by="name"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Projects</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-icon left @click="$emit('refresh')">mdi-refresh</v-icon>
        <v-dialog v-model="dialog" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Project
            </v-btn>
          </template>
          <v-card>
            <v-form ref="form" lazy-validation @submit.prevent="save">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        filled
                        :rules="[(v) => !!v || 'Project name is required']"
                        label="Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.state"
                        filled
                        :rules="[(v) => !!v || 'Project state is required']"
                        :items="projectStates"
                        label="State"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.description"
                        filled
                        label="Description"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="close"> Cancel </v-btn>
                <v-btn color="primary" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="error" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <project-modal v-model="projectMembers" />
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editMembers(item)"> mdi-account-multiple </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #[`item.state`]="{ item }">
      <v-chip :color="stateColors[item.state]" dark class="capitalized">
        {{ item.state }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { addProject, deleteProject, updateProject } from '@/api/projects.api';
import ProjectModal from './ProjectModal.vue';

export default {
  components: {
    ProjectModal,
  },

  props: {
    projects: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    projectMembers: null,
    search: '',
    headers: [
      { text: 'Project', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'State', value: 'state', filterable: false },
      { text: 'Actions', value: 'actions', sortable: false, filterable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      state: 'active',
    },
    defaultItem: {
      name: '',
      description: '',
      state: 'active',
    },
    stateColors: {
      active: 'green',
      finished: 'blue',
      abandoned: 'red',
    },
    projectStates: [
      { text: 'Active', value: 'active' },
      { text: 'Finished', value: 'finished' },
      { text: 'Abandoned', value: 'abandoned' },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Project' : 'Edit Project';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.$loading.show();
        await deleteProject(this.projects[this.editedIndex].id);
        this.$notify({
          type: 'success',
          title: 'Project deleted',
          text: `Project ${this.projects[this.editedIndex].name} successfully deleted`,
        });
      } catch (error) {
        if (error.response.status === 403) {
          this.$notify({
            type: 'error',
            title: 'Cannot delete project',
            text: 'It is not possible to delete projects that have linked requests',
          });
        }
      } finally {
        this.$loading.hide();
      }

      this.closeDelete();
      this.$emit('refresh');
    },

    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      // Don't save if validation is unsuccessful
      if (!this.$refs.form.validate()) return;

      try {
        if (this.editedIndex > -1) {
          await updateProject(this.projects[this.editedIndex].id, this.editedItem);
          this.$notify({
            type: 'success',
            title: 'Project updated',
            text: `Project ${this.editedItem.name} successfully updated`,
          });
        } else {
          await addProject(this.editedItem);
          this.$notify({
            type: 'success',
            title: 'Project created',
            text: `Project ${this.editedItem.name} successfully created`,
          });
        }
      } finally {
        this.close();
        this.$emit('refresh');
      }
    },

    editMembers(item) {
      this.projectMembers = item.id;
    },
  },
};
</script>
