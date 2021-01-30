import httpClient from './httpClient';

const ENDPOINT = '/material';

export const getAllMaterials = () => httpClient.get(`${ENDPOINT}s`);

export const getFilteredMaterials = ({ _q, _sort, _limit, _start, state, type }) =>
  httpClient.get(`${ENDPOINT}s`, {
    params: {
      _q,
      _sort,
      _limit,
      _start,
      state,
      type,
    },
  });

export const getMaterial = (id) => httpClient.get(`${ENDPOINT}/${id}`);

export const addMaterial = (data) =>
  httpClient.post(ENDPOINT, { locationId: data && data.location && data.location.id, ...data });

export const deleteMaterial = (id) => httpClient.delete(`${ENDPOINT}/${id}`);

export const updateMaterial = (id, data) =>
  httpClient.post(`${ENDPOINT}/${id}`, {
    locationId: data && data.location && data.location.id,
    ...data,
  });

export const uploadImage = (id, data) => httpClient.post(`${ENDPOINT}/${id}/image`, data);
