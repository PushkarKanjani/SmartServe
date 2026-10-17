import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSecureItem, getSecureItem, removeSecureItem } from '../utils/secureStore';
import { authApi, CustomerTokenResponse } from '../api/auth';

interface AuthContextType {
  user: CustomerTokenResponse | null;
  isLoading: boolean;
  login: (email: string, pass: string, totp_code?: string, recovery_code?: string) => Promise<void>;
  register: (fullName: string, email: string, pass: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomerTokenResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const stored = await AsyncStorage.getItem('smartserve_user');
      const token = await getSecureItem('smartserve_token');
      if (stored && token) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string, totp_code?: string, recovery_code?: string) => {
    const data = await authApi.login(email, pass, totp_code, recovery_code);
    await setSecureItem('smartserve_token', data.access_token);
    await AsyncStorage.setItem('smartserve_user', JSON.stringify(data));
    setUser(data);
  };

  const register = async (fullName: string, email: string, pass: string, phone?: string) => {
    const data = await authApi.register({ full_name: fullName, email, password: pass, phone });
    await setSecureItem('smartserve_token', data.access_token);
    await AsyncStorage.setItem('smartserve_user', JSON.stringify(data));
    setUser(data);
  };

  const logout = async () => {
    try {
      await authApi.logout();
      await removeSecureItem('smartserve_token');
      await AsyncStorage.removeItem('smartserve_user');
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
