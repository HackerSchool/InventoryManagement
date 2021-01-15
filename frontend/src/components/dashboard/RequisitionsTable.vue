<template>
  <v-tabs v-model="active_tab">
    <v-tab v-for="tab in tabs" :key="tab.id">
      {{ tab.name }}
    </v-tab>

    <v-tab-item>
      <v-card>
        <v-card-text>
          <v-list v-for="(item, index) in requisitions" :key="item.id" three line>
            <v-list-item>
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
            <v-divider v-if="index < requisitions.length - 1" :key="index"></v-divider>
          </v-list>
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item>
      <v-card>
        <v-card-text>
          <v-list
            v-for="(item, index) in requisitions"
            v-if="item.state == 'pending'"
            :key="item.id"
            three
            line
          >
            <v-list-item>
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
            <v-divider v-if="index < requisitions.length - 1" :key="index"></v-divider>
          </v-list>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-text> Active </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-text> Archived </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    active_tab: 1,
    tabs: [
      { id: 1, name: 'All' },
      { id: 2, name: 'In progress' },
      { id: 3, name: 'Active' },
      { id: 4, name: 'Archived' },
    ],
    reqStates: {
      pending: { color: '#D38C22', name: 'Pending' },
      cancelled: { color: '#9E2A2B', name: 'Cancelled' },
      can_pickup: { color: '#3685B5', name: 'Ready to Pickup' },
      active: { color: '#65A550', name: 'Active' },
      returned: { color: '#4B7C3C', name: 'Returned' },
      not_returning: { color: '#325328', name: 'Not Returning' },
    },
  }),
  computed: {
    ...mapState('requisitions', ['requisitions']),
    inProgress() {
      /*filter is not working for now, needs to be fixed*/
      return this.requisitions.filter((item) => {
        return item.reduce((acc, item) => {
          return acc || item.state == 'pending';
        }, false);
      });
    },
  },
};
</script>

<style></style>
