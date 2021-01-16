<template>
  <v-tabs v-model="active_tab">
    <v-tab v-for="tab in tabs" :key="tab.id">
      {{ tab.name }}
    </v-tab>

    <v-tab-item>
      <v-card>
        <v-card-text v-if="requisitions.length > 0">
          <v-list v-for="(item, index) in requisitions" :key="item.id" three line>
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
            <v-divider v-if="index < requisitions.length - 1" :key="index"></v-divider>
          </v-list>
        </v-card-text>
        <v-card-text v-else>There are no requisitions.</v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item>
      <v-card>
        <v-card-text v-if="inProgress.length > 0">
          <v-list v-for="(item, index) in inProgress" :key="item.id" three line>
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
            <v-divider v-if="index < inProgress.length - 1" :key="index"></v-divider>
          </v-list>
        </v-card-text>
        <v-card-text v-else>There are no pending requisitions.</v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-text v-if="Active.length > 0">
          <v-list v-for="(item, index) in Active" :key="item.id" three line>
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
            <v-divider v-if="index < Active.length - 1" :key="index"></v-divider>
          </v-list>
        </v-card-text>
        <v-card-text v-else>There are no active requisitions.</v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card>
        <v-card-text v-if="Archived.length > 0">
          <v-list v-for="(item, index) in Archived" :key="item.id" three line>
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
            <v-divider v-if="index < Archived.length - 1" :key="index"></v-divider>
          </v-list>
        </v-card-text>
        <v-card-text v-else>There are no archived requisitions.</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
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
      return this.requisitions.filter((item) => {
        return item.state == 'can_pickup' || item.state == 'pending';
      });
    },
    Active() {
      return this.requisitions.filter((item) => {
        return item.state == 'active';
      });
    },
    Archived() {
      return this.requisitions.filter((item) => {
        return (
          item.state == 'cancelled' || item.state == 'returned' || item.state == 'not_returning'
        );
      });
    },
    active_tab() {
      return this.inProgress.length > 0 ? 1 : 0; //if there are items inProgress it defaults to that tab, otherwise to All
    },
  },
};
</script>

<style></style>
