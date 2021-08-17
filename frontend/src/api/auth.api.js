import httpClient from './httpClient';

const END_POINT = '/auth';

const fenixLogin = (code) =>
  httpClient.get(`${END_POINT}/fenix?code=${encodeURIComponent(code)}`, { skipInterceptor: true });

const getProfile = async () => {
  const response = await httpClient.get(`${END_POINT}/profile`);
  return response.data;
};

export { fenixLogin, getProfile };
