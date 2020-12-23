<template>
  <v-card class="overflow-hidden">
    <v-app-bar app>
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon color="primary" class="mr-1" @click="onLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav>
        <v-list-item-group v-for="(route, index) in routes" :key="index" v-model="group">
          <v-list-item
            v-if="getPermissionLevel >= (route.permission || 0)"
            :to="route.link"
            text
            color="primary"
          >
            <v-icon v-if="route.icon" left>
              {{ route.icon }}
            </v-icon>
            {{ route.text }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      drawer: false,
      group: null,
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
        {
          text: 'Members',
          icon: 'mdi-account-multiple',
          link: '/members',
          permission: 1, //admin only
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

  watch: {
    group() {
      this.drawer = false;
    },
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
