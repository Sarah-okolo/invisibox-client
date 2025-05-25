
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setCookie, getCookie, deleteCookie } from '@/lib/cookieUtils';

export interface User {
  id: string;
  email: string;
  companyName: string;
  invisiboxEmail: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showWelcomeModal: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
  setLoading: (loading: boolean) => void;
  setShowWelcomeModal: (show: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      showWelcomeModal: false,

      setUser: (user: User, token: string) => {
        setCookie('auth_token', token, 7, true);
        setCookie('user_data', JSON.stringify(user), 7, true);
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        deleteCookie('auth_token');
        deleteCookie('user_data');
        set({ user: null, isAuthenticated: false, showWelcomeModal: false });
      },

      initializeAuth: () => {
        set({ isLoading: true });
        const userData = getCookie('user_data', true);
        const token = getCookie('auth_token', true);
        
        if (userData && token) {
          try {
            const user = JSON.parse(userData);
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error) {
            console.error('Error parsing user data:', error);
            get().logout();
            set({ isLoading: false });
          }
        } else {
          set({ isLoading: false });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setShowWelcomeModal: (show: boolean) => {
        set({ showWelcomeModal: show });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({}), // Don't persist anything to localStorage
    }
  )
);
