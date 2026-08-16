export type UserRole = 'customer' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  status?: string;
  is_verified?: boolean;
  reliability_score?: number;
  created_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
  full_name: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  user?: User;
}

export interface ApiErrorResponse {
  detail?: string | { msg: string; type: string }[];
  message?: string;
}
