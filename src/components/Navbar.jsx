import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Navbar({ username }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    // no navigate() needed — logout() does window.location.replace
  };
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-black">
      <Link to="/dashboard" className="flex items-center gap-2">
        <span className="text-gray-400 text-lg font-bold tracking-wider">codereview</span>
        <span className="text-gray-600 text-xs">v1.0</span>
      </Link>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-500">user:</span>
          <span className="text-sm text-green-400 font-bold">{username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 text-xs font-bold text-green-400 border border-green-700 hover:bg-green-950 hover:border-green-500 uppercase tracking-wider transition"
        >
          [ LOGOUT ]
        </button>
      </div>
    </nav>
  );
}
