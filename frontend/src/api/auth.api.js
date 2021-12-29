import httpClient from './httpClient';

const END_POINT = '/auth';

const fenixLogin = async (code) => {
  const response = httpClient.get(`${END_POINT}/fenix?code=${encodeURIComponent(code)}`, {
    skipInterceptor: true,
  });
  return (await response).data;
};

const getProfile = async () => {
  const response = await httpClient.get(`${END_POINT}/profile`);
  return response.data;
};

const getAuthMethods = async () => {
  const response = await httpClient.get(`${END_POINT}/info`);
  return response.data;
};

const customAuthEndpoint = async (endpoint) => {
  const response = await httpClient.get(endpoint, { skipInterceptor: true });
  return response.data;
};

export { fenixLogin, customAuthEndpoint, getAuthMethods, getProfile };
