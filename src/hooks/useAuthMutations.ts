
import { useMutation } from '@tanstack/react-query';
import { authAPI, LoginRequest, SignupRequest, ResetPasswordRequest, User } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useLoginMutation = () => {
  const { setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (user: User) => {
      setUser(user);
      localStorage.setItem('invisibox_user', JSON.stringify(user));
      toast({
        title: "Login successful",
        description: "You've been logged in to your account.",
      });
      navigate('/management/dashboard');
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });
};

export const useSignupMutation = () => {
  const { setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupRequest) => authAPI.signup(data),
    onSuccess: (user: User) => {
      setUser(user);
      localStorage.setItem('invisibox_user', JSON.stringify(user));
      toast({
        title: "Account created",
        description: "Your management account has been successfully created.",
      });
      navigate('/management/dashboard');
    },
    onError: () => {
      toast({
        title: "Signup failed",
        description: "There was an error creating your account. Please try again.",
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
    onError: () => {
      toast({
        title: "Reset failed",
        description: "There was an error sending the reset email. Please try again.",
        variant: "destructive",
      });
    },
  });
};
