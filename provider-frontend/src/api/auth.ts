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

export const providerLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginResponse>('/auth/login', { email, password });
  return res.data;
};

export const getProviderSession = async (): Promise<ProviderSession> => {
  const res = await apiClient.get<ProviderSession>('/auth/me');
  return res.data;
};
