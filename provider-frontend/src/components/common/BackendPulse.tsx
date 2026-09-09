import React, { useEffect, useState } from 'react';
import { apiClient } from '../../api/client';
import { Activity, RefreshCw } from 'lucide-react';

export const BackendPulse: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [checking, setChecking] = useState<boolean>(false);

  const runHealthCheck = async () => {
    setChecking(true);
    try {
      // Base API ping
      const res = await apiClient.get('/auth/me').catch((err) => {
        // If 401, backend is online!
        if (err.response && err.response.status === 401) {
          return { status: 200 };
        }
        throw err;
      });
      setIsOnline(res.status >= 200 && res.status < 500);
    } catch {
      setIsOnline(false);
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
      title={`Local FastAPI Backend Status: ${isOnline ? 'Online' : 'Offline'}`}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-[#E5DEC9] text-xs font-semibold text-[#1F2A1E]/80 cursor-pointer hover:bg-[#F2EDE1] transition-all select-none shadow-2xs"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isOnline ? 'bg-emerald-400' : 'bg-rose-400'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isOnline ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />
      </span>

      <span className="font-mono text-[11px] text-[#1F2A1E]/70 hidden sm:inline">
        {checking ? 'Checking Backend...' : isOnline ? 'Backend Live' : 'Backend Disconnected'}
      </span>

      <Activity className="w-3.5 h-3.5 text-[#1F2A1E]/40" />
      {checking && <RefreshCw className="w-3 h-3 animate-spin text-[#2F5233] ml-0.5" />}
    </div>
  );
};

export default BackendPulse;
