<template>
  <v-data-table
    :headers="headers"
    :items="materials"
    :search="search"
    sort-by="name"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Materials</v-toolbar-title>
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
              New Material
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
                        :rules="[(v) => !!v || 'Material name is required']"
                        label="Name"
                        required
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.description"
                        label="Description"
                        filled
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="editedItem.state"
                        label="State"
                        :items="states"
                        filled
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="editedItem.type"
                        label="Type"
                        :items="types"
                        filled
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.stock" label="Stock" filled></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.value" label="Value" filled></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.location"
                        label="Location"
                        :items="locations"
                        item-text="name"
                        return-object
                        :rules="[(v) => !!v || 'Material location is required']"
                        required
                        filled
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="editedItem.imageUpload"
                        dense
                        prepend-icon="mdi-camera"
                        accept="image/*"
                        label="Image"
                        filled
                      ></v-file-input>
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
        <material-info :material-id="openDetailsId" @close="openDetailsId = null" />
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="seeHistory(item)"> mdi-information </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #[`item.state`]="{ item }">
      <v-chip :color="stateColors[item.state]" dark class="capitalized">
        {{ item.state }}
      </v-chip>
    </template>
    <template #[`item.type`]="{ item }">
      <v-chip :color="typeColors[item.type]" dark class="capitalized">
        {{ item.type }}
      </v-chip>
    </template>
    <template #[`item.image.src`]="{ item }">
      <img v-if="item.image" :src="getImageSrc(item.image)" class="image py-1" />
      <v-icon v-else>mdi-image-off</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import MaterialInfo from './MaterialInfo.vue';
import { getImageSrc } from '@/utils/image';
import { addMaterial, deleteMaterial, updateMaterial, uploadImage } from '@/api/materials.api';
import { getAllLocations } from '@/api/locations.api';

export default {
  components: {
    MaterialInfo,
  },

  props: {
    materials: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    locations: [],
    dialog: false,
    dialogDelete: false,
    openDetailsId: null,
    search: '',
    headers: [
      { text: 'Image', value: 'image.src', filterable: false, sortable: false },
      { text: 'Material', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Stock', value: 'stock', filterable: false },
      { text: 'State', value: 'state', filterable: false },
      { text: 'Type', value: 'type', filterable: false },
      { text: 'Location', value: 'location.name', filterable: false, sortable: false },
      { text: 'Value (€)', value: 'value', filterable: false },
      { text: 'Actions', value: 'actions', filterable: false, sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      stock: 0,
      state: 'good',
      type: 'item',
      location: '',
      value: 0,
    },
    defaultItem: {
      name: '',
      description: '',
      stock: 0,
      state: 'good',
      type: 'item',
      location: '',
      value: 0,
    },
    stateColors: {
      good: 'green',
      damaged: 'orange',
      retired: 'red',
    },
    typeColors: {
      item: 'teal',
      tool: 'indigo',
      other: 'grey',
    },
    types: [
      { text: 'Item', value: 'item' },
      { text: 'Tool', value: 'tool' },
      { text: 'Other', value: 'other' },
    ],
    states: [
      { text: 'Good', value: 'good' },
      { text: 'Damaged', value: 'damaged' },
      { text: 'Retired', value: 'retired' },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Material' : 'Edit Material';
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

  async mounted() {
    this.locations = await getAllLocations();
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

    async deleteItemConfirm() {
      try {
        this.$loading.show();
        await deleteMaterial(this.materials[this.editedIndex].id);
        this.$notify({
          type: 'success',
          title: 'Material deleted',
          text: `Material ${this.materials[this.editedIndex].name} successfully deleted`,
        });
      } catch (error) {
        if (error.response.status === 403) {
          this.$notify({
            type: 'error',
            title: 'Cannot delete material',
            text: 'It is not possible to delete materials that have linked requests',
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
        const image = this.editedItem.imageUpload;
        let updatedMaterial;
        if (this.editedIndex > -1) {
          updatedMaterial = await updateMaterial(
            this.materials[this.editedIndex].id,
            this.editedItem
          );
          this.$notify({
            type: 'success',
            title: 'Material updated',
            text: `Material ${this.editedItem.name} successfully updated`,
          });
        } else {
          updatedMaterial = await addMaterial(this.editedItem);
          this.$notify({
            type: 'success',
            title: 'Material created',
            text: `Material ${this.editedItem.name} successfully created`,
          });
        }
        await this.saveImage(updatedMaterial.id, image);
      } finally {
        this.$emit('refresh');
        this.close();
      }
    },

    async saveImage(id, image) {
      if (image) {
        const formData = new FormData();
        formData.append('img', image);
        await uploadImage(id, formData);
      }
    },

    seeHistory(item) {
      this.openDetailsId = item.id;
    },

    getImageSrc,
  },
};
</script>

<style>
.capitalized {
  text-transform: capitalize;
}
.image {
  max-height: 64px;
  max-width: 128px;
  vertical-align: middle;
  text-align: center;
}
</style>
