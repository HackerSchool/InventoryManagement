<template>
  <v-data-table :headers="headers" :items="projects" sort-by="name" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Projects</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
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
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Project', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
    },
    defaultItem: {
      name: '',
      description: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Project' : 'Edit Project';
    },
    ...mapState('projects', ['projects']),
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

    deleteItemConfirm() {
      this.deleteProject(this.projects[this.editedIndex].id).catch((e) => {
        if (e.response.status === 403)
          this.$notify({
            type: 'error',
            title: 'Cannot delete projects',
            text: 'It is not possible to delete projects that have linked items',
          });
      });
      this.closeDelete();
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

    save() {
      // Don't save if validation is unsuccessful
      if (!this.$refs.form.validate()) return;

      if (this.editedIndex > -1) {
        this.updateProject({
          id: this.projects[this.editedIndex].id,
          data: this.editedItem,
        });
      } else {
        this.createProject(this.editedItem);
      }
      this.close();
    },

    ...mapActions('projects', ['updateProject', 'createProject', 'deleteProject']),
  },
};
</script>
