<template>
  <v-data-table :headers="headers" :items="materials" sort-by="name" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Materials</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on"> New Item </v-btn>
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
                        :rules="[(v) => !!v || 'Material name is required']"
                        label="Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.stock" label="Stock"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.state" label="State"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.value" label="Value"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.location"
                        label="Location"
                        :items="locations"
                        item-text="name"
                        item-value="id"
                        :rules="[(v) => !!v || 'Material location is required']"
                        required
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
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
      { text: 'Material', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Stock', value: 'stock' },
      { text: 'State', value: 'state', sortable: false },
      { text: 'Type', value: 'type', sortable: false },
      { text: 'Location', value: 'location.name', sortable: false },
      { text: 'Value', value: 'value' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      stock: '',
      state: '',
      type: '',
      location: '',
      value: '',
    },
    defaultItem: {
      name: '',
      description: '',
      stock: '',
      state: '',
      type: '',
      location: '',
      value: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Material' : 'Edit Material';
    },
    ...mapState('locations', ['locations']),
    ...mapState('materials', ['materials']),
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
      this.editedIndex = this.materials.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.materials.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteMaterial(this.materials[this.editedIndex].id);
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
        this.updateMaterial({
          id: this.materials[this.editedIndex].id,
          data: this.editedItem,
        });
      } else {
        this.createMaterial(this.editedItem);
      }
      this.close();
    },

    ...mapActions('materials', ['updateMaterial', 'createMaterial', 'deleteMaterial']),
  },
};
</script>
