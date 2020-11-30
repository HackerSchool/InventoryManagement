import httpClient from './httpClient';

const END_POINT = '/auth';

const fenixLogin = (code) =>
  httpClient.get(`${END_POINT}/fenix?code=${encodeURIComponent(code)}`, { skipInterceptor: true });

export { fenixLogin };
