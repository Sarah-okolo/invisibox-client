
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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WarnSubscriberRequest) => managementAPI.warnSubscriber(data),
    onSuccess: (response: WarnSubscriberResponse) => {
      console.log('Warn subscriber response:', response);
      toast({
        title: "Subscriber warned",
        description: `${response.warnedEmail} has been warned successfully.`,
      });
      // Invalidate subscribers query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
    onError: (error: any) => {
      console.error('Warn subscriber error:', error);
      toast({
        title: "Failed to warn subscriber",
        description: error.response?.data?.message || "There was an error warning the subscriber.",
        variant: "destructive",
      });
    },
  });
};

export const useBanSubscriberMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BanSubscriberRequest) => managementAPI.banSubscriber(data),
    onSuccess: (response: BanSubscriberResponse) => {
      console.log('Ban subscriber response:', response);
      toast({
        title: "Subscriber banned",
        description: `${response.bannedEmail} has been banned and can no longer send messages.`,
      });
      // Invalidate subscribers query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
    onError: (error: any) => {
      console.error('Ban subscriber error:', error);
      toast({
        title: "Failed to ban subscriber",
        description: error.response?.data?.message || "There was an error banning the subscriber.",
        variant: "destructive",
      });
    },
  });
};
