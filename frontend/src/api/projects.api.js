import { handleData } from '@/utils/api';
import httpClient from './httpClient';

const ENDPOINT = '/project';

export const getAllProjects = handleData(() => httpClient.get(`${ENDPOINT}s`));

export const getProject = (id) => httpClient.get(`${ENDPOINT}/${id}`);

export const addProject = ({ name, description }) =>
  httpClient.post(ENDPOINT, { name, description });

export const deleteProject = (id) => httpClient.delete(`${ENDPOINT}/${id}`);

export const updateProject = (id, { name, state, description }) =>
  httpClient.post(`${ENDPOINT}/${id}`, { name, state, description });

export const addMember = (id, memberId) => httpClient.post(`${ENDPOINT}/${id}/member/${memberId}`);

export const deleteMember = (id, memberId) =>
  httpClient.delete(`${ENDPOINT}/${id}/member/${memberId}`);
