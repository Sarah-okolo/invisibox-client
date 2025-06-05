import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axiosInstance';

export interface VerifyAnonymousEmailRequest {
  employeeInvisiboxEmail: string;
}

export interface SubscribeRequest {
  email: string;
  invisiboxEmail: string;
}

export interface SendAnonymousMessageRequest {
  from: string;
  subject: string;
  message: string;
}

export interface VerifyAnonymousEmailResponse {
  isValid: boolean;
  message: string;
  companyInvisiboxEmail: string;
  companyName?: string;
}

export interface SubscribeResponse {
  companyName: string;
  employeeInvisiboxEmail: string;
  message: string;
}

export interface SendAnonymousMessageResponse {
  companyName: string;
  message: string;
}

// Employee API functions
export const employeeAPI = {
  verifyAnonymousEmail: async (data: VerifyAnonymousEmailRequest): Promise<VerifyAnonymousEmailResponse> => {
    console.log('Verifying anonymous email:', data);
    const response = await axiosInstance.post('/employees/verify-invisibox-email', data);
    return response.data;
  },

  subscribe: async (data: SubscribeRequest): Promise<SubscribeResponse> => {
    console.log('Subscribing employee:', data);
    const response = await axiosInstance.post('/employees/subscribe', data);
    return response.data;
  },

  sendAnonymousMessage: async (data: SendAnonymousMessageRequest): Promise<SendAnonymousMessageResponse> => {
    console.log('Sending anonymous message:', data);
    const response = await axiosInstance.post('/employees/send-anonymous-message', data);
    return response.data;
  },
};

export const useVerifyAnonymousEmailMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: VerifyAnonymousEmailRequest) => employeeAPI.verifyAnonymousEmail(data),
    onSuccess: (response: VerifyAnonymousEmailResponse) => {
      console.log('Email verification response:', response);
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
      console.error('Email verification error:', error);
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
      console.log('Subscription response:', response);
      toast({
        title: "Subscription successful!",
        description: `You have been subscribed. `,
      });
    },
    onError: (error: any) => {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.response?.data?.message || "There was an error processing your subscription.",
        variant: "destructive",
      });
    },
  });
};

export const useSendAnonymousMessageMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: SendAnonymousMessageRequest) => employeeAPI.sendAnonymousMessage(data),
    onSuccess: (response: SendAnonymousMessageResponse) => {
      console.log('Send message response:', response);
      toast({
        title: "Message sent",
        description: response.message || "Your anonymous message has been delivered to the company.",
      });
    },
    onError: (error: any) => {
      console.error('Send message error:', error);
      toast({
        title: "Failed to send message",
        description: error.response?.data?.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });
};
