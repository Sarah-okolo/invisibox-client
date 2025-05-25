import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';
import axiosInstance from '@/lib/axiosInstance';

export interface LoginRequest {
  invisiboxEmail: string;
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

export interface AuthResponse {
  email: string;
  invisiboxEmail: string;
  companyName: string;
  token: string;
}

// Auth API functions
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await axiosInstance.post('/auth/reset-password', data);
  },
};

export const useLoginMutation = () => {
  const { setUser } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (response: AuthResponse) => {
      const {token, ...user} = response;
      setUser(user, token);
      console.log("User logged in successfully:", response);
      queryClient.clear(); // Clear any existing queries
      toast({
        title: "Login successful",
        description: "You've been logged in to your account.",
      });
      navigate('/management/dashboard');
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Please check your InvisiBox email and password.",
        variant: "destructive",
      });
    },
  });
};

export const useSignupMutation = () => {
  const { setUser, setShowWelcomeModal } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupRequest) => authAPI.signup(data),
    onSuccess: (response: AuthResponse) => {
      const {token, ...user} = response;
      setUser(user, token);
      console.log("User signed up successfully:", response);
      queryClient.clear(); // Clear any existing queries
      setShowWelcomeModal(true);
      navigate('/management/dashboard');
    },
    onError: (error: any) => {
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useResetPasswordMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authAPI.resetPassword(data),
    onSuccess: () => {
      toast({
        title: "Password reset sent",
        description: "Check your email for password reset instructions.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Reset failed",
        description: error.response?.data?.message || "There was an error sending the reset email. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useLogoutMutation = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post('/auth/logout');
    },
    onSettled: () => {
      logout();
      queryClient.clear();
      navigate('/');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
  });
};
