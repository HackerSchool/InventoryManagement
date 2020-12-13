<template>
  <v-card flat tile>
    <v-toolbar>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-for="(route, index) in routes" :key="index">
        <v-btn
          v-if="getPermissionLevel >= (route.permission || 0)"
          :to="route.link"
          text
          color="primary"
        >
          <v-icon v-if="route.icon" left>
            {{ route.icon }}
          </v-icon>
          {{ route.text }}
        </v-btn>

        <v-divider style="margin-left: 5px; margin-right: 5px" vertical> </v-divider>
      </div>

      <v-btn icon color="primary" class="mr-1" @click="onLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HeaderComponent',

  data() {
    return {
      routes: [
        {
          text: 'Dashboard',
          icon: 'mdi-view-dashboard',
          link: '/',
        },
        {
          text: 'Requisitions',
          icon: 'mdi-format-list-bulleted-type',
          link: '/test',
        },
        {
          text: 'Locations',
          icon: 'mdi-map-marker',
          link: '/locations',
          permission: 1, // admin only
        },
        {
          text: 'Materials',
          icon: 'mdi-package-variant',
          link: '/materials',
          permission: 1, // admin only
        },
      ],
    };
  },
  computed: {
    title() {
      return this.$route.meta.title || 'Inventory';
    },
    ...mapGetters('user', ['getPermissionLevel']),
  },
  methods: {
    onLogout: function () {
      localStorage.removeItem('token');
      this.logoutUser();
      this.$router.push('login');
    },

    ...mapActions('user', ['logoutUser']),
  },
};
</script>
