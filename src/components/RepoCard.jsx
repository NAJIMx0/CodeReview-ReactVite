export default function RepoCard({ repo, onConnect, connected }) {
  return (
    <div className="border border-green-800 hover:border-green-500/50 transition-all bg-[#0a0a0a] rounded-lg overflow-hidden group">
      <div className="px-4 py-2 border-b border-green-900 bg-[#0d0d0d] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-xs">repo</span>
          <span className="text-green-800 text-xs">/</span>
          <span className="text-white text-sm font-bold">{repo.name}</span>
        </div>
        {connected && (
          <span className="px-2 py-0.5 text-xs font-bold text-green-400 bg-green-950 border border-green-800">
            CONNECTED
          </span>
        )}
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-green-700 text-xs">type:</span>
            <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
              repo.private
                ? 'text-green-400 bg-green-950 border border-green-800'
                : 'text-green-300 bg-green-950 border border-green-800'
            }`}>
              {repo.private ? 'Private' : 'Public'}
            </span>
          </div>
        </div>

        <div className="h-px bg-green-900" />

        <button
          onClick={() => onConnect(repo)}
          disabled={connected}
          className={`w-full py-3 text-sm font-bold uppercase tracking-wider border-2 transition-all ${
            connected
              ? 'border-green-800 text-green-600 bg-green-950/30 cursor-default'
              : 'border-green-700 text-green-400 hover:border-green-400 hover:bg-green-400 hover:text-black group-hover:shadow-md group-hover:shadow-green-500/10'
          }`}
        >
          {connected ? '✓  CONNECTED' : '>  CONNECT'}
        </button>
      </div>
    </div>
  );
}
