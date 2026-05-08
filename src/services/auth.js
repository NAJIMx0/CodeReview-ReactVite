export const AUTH_BASE = 'http://localhost:8080';

export const loginWithGitHub = () => {
  window.location.href = `${AUTH_BASE}/oauth2/authorization/github`;
};

export const logout = async () => {
  // Clear local state first
  localStorage.removeItem('username');

  try {
    await fetch(`${AUTH_BASE}/api/auth/revoke`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    console.log('revoke failed, continuing');
  }

  try {
    await fetch(`${AUTH_BASE}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    console.log('logout failed, continuing');
  }

  // Force full page reload to wipe all React state
  window.location.replace('http://localhost:5173');
};