
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axiosInstance';

export interface VerifyAnonymousEmailRequest {
  anonymousEmail: string;
}

export interface SubscribeRequest {
  employeeEmail: string;
  companyInvisiboxEmail: string;
}

export interface VerifyAnonymousEmailResponse {
  isValid: boolean;
  message: string;
}

export interface SubscribeResponse {
  anonymousEmail: string;
  message: string;
}

// Employee API functions
export const employeeAPI = {
  verifyAnonymousEmail: async (data: VerifyAnonymousEmailRequest): Promise<VerifyAnonymousEmailResponse> => {
    const response = await axiosInstance.post('/employees/verify-invisibox-email', data);
    return response.data;
  },

  subscribe: async (data: SubscribeRequest): Promise<SubscribeResponse> => {
    const response = await axiosInstance.post('/employees/subscribe', data);
    return response.data;
  },
};

export const useVerifyAnonymousEmailMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: VerifyAnonymousEmailRequest) => employeeAPI.verifyAnonymousEmail(data),
    onSuccess: (response: VerifyAnonymousEmailResponse) => {
      if (response.isValid) {
        toast({
          title: "Email verified",
          description: response.message || "You can now send an anonymous message.",
        });
      } else {
        toast({
          title: "Invalid email",
          description: response.message || "This doesn't appear to be a valid InvisiBox anonymous email.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Verification failed",
        description: error.response?.data?.message || "There was an error verifying your anonymous email.",
        variant: "destructive",
      });
    },
  });
};

export const useSubscribeMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: SubscribeRequest) => employeeAPI.subscribe(data),
    onSuccess: (response: SubscribeResponse) => {
      toast({
        title: "Subscription successful!",
        description: `You have been subscribed. Your anonymous email is: ${response.anonymousEmail}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.response?.data?.message || "There was an error processing your subscription.",
        variant: "destructive",
      });
    },
  });
};
