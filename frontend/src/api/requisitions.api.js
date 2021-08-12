import { handleData } from '@/utils/api';
import httpClient from './httpClient';

const ENDPOINT = '/requisition';

export const getSelfRequisitions = handleData(() => httpClient.get(`${ENDPOINT}s/self`));

export const getAllRequisitions = handleData(() => httpClient.get(`${ENDPOINT}s`));

export const createRequisition = handleData(({ materialId, memberId, projectId, quantity }) =>
  httpClient.post(ENDPOINT, { materialId, memberId, projectId, quantity })
);

export const updateRequisition = handleData((id, { state, projectId }) =>
  httpClient.post(`${ENDPOINT}/${id}`, { state, projectId })
);
