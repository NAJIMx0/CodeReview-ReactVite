export const AUTH_BASE = 'http://localhost:8080';

export const loginWithGitHub = () => {
  window.location.href = `${AUTH_BASE}/oauth2/authorization/github`;
};

export const logout = async () => {
  localStorage.removeItem('username');

  try {
    await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    console.error('Logout error', e);
  }
  document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost';
  window.location.href = 'http://localhost:5173';
};
