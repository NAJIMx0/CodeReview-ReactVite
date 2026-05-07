import { loginWithGitHub } from '../services/auth';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="border border-green-800">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-green-800 bg-green-950/30">
            <div className="w-3 h-3 border border-green-500" />
            <div className="w-3 h-3 border border-green-500" />
            <div className="w-3 h-3 border border-green-500" />
            <span className="ml-2 text-xs text-green-600">codereview.exe</span>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <span className="text-green-600">C:\&gt; </span>
              <span className="text-white">echo</span>
              <span className="text-green-400 ml-2">&quot;AI-Powered Code Review&quot;</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              AI-POWERED CODE REVIEW
            </h1>
            <div className="h-px bg-green-800 w-full" />
            <p className="text-sm text-green-600 leading-relaxed">
              Connect your GitHub repos and get instant AI feedback on every push
            </p>
            <div>
              <span className="text-green-600">Status: </span>
              <span className="text-green-400">AWAITING AUTHENTICATION</span>
            </div>
            <button
              onClick={loginWithGitHub}
              className="w-full mt-4 py-3 text-sm font-bold text-black bg-green-400 hover:bg-green-300 uppercase tracking-wider border border-green-400 transition"
            >
              [ LOGIN WITH GITHUB ]
            </button>
            <div className="text-xs text-green-700 pt-2">
              Press button or type 'auth github' to continue...
              <span className="cursor-blink text-green-400">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
