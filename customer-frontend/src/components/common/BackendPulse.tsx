import React, { useEffect, useState } from 'react';
import { checkBackendHealth, HealthCheckResult } from '../../api/health';
import { Activity, RefreshCw } from 'lucide-react';

export const BackendPulse: React.FC = () => {
  const [health, setHealth] = useState<HealthCheckResult | null>(null);
  const [checking, setChecking] = useState<boolean>(true);

  const runHealthCheck = async () => {
    setChecking(true);
    try {
      const res = await checkBackendHealth();
      setHealth(res);
    } catch {
      setHealth({
        isOnline: false,
        statusText: 'Offline (Connection Failed)',
        apiReachable: false,
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    runHealthCheck();
    const interval = setInterval(runHealthCheck, 30000); // 30s pulse
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={runHealthCheck}
      title={`Cloud FastAPI Backend Status: ${health?.statusText || 'Checking'} (${health?.apiReachable ? 'Customer API Ready' : 'API Pending'})`}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-200/80 transition-all select-none"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            checking ? 'bg-amber-400' : health?.isOnline ? 'bg-emerald-400' : 'bg-rose-400'
          }`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            checking ? 'bg-amber-500' : health?.isOnline ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        ></span>
      </span>

      <span className="font-mono text-[11px] text-slate-600 hidden sm:inline">
        {checking ? 'Connecting to Network...' : health?.isOnline ? 'Network Active' : 'Reconnecting to Network...'}
      </span>

      <Activity className="w-3.5 h-3.5 text-slate-400" />
      {checking && <RefreshCw className="w-3 h-3 animate-spin text-blue-600 ml-0.5" />}
    </div>
  );
};

export default BackendPulse;
