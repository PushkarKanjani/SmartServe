import { apiClient } from './client';

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in_minutes: number;
  user_id: string;
  email: string;
  role: string;
  role_name: string;
  permissions: string[];
}

export interface ProviderSession {
  user_id: string;
  email: string;
  role: string;
  role_name: string;
  permissions: string[];
  is_active: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  totp_code?: string;
  recovery_code?: string;
}

export const providerLogin = async (
  email: string,
  password: string,
  totp_code?: string,
  recovery_code?: string
): Promise<LoginResponse> => {
  const payload: LoginPayload = {
    email,
    password,
    ...(totp_code ? { totp_code } : {}),
    ...(recovery_code ? { recovery_code } : {}),
  };
  const res = await apiClient.post<LoginResponse>('/auth/login', payload);
  return res.data;
};

export const getProviderSession = async (): Promise<ProviderSession> => {
  const res = await apiClient.get<ProviderSession>('/auth/me');
  return res.data;
};

export const providerLogout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch {
    // Graceful offline fallback
  }
};
