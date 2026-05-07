import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getMe = () => api.get('/auth/me').then((res) => res.data);
export const getRepos = () => api.get('/auth/repo').then((res) => res.data);
