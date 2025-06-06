
import { useQuery } from '@tanstack/react-query';
import { managementAPI } from './useManagementMutations';

export const useMessagesQuery = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: managementAPI.getMessages,
  });
};
