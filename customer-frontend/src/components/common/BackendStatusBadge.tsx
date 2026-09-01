import { FC, useState } from 'react';
import { useBackendStatus } from '../../hooks/useBackendStatus';
import { Activity, RefreshCw } from 'lucide-react';

export const BackendStatusBadge: FC = () => {
  if (!import.meta.env.DEV) return null;

  const { status, loading, refresh } = useBackendStatus();
  const [expanded, setExpanded] = useState(false);

  if (loading && !status) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-lg animate-pulse">
        <Activity className="h-3.5 w-3.5 text-slate-400 animate-spin" />
        <span>Checking backend status...</span>
      </div>
    );
  }

  const exposed = status?.customerEndpointsExposed || 0;
  const expected = status?.customerEndpointsExpected || 7;
  const isFullyLive = exposed === expected;

  const badgeBg = !status?.reachable
    ? 'bg-rose-50 border-rose-200 text-rose-800'
    : isFullyLive
    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
    : 'bg-amber-50 border-amber-200 text-amber-900';

  const dotBg = !status?.reachable
    ? 'bg-rose-500'
    : isFullyLive
    ? 'bg-emerald-500'
    : 'bg-amber-500';

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      <div
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold shadow-lg cursor-pointer transition hover:scale-105 ${badgeBg}`}
      >
        <span className={`h-2.5 w-2.5 rounded-full ${dotBg} animate-pulse`} />
        <span>
          {!status?.reachable
            ? '🔴 Backend Unreachable — Mock Active'
            : isFullyLive
            ? `🟢 Backend Live (${exposed}/${expected} Endpoints)`
            : `🟡 Backend Live (${exposed}/${expected} Endpoints — Mock Fallback Active)`}
        </span>
      </div>

      {expanded && (
        <div className="absolute bottom-10 right-0 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl text-xs space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-extrabold text-slate-900">Backend Connection Pulse</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                refresh();
              }}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              title="Refresh health check"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-1 text-slate-600">
            <p>
              <span className="font-semibold text-slate-800">API Host:</span>{' '}
              {import.meta.env.VITE_API_BASE_URL}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Status:</span>{' '}
              {status?.reachable ? 'Reachable' : 'Offline / 404'}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Customer Endpoints Live:</span>{' '}
              {exposed} of {expected}
            </p>
            {status?.latencyMs && (
              <p>
                <span className="font-semibold text-slate-800">Latency:</span> {status.latencyMs} ms
              </p>
            )}
            <p className="text-[11px] text-slate-400 pt-1">
              Last checked: {status?.lastCheckedAt ? new Date(status.lastCheckedAt).toLocaleTimeString() : 'Never'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
