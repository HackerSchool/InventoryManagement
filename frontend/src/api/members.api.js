import { handleData } from '@/utils/api';
import httpClient from './httpClient';

const ENDPOINT = '/member';

export const getAllMembers = handleData(() => httpClient.get(`${ENDPOINT}s`));

export const getMember = handleData((id) => httpClient.get(`${ENDPOINT}/${id}`));

export const addMember = handleData((data) => httpClient.post(ENDPOINT, data));

export const deleteMember = handleData((id) => httpClient.delete(`${ENDPOINT}/${id}`));

export const updateMember = handleData((id, data) => httpClient.post(`${ENDPOINT}/${id}`, data));
