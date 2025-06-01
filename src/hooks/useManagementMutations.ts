
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axiosInstance';

export interface BanSubscriberRequest {
  subscriberId: string;
  reason: string;
}

export interface BanSubscriberResponse {
  message: string;
  bannedEmail: string;
}

export const managementAPI = {
  banSubscriber: async (data: BanSubscriberRequest): Promise<BanSubscriberResponse> => {
    console.log('Banning subscriber:', data);
    const response = await axiosInstance.post('/management/ban-subscriber', data);
    return response.data;
  },
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
