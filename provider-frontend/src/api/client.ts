import axios from 'axios';

export function getApiBaseUrl(): string {
  // 1. Browser runtime host detection (Mobile / LAN / Cloud):
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const hostname = window.location.hostname;
    // Production cloud deployment on Vercel
    if (hostname.includes('vercel.app')) {
      return 'https://smartserve-api-de3f.onrender.com/api/v1';
    }
    // HTTPS local/LAN access (e.g. port 5176 SSL reverse proxy) - use same origin to prevent mixed content
    if (window.location.protocol === 'https:') {
      return `${window.location.origin}/api/v1`;
    }
    // Mobile / Local network (172.x, 192.168.x, 10.x, etc.)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `http://${hostname}:8000/api/v1`;
    }
  }

  // 2. Explicit configured URL (for localhost development)
  const configuredUrl = import.meta.env.VITE_API_BASE_URL;
  if (configuredUrl && typeof configuredUrl === 'string' && configuredUrl.trim() !== '') {
    return configuredUrl.trim().replace(/\/$/, '');
  }

  return 'http://127.0.0.1:8000/api/v1';
}

export const baseURL = getApiBaseUrl();

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000,
});

apiClient.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  const token = localStorage.getItem('smartserve_provider_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as any;
    if (config && (!error.response || [502, 503, 504].includes(error.response?.status))) {
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount < 3) {
        config.__retryCount += 1;
        const delay = Math.min(1000 * Math.pow(2, config.__retryCount - 1), 3000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return apiClient(config);
      }
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('smartserve_provider_token');
      localStorage.removeItem('smartserve_provider_user');
    }
    return Promise.reject(error);
  }
);
