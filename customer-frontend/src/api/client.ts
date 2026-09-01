import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://smartserve-backend-tr3p.onrender.com/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

// Request interceptor: attach bearer token
apiClient.interceptors.request.use(
  (config) => {
    // platform:web
    const token = localStorage.getItem('smartserve_customer_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 unauthenticated
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // platform:web
      localStorage.removeItem('smartserve_customer_token');
      localStorage.removeItem('smartserve_customer_user');
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);
