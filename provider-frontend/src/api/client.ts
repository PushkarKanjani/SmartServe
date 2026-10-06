import axios from 'axios';

const configuredUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = configuredUrl && configuredUrl.trim() !== ''
  ? configuredUrl.trim().replace(/\/$/, '')
  : (import.meta.env.PROD || (typeof window !== 'undefined' && window.location && window.location.hostname.includes('vercel.app')))
    ? 'https://smartserve-api-de3f.onrender.com/api/v1'
    : 'http://127.0.0.1:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('smartserve_provider_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('smartserve_provider_token');
      localStorage.removeItem('smartserve_provider_user');
    }
    return Promise.reject(error);
  }
);
