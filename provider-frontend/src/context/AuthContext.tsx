import React, { createContext, useContext, useState, useEffect } from 'react';
import { providerLogin, getProviderSession, type ProviderSession } from '../api/auth';
import { apiClient } from '../api/client';

interface AuthContextType {
  token: string | null;
  user: ProviderSession | null;
  loading: boolean;
  isVerified: boolean | null; // null = unknown/loading, true/false = known
  login: (email: string, pass: string) => Promise<void>;
  setAuthSession: (token: string, user: ProviderSession) => void;
  logout: () => void;
  refreshVerificationStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('smartserve_provider_token'));
  const [user, setUser] = useState<ProviderSession | null>(() => {
    const raw = localStorage.getItem('smartserve_provider_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [isVerified, setIsVerified] = useState<boolean | null>(() => {
    const raw = localStorage.getItem('smartserve_provider_verified');
    return raw !== null ? raw === 'true' : null;
  });
  const [loading, setLoading] = useState(true);

  const fetchVerificationStatus = async () => {
    try {
      const res = await apiClient.get('/providers/me/status');
      const verified: boolean = res.data.is_verified === true;
      setIsVerified(verified);
      localStorage.setItem('smartserve_provider_verified', String(verified));
    } catch {
      // If fetch fails, keep whatever we had cached
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('smartserve_provider_token');
      if (storedToken) {
        try {
          const session = await getProviderSession();
          setUser(session);
          localStorage.setItem('smartserve_provider_user', JSON.stringify(session));
          // Fetch actual verification status from database
          await fetchVerificationStatus();
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    const data = await providerLogin(email, pass);
    localStorage.setItem('smartserve_provider_token', data.access_token);
    setToken(data.access_token);
    const session: ProviderSession = {
      user_id: data.user_id,
      email: data.email,
      role: data.role,
      role_name: data.role_name,
      permissions: data.permissions,
      is_active: true,
    };
    setUser(session);
    localStorage.setItem('smartserve_provider_user', JSON.stringify(session));
    // Fetch verification status after login
    await fetchVerificationStatus();
  };

  const setAuthSession = (newToken: string, newSession: ProviderSession) => {
    localStorage.setItem('smartserve_provider_token', newToken);
    localStorage.setItem('smartserve_provider_user', JSON.stringify(newSession));
    setToken(newToken);
    setUser(newSession);
    // Newly onboarded providers start as not verified
    setIsVerified(false);
    localStorage.setItem('smartserve_provider_verified', 'false');
  };

  const logout = () => {
    localStorage.removeItem('smartserve_provider_token');
    localStorage.removeItem('smartserve_provider_user');
    localStorage.removeItem('smartserve_provider_verified');
    setToken(null);
    setUser(null);
    setIsVerified(null);
  };

  const refreshVerificationStatus = async () => {
    await fetchVerificationStatus();
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, isVerified, login, setAuthSession, logout, refreshVerificationStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
