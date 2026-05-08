import { useState, useEffect, useRef } from 'react';
import { getMe } from '../services/api';

export function useAuth() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const stored = localStorage.getItem('username');
        if (stored) {
            setUsername(stored);
            setLoading(false);
            return;
        }

        getMe()
            .then((name) => {
                setUsername(name);
                localStorage.setItem('username', name);
            })
            .catch(() => {
                setUsername(null);
                localStorage.removeItem('username');
            })
            .finally(() => setLoading(false));
    }, []);

    return { username, loading };
}