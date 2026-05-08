import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getMe = () =>
    fetch('/api/auth/me', { credentials: 'include' })
        .then(r => {
            if (!r.ok) throw new Error('Unauthorized');
            return r.text(); // /me returns a string not JSON
        });

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