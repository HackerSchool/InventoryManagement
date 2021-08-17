import { handleData } from '@/utils/api';
import httpClient from './httpClient';

const ENDPOINT = '/material';

export const getAllMaterials = handleData(() => httpClient.get(`${ENDPOINT}s`));

export const getFilteredMaterials = handleData(({ _q, _sort, _limit, _start, state, type }) =>
  httpClient.get(`${ENDPOINT}s`, {
    params: {
      _q,
      _sort,
      _limit,
      _start,
      state,
      type,
    },
  })
);

export const getMaterial = handleData((id) => httpClient.get(`${ENDPOINT}/${id}`));

export const addMaterial = handleData((data) =>
  httpClient.post(ENDPOINT, { locationId: data && data.location && data.location.id, ...data })
);

export const deleteMaterial = handleData((id) => httpClient.delete(`${ENDPOINT}/${id}`));

export const updateMaterial = handleData((id, data) =>
  httpClient.post(`${ENDPOINT}/${id}`, {
    locationId: data && data.location && data.location.id,
    ...data,
  })
);

export const uploadImage = handleData((id, data) =>
  httpClient.post(`${ENDPOINT}/${id}/image`, data)
);
