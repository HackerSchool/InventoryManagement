import httpClient from './httpClient';

const ENDPOINT = '/requisition';

export const getSelfRequisitions = () => httpClient.get(`${ENDPOINT}s/self`);
