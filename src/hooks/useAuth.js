import { useState, useEffect } from 'react';
import { getMe } from '../services/api';

export function useAuth() {
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      setLoading(false);
      return;
    }
    getMe()
      .then((name) => {
        setUsername(name);
        localStorage.setItem('username', name);
      })
      .catch(() => setUsername(null))
      .finally(() => setLoading(false));
  }, [username]);

  return { username, loading };
}
