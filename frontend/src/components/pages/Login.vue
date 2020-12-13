<template>
  <v-container fill-height>
    <v-row align-content="center">
      <v-spacer />
      <v-sheet elevation="5" class="pa-6 d-flex flex-column align-center" rounded>
        <v-img :src="logoSrc" height="100" width="100" contain class="mb-4" />
        <h1 class="mb-1">Login | HS-Inventory</h1>
        <p class="mb-8">This is an internal application that requires logging in.</p>
        <v-btn
          id="btn"
          elevation="2"
          :loading="loading"
          :disabled="loading"
          @click="handleButtonClick"
          >Login With Fénix</v-btn
        >
      </v-sheet>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import { fenixLogin } from '@/api/auth.api';
import logoSrc from '@/assets/logo_hs.svg';
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',

  data: function () {
    return {
      loading: false,
      logoSrc,
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
      try {
        this.loading = true;
        const { data } = await fenixLogin(code);
        this.loading = false;

        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
          this.loginUser(data.jwt);
          this.$router.push('/');
        }
      } catch (e) {
        // user not allowed to access the app
        this.$notify({
          type: 'error',
          title: 'Unauthorized user',
          text: "You don't have permission to access this ",
          duration: -1,
        });
        this.loading = false;
      }
    },

    ...mapActions('user', ['loginUser']),
  },
};
</script>

<style>
#btn {
  background: #009de0;
  color: white;
}
</style>
