<template>
  <v-container>
    <p></p>
    <v-card elevation="2">
      <v-card-title
        >{{ material.name }}
        <span class="text-subtitle-1 pl-3">{{ material.stock }} available</span>
      </v-card-title>
      <!-- TODO SHOW MORE DATA AND IMPROVE STYLES -->
      <v-btn @click="openRequest">Request this</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  model: {
    event: 'change',
  },
  props: {
    material: { type: Object, default: () => {} },
  },
  methods: {
    openRequest() {
      this.$emit('change', this.material.id);
    },
  },
};
</script>

<style></style>
