<template>
  <v-data-table :headers="headers" :items="locations" sort-by="name" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Locations</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on"> New Item </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Location"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-textarea
                      v-model="editedItem.description"
                      label="description"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Location', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    locations: [],
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
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.locations = [
        {
          name: 'Frozen Yogurt',
          description: 159,
        },
        {
          name: 'Ice cream sandwich',
          description: 237,
        },
        {
          name: 'Eclair',
          description: 262,
        },
        {
          name: 'Cupcake',
          description: 305,
        },
        {
          name: 'Gingerbread',
          description: 356,
        },
        {
          name: 'Jelly bean',
          description: 375,
        },
        {
          name: 'Lollipop',
          description: 392,
        },
        {
          name: 'Honeycomb',
          description: 408,
        },
        {
          name: 'Donut',
          description: 452,
        },
        {
          name: 'KitKat',
          description: 518,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.locations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.locations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.locations.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
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
      if (this.editedIndex > -1) {
        Object.assign(this.locations[this.editedIndex], this.editedItem);
      } else {
        this.locations.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
