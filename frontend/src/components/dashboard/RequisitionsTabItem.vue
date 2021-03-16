<template>
  <v-card>
    <v-card-text v-if="items.length > 0">
      <v-list v-for="(item, index) in items" :key="item.id" three line>
        <v-list-item>
          <v-list-item-avatar :color="requisitionStates[item.state].color">
            <span>{{ item.quantity }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.material.name }}
            </v-list-item-title>
            {{
              item.project
                ? `Project: ${item.project.name}`
                : 'There is no project linked to this requisition'
            }}
            <v-list-item-subtitle>
              <v-icon left small>mdi-clock</v-icon>
              {{ new Date(item.createdAt).toLocaleString('pt-PT') }}
              <div v-if="item.dateOut">
                <v-icon left small>mdi-clock-start</v-icon>
                Picked up on {{ new Date(item.dateOut).toLocaleString() }}
              </div>
              <div v-if="item.dateIn">
                <v-icon left small>mdi-clock-end</v-icon>
                Returned on {{ new Date(item.dateIn).toLocaleString() }}
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-chip small :color="requisitionStates[item.state].color">
            {{ requisitionStates[item.state].name }}
          </v-chip>
        </v-list-item>
        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </v-list>
    </v-card-text>
    <v-card-text v-else>{{ emptyMessage }}</v-card-text>
  </v-card>
</template>

<script>
import { requisitionStates } from '@/constants/constants';
export default {
  props: {
    items: { type: Array, default: () => [] },
    emptyMessage: { type: String, default: 'There are no items to display.' },
  },
  data: () => ({
    requisitionStates,
  }),
};
</script>

<style></style>
