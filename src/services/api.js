import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getMe = () => api.get('/auth/me').then((res) => res.data);
export const getRepos = () => api.get('/auth/repo').then((res) => res.data);

export const connectRepo = (owner, repoName) =>
    fetch(`/api/auth/connect/${owner}/${repoName}`, {
      method: 'POST',
      credentials: 'include',
    }).then((r) => r.json());

export const getConnectedRepos = () =>
    fetch('/api/auth/connected-repos', {
      credentials: 'include',
    }).then((r) => r.json());