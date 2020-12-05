<template>
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
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',

  data() {
    return {
      loading: false,
      routes: [
        {
          text: 'Requisições', //Minhas Requesições
          link: '/test',
        },
        {
          text: 'Pedir', //Nova Requisição
          link: '/test',
        },
        {
          text: 'Global', //Requisições gerais
          link: '/test',
        },
        {
          text: 'Pendentes',
          link: '/test',
        },
        {
          text: 'Gerir',
          link: '/test',
        },
        {
          text: 'Locations',
          link: '/locations',
        },
        {
          text: 'Materials',
          link: '/materials',
        },
      ],
    };
  },
  methods: {
    LogoutClick: function () {
      this.loading = true;
      localStorage.removeItem('token');
      this.$router.push('login');
      this.loading = false;
    },
  },
};
</script>
