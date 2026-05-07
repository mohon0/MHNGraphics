import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constant/QueryKeys';
import apiClient from '@/lib/apiClient';

export function useAdminHeroBanners() {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_HERO_BANNER],
    queryFn: async () => {
      const response = await axios.get('/api/admin/banner/hero/all');
      return response.data;
    },
  });
}

export function useHeroBanners() {
  return useQuery({
    queryKey: [QUERY_KEYS.HERO_BANNER],
    queryFn: async () => {
      const response = await axios.get('/api/hero');
      return response.data;
    },
  });
}

export function useAddHeroBanner(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await apiClient.post(
        '/api/admin/banner/hero',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HERO_BANNER] });
      toast.success(data.message || 'Banner created successfully! ✨');
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Failed to create banner ❌',
        );
      } else {
        toast.error('An unexpected error occurred.');
      }
    },
  });
}

export function useDeleteHeroBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const deletePromise = apiClient
        .delete<{
          message: string;
        }>(`/api/admin/banner/hero/${id}`)
        .then((res) => res.data); // Unwrap response before passing to toast

      return toast.promise(deletePromise, {
        loading: 'Deleting Banner...',
        success: (data) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.HERO_BANNER],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADMIN_HERO_BANNER],
          });

          return data.message || 'Design deleted successfully ✅';
        },
        error: (error) =>
          axios.isAxiosError(error)
            ? error.response?.data?.message || 'Failed to delete design ❌'
            : 'Something went wrong. Please try again.',
      });
    },
  });
}
