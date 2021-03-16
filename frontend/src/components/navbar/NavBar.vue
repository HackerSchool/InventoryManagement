<template>
  <div>
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mdAndDown"
        color="primary"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <img :src="logoSrc" style="height: 100%" />
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" clipped :permanent="$vuetify.breakpoint.lgAndUp" app>
      <v-list nav>
        <v-list-item-group v-for="(route, index) in routes" :key="index" v-model="group">
          <v-list-item
            v-if="getPermissionLevel >= (route.permission || 0)"
            :to="route.link"
            text
            color="primary"
            class="mb-1"
            @click.stop="drawer = !drawer"
          >
            <v-icon v-if="route.icon" left>
              {{ route.icon }}
            </v-icon>
            {{ route.text }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #append>
        <div class="pa-2">
          <nav-bar-avatar />
          <v-btn block color="primary" outlined @click="onLogout">
            <v-icon left>mdi-logout</v-icon>Logout
          </v-btn>
          <div class="py-2 grey--text text--lighten-2 text-center">
            Created with
            <v-icon color="primary">mdi-heart</v-icon> by <strong>Hackerschool</strong> <br />
            <v-icon x-small>mdi-copyright</v-icon>
            {{ new Date().getFullYear() }} - v{{ version }}
          </div>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import logoSrc from '@/assets/logo_navbar.svg';
import NavBarAvatar from './NavBarAvatar.vue';

export default {
  components: { NavBarAvatar },

  data() {
    return {
      drawer: false,
      group: null,
      logoSrc,
      version: process.env.VUE_APP_VERSION,
      routes: [
        {
          text: 'Dashboard',
          icon: 'mdi-view-dashboard',
          link: '/',
        },
        {
          text: 'Request',
          icon: 'mdi-format-list-bulleted-type',
          link: '/request',
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
        {
          text: 'Projects',
          icon: 'mdi-lan',
          link: 'Projects',
          permission: 1, //admin only
        },
        {
          text: 'Manage Requisitions',
          icon: 'mdi-check-all',
          link: '/requisitions-admin',
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
      this.drawer = true;
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
