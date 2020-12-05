import httpClient from './httpClient';

const ENDPOINT = '/location';

export const getAllLocations = () => httpClient.get(`${ENDPOINT}s`);

export const getLocation = (id) => httpClient.get(`${ENDPOINT}/${id}`);

export const addLocation = ({ name, description }) =>
  httpClient.post(ENDPOINT, { name, description });

export const deleteLocation = (id) => httpClient.delete(`${ENDPOINT}/${id}`);

export const updateLocation = (id, { name, description }) =>
  httpClient.post(`${ENDPOINT}/${id}`, { name, description });
