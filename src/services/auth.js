export const AUTH_BASE = 'http://localhost:8080';

export const loginWithGitHub = () => {
  window.location.href = `${AUTH_BASE}/oauth2/authorization/github`;
};

export const logout = () => {
  localStorage.removeItem('username');
  window.location.href = '/';
};
