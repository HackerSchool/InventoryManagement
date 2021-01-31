<template>
  <v-container class="mb-4">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          filled
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
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn @click="fetchSearch">Search</v-btn>
    </v-row>
    <v-row v-for="material in materials" :key="material.id">
      <request-material v-model="requestingMaterial" :material="material"></request-material>
    </v-row>
    <request-modal v-model="requestingMaterial" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { materialTypes, materialStates } from '@/constants/constants';
import RequestMaterial from '../request/RequestMaterial.vue';
import RequestModal from '../request/RequestModal.vue';
export default {
  components: { RequestMaterial, RequestModal },
  data() {
    return {
      search: '',
      sort: 'stock:desc',
      limit: 40,
      type: [],
      state: ['good', 'damaged'],
      materialTypes,
      materialStates,
      loading: false,
      requestingMaterial: null,
    };
  },
  computed: {
    ...mapState('materials', ['materials']),
  },
  methods: {
    ...mapActions('materials', ['fetchFilteredMaterials']),
    async fetchSearch() {
      if (this.loading) return;
      this.loading = true;
      await this.fetchFilteredMaterials({
        _q: this.search || undefined,
        _sort: this.sort,
        _limit: this.limit,
        _start: 0,
        state: this.state.join(',') || undefined,
        type: this.type.join(',') || undefined,
      });
      this.loading = false;
    },
  },
};
</script>

<style></style>
