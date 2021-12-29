const axios = require('axios');
const { sign } = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hackerschool-is-cool';

const FENIX_BASE_URL = process.env.FENIX_BASE_URL || 'https://fenix.tecnico.ulisboa.pt/';
const FENIX_CLIENT_ID = process.env.FENIX_CLIENT_ID || '';
const FENIX_CLIENT_SECRET = process.env.FENIX_CLIENT_SECRET || '';
const FENIX_REDIRECT_URL = process.env.FENIX_REDIRECT_URL || '';

module.exports = {
  /**
   * Generate a JWT from a user object
   */
  generateJWT: ({ id, istId, name, role, avatar }) => {
    const tokenPayload = { id, istId, name, role, avatar };
    const token = sign(tokenPayload, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });
    return token;
  },

  getDemoAuthMethodInfo: () => {
    if (process.env.INVENTORY_DEMO_MODE == 'true') {
      return [
        {
          buttonColor: '#585858',
          buttonText: 'Demo Login (User)',
          type: 'demo',
          apiUrl: '/auth/demo/user',
        },
        {
          buttonColor: '#585858',
          buttonText: 'Demo Login (Admin)',
          type: 'demo',
          apiUrl: '/auth/demo/admin',
        },
      ];
    }
  },

  getFenixAuthMethodInfo: () => {
    if (FENIX_CLIENT_ID) {
      return {
        buttonRedirect: `${FENIX_BASE_URL}oauth/userdialog?client_id=${FENIX_CLIENT_ID}&redirect_uri=${FENIX_REDIRECT_URL}`,
        buttonColor: '#009de0',
        buttonText: 'Login with Fénix',
        type: 'fenix',
      };
    }
  },

  /**
   * Finalize login flow for the Fenix API by getting an access token
   */
  fenixLogin: async (code) => {
    try {
      const { data: fenixResponse } = await axios.post(
        `${FENIX_BASE_URL}oauth/access_token?client_id=${encodeURIComponent(
          FENIX_CLIENT_ID
        )}&client_secret=${encodeURIComponent(
          FENIX_CLIENT_SECRET
        )}&redirect_uri=${encodeURIComponent(FENIX_REDIRECT_URL)}&code=${encodeURIComponent(
          code
        )}&grant_type=authorization_code`
      );
      return fenixResponse.access_token;
    } catch (e) {
      // invalid code
      return;
    }
  },

  /**
   * Get the username and photo of the logged in Fenix user
   */
  getFenixAbout: async (accessToken) => {
    try {
      const { data: fenixResponse } = await axios.get(`${FENIX_BASE_URL}api/fenix/v1/person`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { username: fenixResponse.username, photo: fenixResponse.photo };
    } catch (e) {
      // unknown error
      return;
    }
  },
};
