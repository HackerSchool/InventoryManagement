// TODO
/*import axios from 'axios';

// copied from somewhere else this should be changed
const httpClient = axios.create();
httpClient.defaults.timeout = 10000;
httpClient.defaults.baseURL = process.env.VUE_APP_ROOT_API;
httpClient.defaults.headers.post['Content-Type'] = 'application/json';
httpClient.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = Store.getters.getToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

class RemoteServices {
  static async testRequest(testArg) {
    //exemplo doutro lado, a ideia é ter
    /*
            httpClient //cena do axios que faz os pedidos
            .get('url')
            ou
            .post('url',
                paramOnTheOtherSide: paramOnMySide,
                param2OnTheOtherSide: paramOnMySide2)

            depois
            .then(response => {
                //fazer algo com a resposta
            })
            .catch(async error => {
                //if anything went wrong deal with it here
            });
        */
/*return httpClient
      .get(`/auth/fenix?code=${code}`)
      .then((response) => {
        return new AuthDto(response.data);
      })
      .catch(async (error) => {
        throw Error(await this.errorMessage(error));
      });
  }
}*/
