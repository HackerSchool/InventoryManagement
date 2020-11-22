import httpClient from './httpClient';

const END_POINT = '/members';

const getAllMembers = () => httpClient.get(END_POINT);

export { getAllMembers };
