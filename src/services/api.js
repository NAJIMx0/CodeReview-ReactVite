const BASE = '/api/auth';

export const getMe = () =>
    fetch(`${BASE}/me`, { credentials: 'include' })
        .then(r => {
            if (!r.ok) throw new Error('Unauthorized');
            return r.text();
        });

export const getRepos = () =>
    fetch(`${BASE}/repo`, { credentials: 'include' })
        .then(r => {
            if (!r.ok) throw new Error('Failed to fetch repos');
            return r.json();
        });

export const connectRepo = (owner, repoName) =>
    fetch(`${BASE}/connect/${owner}/${repoName}`, {
        method: 'POST',
        credentials: 'include',
    }).then(r => {
        if (!r.ok) throw new Error('Failed to connect repo');
        return r.json();
    });

export const getConnectedRepos = () =>
    fetch(`${BASE}/connected-repos`, { credentials: 'include' })
        .then(r => {
            if (!r.ok) throw new Error('Failed to fetch connected repos');
            return r.json();
        });