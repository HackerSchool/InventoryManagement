import httpClient from './httpClient';

const END_POINT = '/hello';

const getHelloWorld = () => httpClient.get(END_POINT);

export { getHelloWorld };
