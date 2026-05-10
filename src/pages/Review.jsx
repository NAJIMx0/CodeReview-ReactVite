import { useState, useEffect } from 'react';

export default function Review() {
    const [review, setReview] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8998/api/generate/stream');

        eventSource.onopen = () => {
            setConnected(true);
            console.log('SSE connected');
        };

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('review received:', data);
            setReview(data);
        };

        eventSource.onerror = () => {
            setConnected(false);
            eventSource.close();
        };

        return () => eventSource.close();
    }, []);

    return (
        <div>
            <h2>Code Review</h2>
            <p>Status: {connected ? '🟢 connected' : '🔴 disconnected'}</p>
            {review ? (
                <pre>{JSON.stringify(review, null, 2)}</pre>
            ) : (
                <p>Waiting for review...</p>
            )}
        </div>
    );
}