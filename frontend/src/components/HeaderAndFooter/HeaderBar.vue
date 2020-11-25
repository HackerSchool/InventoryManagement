<template>
  <div style="background-color: orange; text-color: white; width: 100%; height: 70px">
    <v-row align="center" style="height: 70px">
      <v-col cols="2"> </v-col>
      <!--
            <v-col >
            </v-col>
            -->
      <v-col cols="10">
        <v-row justify="start">
          <div v-for="(route, index) in routes" :key="index">
            <router-link :to="route.link">
              {{ route.text }}
            </router-link>

            <v-divider style="margin-left: 5px; margin-right: 5px" vertical> </v-divider>
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
          text: 'Login',
          link: '/login',
        },
      ],
    };
  },
  methods: {},
};
</script>
