import { handleData } from '@/utils/api';
import httpClient from './httpClient';

const ENDPOINT = '/project';

export const getAllProjects = handleData(() => httpClient.get(`${ENDPOINT}s`));

export const getProject = handleData((id) => httpClient.get(`${ENDPOINT}/${id}`));

export const addProject = handleData(({ name, state, description }) =>
  httpClient.post(ENDPOINT, { name, state, description })
);

export const deleteProject = handleData((id) => httpClient.delete(`${ENDPOINT}/${id}`));

export const updateProject = handleData((id, { name, state, description }) =>
  httpClient.post(`${ENDPOINT}/${id}`, { name, state, description })
);

export const addMember = handleData((id, memberId) =>
  httpClient.post(`${ENDPOINT}/${id}/member/${memberId}`)
);

export const deleteMember = handleData((id, memberId) =>
  httpClient.delete(`${ENDPOINT}/${id}/member/${memberId}`)
);
