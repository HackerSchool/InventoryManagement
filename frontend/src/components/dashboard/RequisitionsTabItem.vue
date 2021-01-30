<template>
  <v-card>
    <v-card-text v-if="items.length > 0">
      <v-list v-for="(item, index) in items" :key="item.id" three line>
        <v-list-item>
          <v-list-item-avatar :color="reqStates[item.state].color">
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
              {{ new Date(item.createdAt).toLocaleString('pt-PT') }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-chip small :color="reqStates[item.state].color">
            {{ reqStates[item.state].name }}
          </v-chip>
        </v-list-item>
        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </v-list>
    </v-card-text>
    <v-card-text v-else>{{ emptyMessage }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
    emptyMessage: { type: String, default: 'There are no items to display.' },
  },
  data: () => ({
    reqStates: {
      pending: { color: '#D38C22', name: 'Pending' },
      cancelled: { color: '#9E2A2B', name: 'Cancelled' },
      can_pickup: { color: '#3685B5', name: 'Ready to Pickup' },
      active: { color: '#65A550', name: 'Active' },
      returned: { color: '#4B7C3C', name: 'Returned' },
      not_returning: { color: '#325328', name: 'Not Returning' },
    },
  }),
};
</script>

<style></style>
