import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axiosInstance';

export interface WarnSubscriberRequest {
  subscriberId: string;
  reason: string;
  details: string;
}

export interface BanSubscriberRequest {
  subscriberId: string;
  reason: string;
  details: string;
}

export interface WarnSubscriberResponse {
  message: string;
  warnedEmail: string;
}

export interface BanSubscriberResponse {
  message: string;
  bannedEmail: string;
}

export const managementAPI = {
  warnSubscriber: async (data: WarnSubscriberRequest): Promise<WarnSubscriberResponse> => {
    console.log('Warning subscriber:', data);
    const response = await axiosInstance.post(`/subscribers/${data.subscriberId}/warn`, {
      reason: data.reason,
      details: data.details
    });
    return response.data;
  },
  
  banSubscriber: async (data: BanSubscriberRequest): Promise<BanSubscriberResponse> => {
    console.log('Banning subscriber:', data);
    const response = await axiosInstance.post(`/subscribers/${data.subscriberId}/ban`, {
      reason: data.reason,
      details: data.details
    });
    return response.data;
  },
};

export const useWarnSubscriberMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ subscriberId, reason, details }: { subscriberId: string; reason: string; details: string }) => {
      const response = await axiosInstance.post(`/subscribers/${subscriberId}/warn`, {
        reason,
        details,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Subscriber warned successfully",
        description: "The warning has been sent to the subscriber.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error warning subscriber",
        description: error.response?.data?.message || "Failed to warn subscriber. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useBanSubscriberMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ subscriberId, reason, details }: { subscriberId: string; reason: string; details: string }) => {
      const response = await axiosInstance.post(`/subscribers/${subscriberId}/ban`, {
        reason,
        details,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Subscriber banned successfully",
        description: "The subscriber has been banned from your system.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error banning subscriber",
        description: error.response?.data?.message || "Failed to ban subscriber. Please try again.",
        variant: "destructive",
      });
    },
  });
};
