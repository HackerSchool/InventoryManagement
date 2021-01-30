<template>
  <v-container>
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
  </v-container>
</template>

<script>
import { materialTypes, materialStates } from '@/constants/constants';
export default {
  data() {
    return {
      search: '',
      sort: 'stock:desc',
      limit: 40,
      type: [],
      state: ['good', 'damaged'],
      materialTypes,
      materialStates,
    };
  },
};
</script>

<style></style>
