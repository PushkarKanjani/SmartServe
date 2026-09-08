import React, { createContext, useContext, useState, useEffect } from 'react';
import { providerLogin, getProviderSession, type ProviderSession } from '../api/auth';

interface AuthContextType {
  token: string | null;
  user: ProviderSession | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  setAuthSession: (token: string, user: ProviderSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('smartserve_provider_token'));
  const [user, setUser] = useState<ProviderSession | null>(() => {
    const raw = localStorage.getItem('smartserve_provider_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('smartserve_provider_token');
      if (storedToken) {
        try {
          const session = await getProviderSession();
          setUser(session);
          localStorage.setItem('smartserve_provider_user', JSON.stringify(session));
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
  };

  const setAuthSession = (newToken: string, newSession: ProviderSession) => {
    localStorage.setItem('smartserve_provider_token', newToken);
    localStorage.setItem('smartserve_provider_user', JSON.stringify(newSession));
    setToken(newToken);
    setUser(newSession);
  };

  const logout = () => {
    localStorage.removeItem('smartserve_provider_token');
    localStorage.removeItem('smartserve_provider_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, setAuthSession, logout }}>
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
