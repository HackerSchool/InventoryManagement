import httpClient from './httpClient';

const ENDPOINT = '/project';

export const getAllProjects = () => httpClient.get(`${ENDPOINT}s`);
