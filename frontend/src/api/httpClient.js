import Vue from 'vue';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthToken = () => localStorage.getItem('token');

const authInterceptor = (config) => {
  config.headers['Authorization'] = getAuthToken();
  return config;
};

// interceptor to catch errors
const errorInterceptor = (error) => {
  // check if it's a server error
  if (!error.response) {
    Vue.notify({ type: 'warn', title: 'Network/Server error' });
    return Promise.reject(error);
  }

  // all the other error responses
  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message);
      Vue.notify({ type: 'warn', title: 'Nothing to display', text: 'Data Not Found' });
      break;

    case 401: // authentication error, logout the user
      Vue.notify({ type: 'warn', title: 'Please login again', text: 'Session Expired' });
      localStorage.removeItem('token');
      // TODO router.push('/auth');
      break;

    default:
      console.error(error.response.status, error.message);
      Vue.notify({ type: 'error', title: 'Server Error' });
  }
  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response) => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    // any other cases
    default:
    // default case
  }

  return response;
};

httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
