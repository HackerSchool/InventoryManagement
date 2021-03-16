<template>
  <v-card class="d-flex justify-space-between mt-4 mb-4 pa-4">
    <div>
      <h3>
        <span>{{ item.quantity }}x</span> <strong>{{ item.material.name }}</strong>
        <v-chip small :color="requisitionStates[item.state].color" class="ml-4">
          {{ requisitionStates[item.state].name }}
        </v-chip>
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
        Created on {{ new Date(item.createdAt).toLocaleString() }}
      </div>
      <div v-if="item.dateOut">
        <v-icon left small>mdi-clock-start</v-icon>
        Picked up on {{ new Date(item.dateOut).toLocaleString() }}
      </div>
      <div v-if="item.dateIn">
        <v-icon left small>mdi-clock-end</v-icon>
        Returned on {{ new Date(item.dateIn).toLocaleString() }}
      </div>
    </div>
    <div>
      <v-btn
        v-if="['pending', 'can_pickup'].indexOf(item.state) !== -1"
        outlined
        color="red"
        @click="() => updateState('cancelled')"
      >
        {{ item.state === 'pending' ? 'Reject' : 'Cancel' }} <v-icon right>mdi-close</v-icon>
      </v-btn>
      <v-btn
        v-if="item.state == 'pending'"
        outlined
        class="ml-2"
        color="green"
        @click="() => updateState('can_pickup')"
      >
        Accept <v-icon right>mdi-check</v-icon>
      </v-btn>
      <v-btn
        v-if="item.state == 'can_pickup'"
        outlined
        class="ml-2"
        color="blue"
        @click="() => updateState('active')"
      >
        Mark as Picked Up <v-icon right>mdi-truck-check</v-icon>
      </v-btn>
      <v-btn
        v-if="item.state == 'active'"
        outlined
        class="ml-2"
        color="green"
        @click="() => updateState('returned')"
      >
        Mark as Returned <v-icon right>mdi-clipboard-arrow-left</v-icon>
      </v-btn>
      <v-btn
        v-if="item.state == 'active'"
        outlined
        class="ml-2"
        color="grey"
        @click="() => updateState('not_returning')"
      >
        Not Returning <v-icon right>mdi-grave-stone</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { requisitionStates } from '@/constants/constants';

export default {
  props: { item: { type: Object, default: () => ({}) } },

  data: function () {
    return {
      showDetails: false,
      requisitionStates,
    };
  },

  methods: {
    ...mapActions('requisitions', ['updateRequisition']),
    updateState(state) {
      console.log(state);
      this.updateRequisition({ id: this.item.id, data: { state } });
    },
  },
};
</script>

<style></style>
