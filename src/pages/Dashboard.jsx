import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RepoCard from '../components/RepoCard';
import { useAuth } from '../hooks/useAuth';
import { getRepos } from '../services/api';

export default function Dashboard() {
  const { username, loading } = useAuth();
  const [repos, setRepos] = useState([]);
  const [connected, setConnected] = useState(new Set());
  const [reposLoading, setReposLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !username) {
      navigate('/');
    }
  }, [username, loading, navigate]);

  useEffect(() => {
    if (!username) return;
    getRepos()
      .then((data) => setRepos(Array.isArray(data) ? data : []))
      .catch(() => setRepos([]))
      .finally(() => setReposLoading(false));
  }, [username]);

  const handleConnect = (repo) => {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(repo.name)) {
        next.delete(repo.name);
      } else {
        next.add(repo.name);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-green-600 text-sm">
        Loading...<span className="cursor-blink ml-1">_</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar username={username} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-1 mb-6">
          <div>
            <span className="text-green-600">C:\&gt; </span>
            <span className="text-white">list repos</span>
          </div>
          <div className="h-px bg-green-800 w-full" />
          <div className="text-xs text-green-700">
            Found {repos.length} repository{repos.length !== 1 ? 's' : ''}...
          </div>
        </div>
        {reposLoading ? (
          <div className="text-green-600 text-sm">
            Fetching repos...<span className="cursor-blink">_</span>
          </div>
        ) : repos.length === 0 ? (
          <div className="text-green-600 text-sm">No repositories found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <RepoCard
                key={repo.id || repo.name}
                repo={repo}
                connected={connected.has(repo.name)}
                onConnect={handleConnect}
              />
            ))}
          </div>
        )}
        <div className="mt-8 text-xs text-green-700">
          Type 'connect &lt;repo&gt;' to enable code review<span className="cursor-blink text-green-400">_</span>
        </div>
      </main>
    </div>
  );
}
