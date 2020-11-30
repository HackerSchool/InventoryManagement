<template>
  <div id="loginbutton">
    <v-btn elevation="2" :disabled="loading" @click="handleButtonClick"
      >Login com o Utilizador do Fénix</v-btn
    >
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { fenixLogin } from '@/api/auth.api';

export default {
  name: 'LoginPage',

  data: function () {
    return {
      loading: false,
    };
  },

  mounted() {
    const fenixCode = this.$route.query.code;
    if (fenixCode) this.authWithBackend(fenixCode);
  },

  methods: {
    handleButtonClick: function () {
      window.location = `${process.env.VUE_APP_FENIX_BASE_URL}oauth/userdialog?client_id=${process.env.VUE_APP_FENIX_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_FENIX_REDIRECT_URL}`;
    },
    authWithBackend: async function (code) {
      this.loading = true;
      const { data } = await fenixLogin(code);
      this.loading = false;

      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        this.$router.push('/');
      }
    },
  },
};
</script>
