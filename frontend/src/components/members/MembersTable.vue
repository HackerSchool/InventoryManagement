<template>
  <v-data-table :headers="headers" :items="members" sort-by="name" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Members</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
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
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Member', value: 'name' },
      { text: 'IST Id', value: 'istId' },
      { text: 'Role', value: 'role' },
      { text: 'State', value: 'active' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
      istId: '',
      role: '',
      active: '',
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
    ...mapState('members', ['members']),
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

    deleteItemConfirm() {
      this.deleteMember(this.members[this.editedIndex].id);
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
        this.updateMember({
          id: this.members[this.editedIndex].id,
          data: this.editedItem,
        });
      } else {
        this.createMember(this.editedItem);
      }
      this.close();
    },

    ...mapActions('members', ['updateMember', 'createMember', 'deleteMember']),
  },
};
</script>
