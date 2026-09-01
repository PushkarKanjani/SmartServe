import { useEffect, useState, useCallback } from 'react';
import { checkBackendHealth, BackendHealth } from '../api/health';

const POLL_INTERVAL_MS = 60_000;

export const useBackendStatus = () => {
  const [status, setStatus] = useState<BackendHealth | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const next = await checkBackendHealth();
    setStatus(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [refresh]);

  return { status, loading, refresh };
};
