import apiClient from './client';

export interface CustomerRegisterPayload {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  preferences?: string[];
}

export interface CustomerTokenResponse {
  access_token: string;
  customer_id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone: string;
  token_type?: string;
}

export const authApi = {
  /** POST /customer/auth/login */
  login: async (
    email: string,
    password: string,
    totp_code?: string,
    recovery_code?: string
  ): Promise<CustomerTokenResponse> => {
    const res = await apiClient.post<CustomerTokenResponse>('/customer/auth/login', {
      email,
      password,
      ...(totp_code ? { totp_code } : {}),
      ...(recovery_code ? { recovery_code } : {}),
    });
    return res.data;
  },

  /** POST /customer/auth/register */
  register: async (payload: CustomerRegisterPayload): Promise<CustomerTokenResponse> => {
    const res = await apiClient.post<CustomerTokenResponse>('/customer/auth/register', payload);
    return res.data;
  },

  /** GET /customer/auth/me */
  getMe: async (): Promise<CustomerTokenResponse> => {
    const res = await apiClient.get<CustomerTokenResponse>('/customer/auth/me');
    return res.data;
  },

  /** POST /customer/auth/logout */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/customer/auth/logout');
    } catch {
      // offline fallback
    }
  },
};
