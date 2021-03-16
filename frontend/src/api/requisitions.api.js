import httpClient from './httpClient';

const ENDPOINT = '/requisition';

export const getSelfRequisitions = () => httpClient.get(`${ENDPOINT}s/self`);

export const getAllRequisitions = () => httpClient.get(`${ENDPOINT}s`);

export const createRequisition = ({ materialId, memberId, projectId, quantity }) =>
  httpClient.post(ENDPOINT, { materialId, memberId, projectId, quantity });

export const updateRequisition = (id, { state, projectId }) =>
  httpClient.post(`${ENDPOINT}/${id}`, { state, projectId });
