import httpClient from './httpClient';

const ENDPOINT = '/member';

export const getAllMembers = () => httpClient.get(`${ENDPOINT}s`);

export const getMember = (id) => httpClient.get(`${ENDPOINT}/${id}`);

export const addMember = (data) => httpClient.post(ENDPOINT, data);

export const deleteMember = (id) => httpClient.delete(`${ENDPOINT}/${id}`);

export const updateMember = (id, data) => httpClient.post(`${ENDPOINT}/${id}`, data);
