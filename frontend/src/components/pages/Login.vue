<template>
  <v-container fill-height>
    <v-row align-content="center">
      <v-spacer />
      <v-sheet elevation="5" class="pa-6 d-flex flex-column align-center" rounded>
        <v-img :src="logoSrc" height="100" width="100" contain class="mb-4" />
        <h1 class="mb-1">Login | HS-Inventory</h1>
        <p class="mb-8">This is an internal application that requires logging in.</p>
        <v-btn
          v-for="(method, i) in authMethods"
          :id="`login-btn-${i}`"
          :key="method.buttonText"
          :data-apiUrl="method.apiUrl"
          class="login-btn"
          :href="method.buttonRedirect"
          :style="{ backgroundColor: method.buttonColor }"
          elevation="2"
          :loading="loading"
          :disabled="loading"
          @click="handleButtonClick(method.apiUrl)"
          >{{ method.buttonText }}</v-btn
        >
      </v-sheet>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import { customAuthEndpoint, fenixLogin, getAuthMethods } from '@/api/auth.api';
import logoSrc from '@/assets/logo_hs.svg';
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',

  data: function () {
    return {
      loading: false,
      logoSrc,
      authMethods: [],
    };
  },

  mounted() {
    const fenixCode = this.$route.query.code;
    if (fenixCode) this.authWithBackend(() => fenixLogin(fenixCode));

    getAuthMethods().then((methods) => (this.authMethods = methods));
  },

  methods: {
    handleButtonClick: function (apiUrl) {
      if (apiUrl) {
        this.authWithBackend(() => customAuthEndpoint(apiUrl));
      }
    },
    authWithBackend: async function (apiFunction) {
      try {
        this.loading = true;
        const data = await apiFunction();
        this.loading = false;

        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
          this.loginUser(data.user);
          this.$router.push('/');
        }
      } catch (e) {
        console.error(e);
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
.login-btn {
  color: white;
  margin: 5px 0;
}
</style>
