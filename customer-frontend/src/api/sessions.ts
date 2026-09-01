import { apiClient } from './client';

export interface UserSession {
  id: string;
  device_name: string;
  browser: string;
  ip_address: string;
  last_active: string;
  is_current: boolean;
}

// platform:web
const SESSIONS_KEY = 'smartserve_customer_sessions_store';

const getInitialSessions = (): UserSession[] => {
  // platform:web
  const stored = localStorage.getItem(SESSIONS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as UserSession[];
    } catch {
      // ignore
    }
  }

  const defaultSessions: UserSession[] = [
    {
      id: 'sess-1',
      device_name: 'Windows PC (Chrome)',
      browser: 'Chrome 128.0',
      ip_address: '103.21.124.89 (Noida, India)',
      last_active: 'Active now',
      is_current: true,
    },
    {
      id: 'sess-2',
      device_name: 'iPhone 14 (SmartServe App)',
      browser: 'Expo Mobile App 2.1',
      ip_address: '49.36.192.12 (Delhi, India)',
      last_active: '2 hours ago',
      is_current: false,
    },
    {
      id: 'sess-3',
      device_name: 'MacBook Pro (Safari)',
      browser: 'Safari 17.4',
      ip_address: '115.242.88.10 (Gurugram, India)',
      last_active: '3 days ago',
      is_current: false,
    },
  ];

  localStorage.setItem(SESSIONS_KEY, JSON.stringify(defaultSessions));
  return defaultSessions;
};

const saveSessions = (sessions: UserSession[]) => {
  // platform:web
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getActiveSessions = async (): Promise<UserSession[]> => {
  try {
    const res = await apiClient.get<UserSession[]>('/customer/sessions');
    return res.data;
  } catch {
    return getInitialSessions();
  }
};

export const revokeSession = async (sessionId: string): Promise<void> => {
  try {
    await apiClient.post(`/customer/sessions/${sessionId}/revoke`);
  } catch {
    const current = getInitialSessions();
    const updated = current.filter((s) => s.id !== sessionId);
    saveSessions(updated);
  }
};

export const revokeAllOtherSessions = async (): Promise<void> => {
  try {
    await apiClient.post('/customer/sessions/revoke-all');
  } catch {
    const current = getInitialSessions();
    const updated = current.filter((s) => s.is_current);
    saveSessions(updated);
  }
};
