export const AUTH_BASE = 'http://localhost:8080';

export const loginWithGitHub = () => {
  window.location.href = `${AUTH_BASE}/oauth2/authorization/github`;
};

export const logout = async () => {
  localStorage.removeItem('username');

  try {
    await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // ← this sends the cookie TO the backend which then kills it
    });
  } catch (e) {
    console.error('Logout error', e);
  }

  // Remove this line — cookie deletion must happen server-side
  // document.cookie = 'JSESSIONID=...'  ← DELETE THIS

  window.location.href = 'http://localhost:5173';
};