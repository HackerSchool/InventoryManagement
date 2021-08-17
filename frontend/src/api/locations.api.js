import { handleData } from '@/utils/api';
import httpClient from './httpClient';

const ENDPOINT = '/location';

export const getAllLocations = handleData(() => httpClient.get(`${ENDPOINT}s`));

export const getLocation = handleData((id) => httpClient.get(`${ENDPOINT}/${id}`));

export const addLocation = handleData(({ name, description }) =>
  httpClient.post(ENDPOINT, { name, description })
);

export const deleteLocation = handleData((id) => httpClient.delete(`${ENDPOINT}/${id}`));

export const updateLocation = handleData((id, { name, description }) =>
  httpClient.post(`${ENDPOINT}/${id}`, { name, description })
);
