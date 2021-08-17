<template>
  <v-container v-if="materials" class="mb-4">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          v-model="search"
          label="Search"
          append-icon="mdi-magnify"
          filled
          @keyup.enter="fetchSearch"
          @click:append="fetchSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="state"
          :items="materialStates"
          label="State"
          multiple
          filled
          clearable
          @change="fetchSearch"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="type"
          :items="materialTypes"
          label="Type"
          multiple
          filled
          clearable
          @change="fetchSearch"
        ></v-select>
      </v-col>
    </v-row>
    <div>
      <v-row v-for="material in materials" :key="material.id">
        <request-material :material="material" @request="onRequest"></request-material>
      </v-row>
      <request-modal
        :material="requestingMaterial"
        @close="requestingMaterial = null"
        @requested="fetchSearch"
      />
      <v-row v-if="materials.length == 0">
        <v-col cols="12" sm="6" md="3">There are no results for this search!</v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { materialTypes, materialStates } from '@/constants/constants';
import RequestMaterial from '../request/RequestMaterial.vue';
import RequestModal from '../request/RequestModal.vue';
import { getFilteredMaterials } from '@/api/materials.api';

export default {
  name: 'RequestMaterialPage',
  components: {
    RequestMaterial,
    RequestModal,
  },
  data() {
    return {
      search: '',
      sort: 'stock:desc',
      limit: 40,
      type: [],
      state: ['good', 'damaged'],
      materialTypes,
      materialStates,
      requestingMaterial: null,
      materials: null,
      locations: null,
    };
  },
  async mounted() {
    await this.fetchSearch();
  },
  methods: {
    fetchMaterials() {
      return getFilteredMaterials({
        _q: this.search || undefined,
        _sort: this.sort,
        _limit: this.limit,
        _start: 0,
        state: this.state.join(',') || undefined,
        type: this.type.join(',') || undefined,
      });
    },
    async fetchSearch() {
      this.$loading.show();
      const materials = await this.fetchMaterials();
      this.$loading.hide();

      this.materials = materials;
    },
    onRequest(materialId) {
      this.requestingMaterial =
        this.materials.find((material) => material.id === materialId) || null;
    },
  },
};
</script>

<style></style>
