import { useState, useEffect, useRef } from 'react';
import { getMe } from '../services/api';

export function useAuth() {
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [loading, setLoading] = useState(!localStorage.getItem('username'));
  const hasFetched = useRef(false); // ← prevent double-fetch

  useEffect(() => {
    if (username || hasFetched.current) {
      setLoading(false);
      return;
    }
    hasFetched.current = true;

    getMe()
        .then((name) => {
          setUsername(name);
          localStorage.setItem('username', name);
        })
        .catch(() => {
          setUsername(null);
          localStorage.removeItem('username'); // ← clean up stale value
        })
        .finally(() => setLoading(false));
  }, []); // ← empty deps, runs once only

  return { username, loading };
}