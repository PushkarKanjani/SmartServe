import axios from 'axios';

export function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL;
  if (configuredUrl && typeof configuredUrl === 'string' && configuredUrl.trim() !== '') {
    return configuredUrl.trim().replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel.app')) {
      return 'https://smartserve-api-de3f.onrender.com/api/v1';
    }
    return `http://${hostname}:8000/api/v1`;
  }

  return 'http://127.0.0.1:8000/api/v1';
}

export const baseURL = getApiBaseUrl();

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Interceptor to automatically attach JWT token and ensure dynamic baseURL
apiClient.interceptors.request.use(
  (config) => {
    config.baseURL = getApiBaseUrl();
    const token = localStorage.getItem('smartserve_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle automatic retry on network/cold-start errors & 401/403 responses
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

    if (error.response) {
      const status = error.response.status;
      const detail = String(error.response.data?.detail || '').toLowerCase();
      if (
        status === 401 ||
        (status === 403 && (detail.includes('admin role') || detail.includes('forbidden') || detail.includes('unauthorized')))
      ) {
        localStorage.removeItem('smartserve_token');
        localStorage.removeItem('smartserve_user');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/admin/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
