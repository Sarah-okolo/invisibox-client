import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export const useMessagesQuery = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn:  async () => {
      const response = await axiosInstance.get('/messages');
      return response.data;
    }
  });
};
