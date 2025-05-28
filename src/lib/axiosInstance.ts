
import axios from 'axios';
import { getCookie, deleteCookie } from '@/lib/cookieUtils';

const baseURL = import.meta.env.VITE_BASE_URL || 'https://invisibox-server-production.up.railway.app/';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // || error.response.status === 403
      // Handle unauthorized or forbidden access
      deleteCookie('auth_token');
      deleteCookie('user_data');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
