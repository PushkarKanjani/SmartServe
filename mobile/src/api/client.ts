import axios from 'axios';
import { getSecureItem } from '../utils/secureStore';
import { API_BASE_URL } from '../config/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await getSecureItem('smartserve_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Avoid logging sensitive token data
  }
  return config;
});

export default apiClient;
