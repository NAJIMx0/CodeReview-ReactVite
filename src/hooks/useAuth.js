import { useState, useEffect } from 'react';
import { getMe } from '../services/api';

export function useAuth() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ✅ No localStorage, no hasFetched — always ask the server
        getMe()
            .then((name) => {
                setUsername(name);
            })
            .catch(() => {
                setUsername(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return { username, loading };
}