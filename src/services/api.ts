
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // This would be your actual API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('invisibox_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        config.headers.Authorization = `Bearer ${userData.token}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('invisibox_user');
      window.location.href = '/management/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  companyName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface User {
  id: string;
  email: string;
  companyName: string;
  token?: string;
}

// Auth API functions
export const authAPI = {
  login: async (data: LoginRequest): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: '1',
      email: data.email,
      companyName: 'Demo Company',
      token: 'mock-jwt-token'
    };
  },

  signup: async (data: SignupRequest): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: '1',
      email: data.email,
      companyName: data.companyName,
      token: 'mock-jwt-token'
    };
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
};

export default api;
