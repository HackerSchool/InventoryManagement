<template>
  <v-data-table
    :headers="headers"
    :items="locations"
    :search="search"
    sort-by="name"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Locations</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Location
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
                        :rules="[(v) => !!v || 'Location name is required']"
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
import { addLocation, deleteLocation, updateLocation } from '@/api/locations.api';

export default {
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'Location', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Actions', value: 'actions', filterable: false, sortable: false },
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
      return this.editedIndex === -1 ? 'New Location' : 'Edit Location';
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
      this.editedIndex = this.locations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.locations.indexOf(item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.$loading.show();
        await deleteLocation(this.locations[this.editedIndex].id);
        this.$notify({
          type: 'success',
          title: 'Location deleted',
          text: `Location ${this.locations[this.editedIndex].name} successfully deleted`,
        });
      } catch (error) {
        if (error.response.status === 403) {
          this.$notify({
            type: 'error',
            title: 'Cannot delete location',
            text: 'It is not possible to delete locations that have linked items',
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
          await updateLocation(this.locations[this.editedIndex].id, this.editedItem);
          this.$notify({
            type: 'success',
            title: 'Location updated',
            text: `Location ${this.editedItem.name} successfully updated`,
          });
        } else {
          await addLocation(this.editedItem);
          this.$notify({
            type: 'success',
            title: 'Location created',
            text: `Location ${this.editedItem.name} successfully created`,
          });
        }
      } finally {
        this.close();
        this.$emit('refresh');
      }
    },
  },
};
</script>
