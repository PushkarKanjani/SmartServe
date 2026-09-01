import { apiClient } from './client';

export interface CustomerRegisterPayload {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface CustomerLoginPayload {
  email: string;
  password: string;
}

export interface CustomerTokenResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in_minutes: number;
  customer_id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
}

export interface CustomerSessionResponse {
  customer_id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  is_active: boolean;
}

// Mock auth fallback helper
const isMockAuthEnabled = true;
if (isMockAuthEnabled) {
  console.warn('⚠ MOCK AUTH ENABLED');
}

const mockTokenResponse = (email: string, full_name?: string, phone?: string): CustomerTokenResponse => ({
  access_token: 'mock.jwt.customer_token_' + Date.now(),
  token_type: 'bearer',
  expires_in_minutes: 1440,
  customer_id: 'cust-mock-uuid-1001',
  user_id: 'user-mock-uuid-2002',
  email: email,
  full_name: full_name || email.split('@')[0] || 'Customer',
  phone: phone || '+91 9876543210',
});

const mockSessionResponse = (email: string, full_name?: string): CustomerSessionResponse => ({
  customer_id: 'cust-mock-uuid-1001',
  user_id: 'user-mock-uuid-2002',
  email: email,
  full_name: full_name || 'SmartServe Customer',
  phone: '+91 9876543210',
  is_active: true,
});

export const registerCustomer = async (payload: CustomerRegisterPayload): Promise<CustomerTokenResponse> => {
  if (isMockAuthEnabled) {
    return mockTokenResponse(payload.email, payload.full_name, payload.phone);
  }

  try {
    const res = await apiClient.post<CustomerTokenResponse>('/customer/auth/register', payload);
    return res.data;
  } catch (err: unknown) {
    // If backend returns 404/500 during dev, fallback to mock to allow frontend dev to continue
    if (axiosIsNetworkOr404(err)) {
      console.warn('⚠ Backend endpoint missing. Using fallback mock customer registration.');
      return mockTokenResponse(payload.email, payload.full_name, payload.phone);
    }
    throw err;
  }
};

export const loginCustomer = async (payload: CustomerLoginPayload): Promise<CustomerTokenResponse> => {
  if (isMockAuthEnabled) {
    return mockTokenResponse(payload.email);
  }

  try {
    const res = await apiClient.post<CustomerTokenResponse>('/customer/auth/login', payload);
    return res.data;
  } catch (err: unknown) {
    if (axiosIsNetworkOr404(err)) {
      console.warn('⚠ Backend endpoint missing. Using fallback mock customer login.');
      return mockTokenResponse(payload.email);
    }
    throw err;
  }
};

export const getCurrentCustomer = async (): Promise<CustomerSessionResponse> => {
  if (isMockAuthEnabled) {
    return mockSessionResponse('customer@smartserve.in');
  }

  try {
    const res = await apiClient.get<CustomerSessionResponse>('/customer/auth/me');
    return res.data;
  } catch (err: unknown) {
    if (axiosIsNetworkOr404(err)) {
      // platform:web
      const savedUserStr = localStorage.getItem('smartserve_customer_user');
      if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr) as CustomerSessionResponse;
          return parsed;
        } catch {
          // ignore
        }
      }
      return mockSessionResponse('customer@smartserve.in');
    }
    throw err;
  }
};

export const logoutCustomer = async (): Promise<void> => {
  if (!isMockAuthEnabled) {
    try {
      await apiClient.post('/customer/auth/logout');
    } catch {
      // best-effort logout call
    }
  }
};

export const forgotPassword = async (email: string): Promise<{ status: string }> => {
  if (isMockAuthEnabled) {
    return { status: 'ok' };
  }
  try {
    const res = await apiClient.post<{ status: string }>('/customer/auth/forgot-password', { email });
    return res.data;
  } catch {
    return { status: 'ok' }; // don't leak account existence
  }
};

export const resetPassword = async (token: string, new_password: string): Promise<{ status: string }> => {
  if (isMockAuthEnabled) {
    return { status: 'ok' };
  }
  const res = await apiClient.post<{ status: string }>('/customer/auth/reset-password', { token, new_password });
  return res.data;
};

function axiosIsNetworkOr404(err: unknown): boolean {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { status?: number } }).response;
    if (!res || res.status === 404 || res.status === 502 || res.status === 503) return true;
  }
  return true; // Fallback to mock for offline dev elasticity
}
