export default function RepoCard({ repo, onConnect, connected }) {
  return (
    <div className="border border-green-800 hover:border-green-600 transition">
      <div className="px-3 py-2 border-b border-green-800 bg-green-950/30 flex items-center justify-between">
        <span className="text-xs text-green-600">repo[{repo.name}]</span>
        {connected && (
          <span className="text-xs text-green-400">[OK]</span>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="text-sm text-white font-bold">{repo.name}</div>
        <div className="text-xs text-green-600">
          type: <span className="text-green-400">{repo.private ? 'private' : 'public'}</span>
        </div>
        <div className="h-px bg-green-900" />
        <button
          onClick={() => onConnect(repo)}
          disabled={connected}
          className={`w-full py-2 text-xs font-bold uppercase tracking-wider border transition ${
            connected
              ? 'border-green-600 text-green-600 cursor-default'
              : 'border-green-400 text-green-400 hover:bg-green-400 hover:text-black'
          }`}
        >
          {connected ? '> CONNECTED' : '> CONNECT'}
        </button>
      </div>
    </div>
  );
}
