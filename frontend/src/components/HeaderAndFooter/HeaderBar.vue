<template>
  <!--
  <div style="background-color: orange; text-color: white; width: 100%; height: 70px">
    <v-row align="center" style="height: 70px">
      <v-col cols="2"> </v-col>
      <v-col cols="10">
        <v-row justify="start">
          <div v-for="(route, index) in routes" :key="index">
            <router-link :to="route.link">
              {{ route.text }}
            </router-link>

            <v-divider style="margin-left: 5px; margin-right: 5px" vertical> </v-divider>
          </div>
          <div>
            <v-btn
              small
              color="secondary"
              elevation="2"
              :loading="loading"
              :disabled="loading"
              @click="LogoutClick"
              >Logout</v-btn
            >
          </div>
        </v-row>
      </v-col>
    </v-row>
  </div>-->
  <v-card flat tile>
    <v-toolbar>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-for="(route, index) in routes" :key="index">
        <v-btn :to="route.link" text color="primary">
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
export default {
  name: 'HeaderComponent',

  data() {
    return {
      loading: false,
      routes: [
        {
          text: 'Dashboard',
          icon: 'mdi-view-dashboard',
          link: '/',
        },
        {
          text: 'Requisições', //Minhas Requesições
          icon: 'mdi-format-list-bulleted-type',
          link: '/test',
        },
        {
          text: 'Locations',
          icon: 'mdi-map-marker',
          link: '/locations',
        },
        {
          text: 'Materials',
          icon: 'mdi-package-variant',
          link: '/materials',
        },
      ],
    };
  },
  computed: {
    title() {
      return this.$route.meta.title || 'Inventory';
    },
  },
  methods: {
    onLogout: function () {
      this.loading = true;
      localStorage.removeItem('token');
      this.$router.push('login');
      this.loading = false;
    },
  },
};
</script>
