<template>
  <v-data-table
    :headers="headers"
    :items="members"
    :search="search"
    sort-by="name"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Members</v-toolbar-title>
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
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on"> New Member </v-btn>
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
                        :rules="[(v) => !!v || 'Member name is required']"
                        label="Name"
                        required
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.istId"
                        :rules="[(v) => !!v || 'Ist Id is required']"
                        label="Id"
                        required
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="editedItem.role"
                        label="Role"
                        :items="roles"
                        filled
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="editedItem.active"
                        label="State"
                        :items="states"
                        filled
                      ></v-select>
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
        <members-csv-import v-model="csvImport" @refresh="$emit('refresh')" />
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
    <template #[`item.role`]="{ item }">
      <v-chip :color="roleColors[item.role]" dark class="capitalized">
        {{ item.role }}
      </v-chip>
    </template>
    <template #[`item.active`]="{ item }">
      <v-chip :color="stateColors[item.active]" dark class="capitalized">
        {{ (states.find((v) => v.value == item.active) || {}).text }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { addMember, deleteMember, updateMember } from '@/api/members.api';
import MembersCsvImport from './MembersCsvImport.vue';

export default {
  components: {
    MembersCsvImport,
  },

  props: {
    members: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    csvImport: false,
    search: '',
    headers: [
      { text: 'Member', value: 'name' },
      { text: 'IST Id', value: 'istId' },
      { text: 'Role', value: 'role', filterable: false },
      { text: 'State', value: 'active', filterable: false },
      { text: 'Actions', value: 'actions', sortable: false, filterable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      istId: '',
      role: 'user',
      active: true,
    },
    defaultItem: {
      name: '',
      istId: '',
      role: 'user',
      active: true,
    },
    roleColors: {
      admin: 'blue',
      user: 'yellow darken-4',
    },
    stateColors: {
      true: 'green',
      false: 'grey',
    },
    roles: [
      { text: 'Admin', value: 'admin' },
      { text: 'User', value: 'user' },
    ],
    states: [
      { text: 'Active', value: true },
      { text: 'Inactive', value: false },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Member' : 'Edit Member';
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
      this.editedIndex = this.members.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.members.indexOf(item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.$loading.show();
        await deleteMember(this.members[this.editedIndex].id);
        this.$notify({
          type: 'success',
          title: 'Member deleted',
          text: `Member ${this.members[this.editedIndex].name} successfully deleted`,
        });
      } catch (error) {
        if (error.response.status === 403) {
          this.$notify({
            type: 'error',
            title: 'Cannot delete member',
            text: 'It is not possible to delete members that have linked requests',
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
          await updateMember(this.members[this.editedIndex].id, this.editedItem);
          this.$notify({
            type: 'success',
            title: 'Member updated',
            text: `Member ${this.editedItem.name} successfully updated`,
          });
        } else {
          await addMember(this.editedItem);
          this.$notify({
            type: 'success',
            title: 'Member created',
            text: `Member ${this.editedItem.name} successfully created`,
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
