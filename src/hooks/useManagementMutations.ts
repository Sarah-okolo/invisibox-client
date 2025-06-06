
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

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

export interface SendMessageRequest {
  title: string;
  content: string;
  // tags: string[]; // MVP v2 feature
  // attachment?: File; // MVP v2 feature
}

export interface SendMessageResponse {
  message: string;
  messageId: string;
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

  sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
    console.log('Sending message:', data);
    const response = await axiosInstance.post('/messages', data);
    return response.data;
  },
};

// This mutation is used to warn a subscriber
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

// This mutation is used to ban a subscriber from the system
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

// This mutation is used to create a new poll
export const useDeletePollMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (pollId: string) => {
      const response = await axiosInstance.delete(`/polls/${pollId}`);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Poll deleted successfully",
        description: "The poll has been permanently removed.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      queryClient.invalidateQueries({ queryKey: ['polls'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting poll",
        description: error.response?.data?.message || "Failed to delete poll. Please try again.",
        variant: "destructive",
      });
    },
  });
};


// This mutation is used to share poll results with all employees
export const useSharePollResultsMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ pollData, imageBlob }: { pollData: any; imageBlob: Blob }) => {
      const formData = new FormData();
      formData.append('title', pollData.title);
      formData.append('question', pollData.question);
      formData.append('resultImage', imageBlob, `poll-results-${pollData.id}.png`);

      const response = await axiosInstance.post('/polls/share-result', formData, {
        headers: {
          'Content-Type': 'undefined', // Let axios set the correct boundary
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Results shared successfully",
        description: "Poll results have been shared with all employees.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      navigate('/management/polls');
    },
    onError: (error: any) => {
      toast({
        title: "Error sharing results",
        description: error.response?.data?.message || "Failed to share poll results. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// This mutation is used to send a message to all subscribers
export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SendMessageRequest) => {
      return managementAPI.sendMessage(data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully",
        description: "Your message has been sent to all subscribers.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      navigate('/management/messages'); // Redirect to messages page after sending
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.response?.data?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });
};
