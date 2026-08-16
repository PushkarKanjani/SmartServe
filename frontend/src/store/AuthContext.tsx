import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { authApi } from '../api/authApi';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (data: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  setDemoSession: (role: UserRole, email: string, name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('access_token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [role, setRole] = useState<UserRole | null>(() => (localStorage.getItem('user_role') as UserRole) || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        try {
          const profile = await authApi.getMe();
          setUser(profile);
          setRole(profile.role);
          localStorage.setItem('user_role', profile.role);
          localStorage.setItem('user_data', JSON.stringify(profile));
        } catch {
          // If token verification fails (e.g. backend down or expired), retain offline mock user if in dev
          const savedUser = localStorage.getItem('user_data');
          if (savedUser) {
            try {
              const parsed = JSON.parse(savedUser) as User;
              setUser(parsed);
              setRole(parsed.role);
            } catch {
              localStorage.removeItem('access_token');
              setToken(null);
              setUser(null);
              setRole(null);
            }
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const authRes = await authApi.login(credentials);
      setToken(authRes.access_token);
      localStorage.setItem('access_token', authRes.access_token);

      // If backend returns user object in login response
      if (authRes.user) {
        setUser(authRes.user);
        setRole(authRes.user.role);
        localStorage.setItem('user_role', authRes.user.role);
        localStorage.setItem('user_data', JSON.stringify(authRes.user));
      } else {
        // Otherwise fetch /me
        const profile = await authApi.getMe();
        setUser(profile);
        setRole(profile.role);
        localStorage.setItem('user_role', profile.role);
        localStorage.setItem('user_data', JSON.stringify(profile));
      }
      return authRes;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const authRes = await authApi.register(data);
      setToken(authRes.access_token);
      localStorage.setItem('access_token', authRes.access_token);

      const userObj: User = authRes.user || {
        id: 'user-' + Date.now(),
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        phone: data.phone,
        status: 'active',
        created_at: new Date().toISOString(),
      };

      setUser(userObj);
      setRole(userObj.role);
      localStorage.setItem('user_role', userObj.role);
      localStorage.setItem('user_data', JSON.stringify(userObj));

      return authRes;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      setToken(null);
      setUser(null);
      setRole(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_data');
      setIsLoading(false);
    }
  }, []);

  /**
   * Helper to simulate a demo session for UI inspection prior to backend merge
   */
  const setDemoSession = useCallback((demoRole: UserRole, email: string, name: string) => {
    const demoToken = `demo-token-${demoRole}-${Date.now()}`;
    const demoUser: User = {
      id: `demo-${demoRole}-1`,
      email,
      full_name: name,
      role: demoRole,
      status: 'active',
      is_verified: true,
      reliability_score: demoRole === 'provider' ? 96.5 : 98.0,
      created_at: new Date().toISOString(),
    };

    setToken(demoToken);
    setUser(demoUser);
    setRole(demoRole);
    localStorage.setItem('access_token', demoToken);
    localStorage.setItem('user_role', demoRole);
    localStorage.setItem('user_data', JSON.stringify(demoUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        setDemoSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
