import httpClient from './httpClient';

const ENDPOINT = '/project';

export const getAllProjects = () => httpClient.get(`${ENDPOINT}s`);

export const getProject = (id) => httpClient.get(`${ENDPOINT}/${id}`);

export const addProject = ({ name, description }) =>
  httpClient.post(ENDPOINT, { name, description });

export const deleteProject = (id) => httpClient.delete(`${ENDPOINT}/${id}`);

export const updateProject = (id, { name, description }) =>
  httpClient.post(`${ENDPOINT}/${id}`, { name, description });
