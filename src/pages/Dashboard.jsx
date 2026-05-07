import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RepoCard from '../components/RepoCard';
import { useAuth } from '../hooks/useAuth';
import { getRepos, connectRepo } from '../services/api';


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


  const handleConnect = async (repo) => {
    try {
      await connectRepo(repo.owner.login, repo.name);
      setConnected((prev) => {
        const next = new Set(prev);
        next.add(repo.name);
        return next;
      });
    } catch (err) {
      console.error('Failed to connect repo', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-green-400 text-lg">
        <span className="text-green-500">~/codereview $</span>
        <span className="ml-3">initializing</span>
        <span className="cursor-blink ml-1 text-green-400">█</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar username={username} />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-4 mb-10">
          <div className="flex items-start gap-2">
            <span className="text-green-500 text-base font-semibold shrink-0 mt-0.5">~/codereview $</span>
            <span className="text-white text-base font-semibold">list --repos</span>
          </div>

          <div className="h-px bg-gradient-to-r from-green-500/40 via-green-400/40 to-transparent" />

          <div className="flex items-center gap-3">
            <span className="text-green-400 text-xl font-semibold">
              {repos.length}
            </span>
            <span className="text-green-300 text-xl font-semibold">
              {repos.length === 1 ? 'repository' : 'repositories'}
            </span>
            <span className="text-green-600 text-xl font-semibold">found</span>
            <span className="ml-2 text-green-500 text-xl">●</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-green-700">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              {connected.size} connected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-800 inline-block" />
              {repos.length - connected.size} available
            </span>
          </div>
        </div>

        {reposLoading ? (
          <div className="text-green-400 text-lg flex items-center gap-3">
            <span className="text-green-500">Fetching repos...</span>
            <span className="cursor-blink">█</span>
          </div>
        ) : repos.length === 0 ? (
          <div className="text-green-400 text-lg border border-green-800 bg-green-950/20 p-6 rounded-lg">
            No repositories found. Connect a GitHub account to continue.
          </div>
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

        <div className="mt-12 pt-6 border-t border-green-900 flex items-center gap-2 text-sm text-green-700">
          <span className="text-green-500">$</span>
          <span>Select a repository to enable AI-powered code review</span>
          <span className="cursor-blink text-green-400 ml-1">█</span>
        </div>
      </main>
    </div>
  );
}
