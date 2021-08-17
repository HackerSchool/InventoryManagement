<template>
  <v-row v-if="material" justify="center">
    <v-dialog v-model="openDialog" persistent max-width="750">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="quantity"
                  label="Quantity"
                  min="1"
                  :max="material.stock"
                  type="number"
                  :rules="[rules.required, rules.inStock]"
                  :hint="`In Stock: ${material.stock}`"
                  required
                ></v-text-field>
              </v-col>
              <v-col v-if="projects" cols="12" sm="12" md="6">
                <v-select
                  v-model="project"
                  :items="projectsSelect"
                  clearable
                  label="Project"
                  hint="You can leave this empty"
                  persistent-hint
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-2" text @click="openDialog = false"> Cancel </v-btn>
          <v-btn
            color="primary"
            text
            :disabled="quantity < 1 || quantity > material.stock"
            :loading="loading"
            @click="request"
          >
            Request
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { createRequisition } from '@/api/requisitions.api';
import { getAllProjects } from '@/api/projects.api';

export default {
  props: {
    material: {
      type: Object,
      default: () => null,
      required: false,
    },
  },
  data() {
    return {
      step: 1,
      quantity: 1,
      project: null,
      loading: false,
      projects: null,
      rules: {
        required: (v) => !!v || 'Required.',
        inStock: (v) => (v >= 1 && v <= this.material.stock) || 'Quantity not available.',
      },
    };
  },
  computed: {
    projectsSelect() {
      return this.projects.map((project) => ({ text: project.name, value: project.id }));
    },
    openDialog: {
      get: function () {
        return this.material !== null;
      },
      set: function (newValue) {
        if (!newValue) {
          this.$emit('close');
          this.quantity = 1;
          this.project = null;
        }
      },
    },
  },
  async mounted() {
    this.projects = await getAllProjects();
  },
  methods: {
    async request() {
      this.$loading.show();
      await createRequisition({
        materialId: this.material.id,
        projectId: this.project,
        quantity: this.quantity,
      });
      this.$loading.hide();

      this.$notify({
        type: 'success',
        title: 'Item requested!',
        text: `You've requested ${this.quantity} of ${this.material.name}`,
      });

      this.openDialog = false;
      this.$emit('requested');
    },
  },
};
</script>

<style></style>
