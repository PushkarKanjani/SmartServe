import { FC, ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CustomerSessionResponse,
  CustomerLoginPayload,
  CustomerRegisterPayload,
  loginCustomer,
  registerCustomer,
  getCurrentCustomer,
  logoutCustomer,
} from '../api/auth';

interface AuthContextType {
  customer: CustomerSessionResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: CustomerLoginPayload) => Promise<void>;
  register: (payload: CustomerRegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<CustomerSessionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshCustomer = useCallback(async () => {
    // platform:web
    const token = localStorage.getItem('smartserve_customer_token');
    if (!token) {
      setCustomer(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await getCurrentCustomer();
      setCustomer(data);
      // platform:web
      localStorage.setItem('smartserve_customer_user', JSON.stringify(data));
    } catch {
      setCustomer(null);
      // platform:web
      localStorage.removeItem('smartserve_customer_token');
      localStorage.removeItem('smartserve_customer_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCustomer();
  }, [refreshCustomer]);

  const login = async (payload: CustomerLoginPayload) => {
    setIsLoading(true);
    try {
      const tokenRes = await loginCustomer(payload);
      // platform:web
      localStorage.setItem('smartserve_customer_token', tokenRes.access_token);
      const sessionData: CustomerSessionResponse = {
        customer_id: tokenRes.customer_id,
        user_id: tokenRes.user_id,
        email: tokenRes.email,
        full_name: tokenRes.full_name,
        phone: tokenRes.phone,
        is_active: true,
      };
      // platform:web
      localStorage.setItem('smartserve_customer_user', JSON.stringify(sessionData));
      setCustomer(sessionData);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: CustomerRegisterPayload) => {
    setIsLoading(true);
    try {
      const tokenRes = await registerCustomer(payload);
      // platform:web
      localStorage.setItem('smartserve_customer_token', tokenRes.access_token);
      const sessionData: CustomerSessionResponse = {
        customer_id: tokenRes.customer_id,
        user_id: tokenRes.user_id,
        email: tokenRes.email,
        full_name: tokenRes.full_name,
        phone: tokenRes.phone,
        is_active: true,
      };
      // platform:web
      localStorage.setItem('smartserve_customer_user', JSON.stringify(sessionData));
      setCustomer(sessionData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutCustomer();
    } finally {
      // platform:web
      localStorage.removeItem('smartserve_customer_token');
      localStorage.removeItem('smartserve_customer_user');
      setCustomer(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        isLoading,
        login,
        register,
        logout,
        refreshCustomer,
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
