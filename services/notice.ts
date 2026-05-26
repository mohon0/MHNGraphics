import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

export function useNotice(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: ['notices', page, pageSize],
    queryFn: async () => {
      const response = await apiClient.get(
        `/api/notice?page=${page}&pageSize=${pageSize}`,
      );
      return response.data;
    },
  });
}

interface UseUploadNoticeOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useUploadNotice({
  onSuccess,
  onError,
}: UseUploadNoticeOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/api/notice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      onSuccess?.();
    },
    onError: (error) => {
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
      const response = await apiClient.delete('/api/notice', {
        params: { id },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
