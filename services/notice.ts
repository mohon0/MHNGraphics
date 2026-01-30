import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useNotice(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: ['notices', page, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `/api/notice?page=${page}&pageSize=${pageSize}`,
      );
      return response.data;
    },
  });
}

import { useMutation } from '@tanstack/react-query';

interface UseUploadNoticeOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useUploadNotice({
  onSuccess,
  onError,
}: UseUploadNoticeOptions = {}) {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/notice', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload notice');
      }

      return response.json();
    },
    onMutate: () => {
      // Return context that will be passed to onSuccess/onError
      return {};
    },
    onSuccess: () => {
      // Call custom onSuccess callback
      onSuccess?.();
    },
    onError: (error) => {
      // Call custom onError callback
      onError?.(error);
    },
  });
}
interface UseDeleteNoticeOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useDeleteNotice({
  onSuccess,
  onError,
}: UseDeleteNoticeOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete('/api/notice', { params: { id } });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch notices query to update the UI
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
