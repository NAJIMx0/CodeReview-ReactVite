import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Navbar({ username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b border-green-800 bg-black">
      <Link to="/dashboard" className="text-sm font-bold text-white tracking-wider uppercase">
        codereview<span className="text-green-400">.exe</span>
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-xs text-green-600">user:</span>
        <span className="text-xs text-green-400">{username}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-xs font-bold text-green-400 border border-green-800 hover:bg-green-950 hover:text-white uppercase tracking-wider transition"
        >
          [ LOGOUT ]
        </button>
      </div>
    </nav>
  );
}
