<template>
  <v-card class="d-flex justify-space-between mt-4 mb-4 pa-4">
    <div>
      <h3>
        <span>{{ item.quantity }}x</span> <strong>{{ item.material.name }}</strong>
      </h3>
      <div>
        <v-icon left small>mdi-account</v-icon>
        {{ item.member.name }}
      </div>
      <div v-if="item.project">
        For <strong>{{ item.project.name }}</strong> project
      </div>
      <div>
        <v-icon left small>mdi-clock</v-icon>
        {{ new Date(item.createdAt).toLocaleString() }}
      </div>
    </div>
    <div>
      <v-btn outlined color="red">Reject <v-icon right>mdi-close</v-icon></v-btn>
      <v-btn outlined class="ml-2" color="green">Accept <v-icon right>mdi-check</v-icon></v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: { item: { type: Object, default: () => ({}) } },

  data: function () {
    return {
      showDetails: false,
    };
  },
};
</script>

<style></style>
