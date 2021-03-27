<template>
  <v-row justify="center">
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
              <v-col cols="12" sm="12" md="6">
                <v-select
                  v-model="project"
                  :items="getProjectsSelect"
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
import { mapActions, mapGetters } from 'vuex';
export default {
  model: {
    prop: 'materialId',
    event: 'change',
  },
  props: {
    materialId: { type: Number, default: null },
  },
  data() {
    return {
      step: 1,
      quantity: 1,
      project: null,
      loading: false,
      rules: {
        required: (v) => !!v || 'Required.',
        inStock: (v) => (v >= 1 && v <= this.material.stock) || 'Quantity not available.',
      },
    };
  },
  computed: {
    ...mapGetters('projects', ['getProjectsSelect']),
    ...mapGetters('materials', ['getMaterial']),
    openDialog: {
      get: function () {
        return this.materialId !== null;
      },
      set: function (newValue) {
        this.$emit('change', newValue ? newValue : null);
        if (!newValue) {
          this.quantity = 1;
          this.project = null;
        }
      },
    },
    material: function () {
      if (!this.materialId) return {};
      const material = this.getMaterial(this.materialId);
      return material;
    },
  },
  async mounted() {
    if (this.getProjectsSelect.length == 0) {
      await this.fetchProjects();
    }
  },
  methods: {
    ...mapActions('projects', ['fetchProjects']),
    ...mapActions('requisitions', ['createRequisition']),
    ...mapActions('materials', ['decreaseStock']),
    async request() {
      this.loading = true;
      await this.createRequisition({
        materialId: this.material.id,
        projectId: this.project,
        quantity: this.quantity,
      });
      this.loading = false;
      this.$notify({
        type: 'success',
        title: 'Item requested!',
        text: `You've requested ${this.quantity} of ${this.material.name}`,
      });
      this.decreaseStock({ id: this.material.id, decreaseBy: this.quantity });
      this.openDialog = false;
    },
  },
};
</script>

<style></style>
