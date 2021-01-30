<template>
  <v-dialog v-model="openDialog" max-width="800px" scrollable>
    <v-card>
      <v-card-title>Requisition History for {{ material && material.name }}</v-card-title>
      <v-card-text style="max-height: 600px">
        <div v-if="!material || !material.requisitions" class="d-flex justify-center">
          <v-progress-circular color="primary" indeterminate />
        </div>
        <v-timeline v-else-if="material.requisitions && material.requisitions.length > 0" dense>
          <v-timeline-item
            v-for="item in material.requisitions"
            :key="item.id"
            :color="requisitionStates[item.state].color"
            fill-dot
          >
            <template #icon>
              <span>{{ item.quantity }}</span>
            </template>
            <v-row justify="space-between">
              <v-col cols="8">
                {{ item.quantity }} {{ item.quantity === 1 ? 'item was' : 'items were' }} requested
                by {{ item.member.name }} ({{ item.member.istId }})
                <span v-if="item.project">for project {{ item.project.name }}</span>
                <br />
                <v-chip small :color="requisitionStates[item.state].color">
                  {{ requisitionStates[item.state].name }}
                </v-chip>
              </v-col>
              <v-col class="text-right" cols="4">
                {{ new Date(item.createdAt).toLocaleString('pt-PT') }}
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
        <p v-else>There are no requisitions for this material</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { requisitionStates } from '@/constants/constants';
import { mapActions, mapGetters } from 'vuex';
export default {
  model: {
    prop: 'materialId',
    event: 'change',
  },
  props: {
    materialId: { type: Number, default: null },
  },
  data: function () {
    return {
      requisitionStates,
    };
  },
  computed: {
    ...mapGetters('materials', ['getMaterial']),
    openDialog: {
      get: function () {
        return this.materialId !== null;
      },
      set: function (newValue) {
        this.$emit('change', newValue ? newValue : null);
      },
    },
    material: function () {
      if (!this.materialId) return null;
      const material = this.getMaterial(this.materialId);
      // Fetch full material data if data is not in Vuex store
      if (!material.requisitions) this.fetchMaterial(this.materialId);

      return material;
    },
  },
  methods: {
    ...mapActions('materials', ['fetchMaterial']),
  },
};
</script>

<style></style>
