import { apiClient } from './client';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/auth';

export const authApi = {
  /**
   * Register a new user (Customer or Provider)
   * POST /api/v1/auth/register
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Authenticate user and obtain JWT tokens
   * POST /api/v1/auth/login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * Fetch profile of the currently authenticated user
   * GET /api/v1/me
   */
  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/me');
    return response.data;
  },

  /**
   * Log out user and revoke session
   * POST /api/v1/auth/logout
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network failures on logout
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_data');
    }
  },
};
