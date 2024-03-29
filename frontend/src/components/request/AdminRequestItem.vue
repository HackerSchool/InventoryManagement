<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }" class="flex-wrap">
      <h3 class="my-1">
        <span>{{ item.quantity }}x</span> <strong>{{ item.material.name }}</strong>
        <v-chip small :color="requisitionStates[item.state].color" class="ml-4">
          {{ requisitionStates[item.state].name }}
        </v-chip>
      </h3>
      <v-fade-transition leave-absolute>
        <div v-if="!open" class="my-1">
          <div v-if="item.project">
            <v-icon left small>mdi-lan</v-icon>
            {{ item.project.name }}
          </div>
          <div v-else>
            <v-icon left small>mdi-account</v-icon>
            {{ item.member.name }}
          </div>
        </div>
      </v-fade-transition>
      <v-spacer></v-spacer>
      <div class="mr-4 flex-grow-0 my-1">
        <v-btn
          v-if="['pending', 'can_pickup'].indexOf(item.state) !== -1"
          outlined
          color="red"
          @click.stop="() => updateState('cancelled')"
        >
          {{ item.state === 'pending' ? 'Reject' : 'Cancel' }} <v-icon right>mdi-close</v-icon>
        </v-btn>
        <v-btn
          v-if="item.state == 'pending'"
          outlined
          class="ml-2"
          color="green"
          @click.stop="() => updateState('can_pickup')"
        >
          Accept <v-icon right>mdi-check</v-icon>
        </v-btn>
        <v-btn
          v-if="item.state == 'can_pickup'"
          outlined
          class="ml-2"
          color="blue"
          @click.stop="() => updateState('active')"
        >
          Mark as Picked Up <v-icon right>mdi-truck-check</v-icon>
        </v-btn>
        <v-btn
          v-if="item.state == 'active'"
          outlined
          class="ml-2"
          color="grey"
          @click.stop="() => updateState('not_returning')"
        >
          Not Returning <v-icon right>mdi-grave-stone</v-icon>
        </v-btn>
        <v-btn
          v-if="item.state == 'active'"
          outlined
          class="ml-2"
          color="green"
          @click.stop="() => updateState('returned')"
        >
          Mark as Returned <v-icon right>mdi-clipboard-arrow-left</v-icon>
        </v-btn>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>
        <v-icon left small>mdi-account</v-icon>
        {{ item.member.name }}
      </div>
      <div v-if="item.project">
        <v-icon left small>mdi-lan</v-icon>
        {{ item.project.name }}
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { requisitionStates } from '@/constants/constants';
import { updateRequisition } from '@/api/requisitions.api';

export default {
  props: { item: { type: Object, default: () => ({}) } },

  data: function () {
    return {
      showDetails: false,
      requisitionStates,
    };
  },

  methods: {
    async updateState(state) {
      this.$loading.show();
      const updatedRequisition = await updateRequisition({ requisitionId: this.item.id, state });
      this.$loading.hide();

      this.$emit('updateItem', updatedRequisition);
    },
  },
};
</script>

<style></style>
