import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constant/QueryKeys';
import apiClient from '@/lib/apiClient';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface AppRelease {
  id: string;
  platform: 'ANDROID' | 'WINDOWS' | 'IOS' | 'MACOS' | 'LINUX';
  downloadUrl: string;
  version?: string | null;
  isActive: boolean;
}

interface UpsertPayload {
  platform: string;
  downloadUrl: string;
  version?: string;
  isActive: boolean;
}

// ─── Public hook ───────────────────────────────────────────────────────────────

export function useAppReleases() {
  return useQuery<AppRelease[]>({
    queryKey: [QUERY_KEYS.APP_RELEASES],
    queryFn: async () => {
      const response = await axios.get('/api/app-download');
      return response.data;
    },
  });
}

// ─── Admin hooks ───────────────────────────────────────────────────────────────

export function useAdminAppReleases() {
  return useQuery<AppRelease[]>({
    queryKey: [QUERY_KEYS.ADMIN_APP_RELEASES],
    queryFn: async () => {
      const response = await axios.get('/api/admin/app-download');
      return response.data;
    },
  });
}

export function useUpsertAppRelease(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpsertPayload) => {
      const { data } = await apiClient.post('/api/admin/app-download', payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APP_RELEASES] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_APP_RELEASES],
      });
      toast.success(
        data.platform
          ? `${data.platform} release saved successfully! ✨`
          : 'App release saved successfully! ✨',
      );
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Failed to save app release ❌',
        );
      } else {
        toast.error('An unexpected error occurred.');
      }
    },
  });
}

export function useDeleteAppRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const deletePromise = apiClient
        .delete<{ message: string }>(`/api/admin/app-download/${id}`)
        .then((res) => res.data);

      return toast.promise(deletePromise, {
        loading: 'Deleting app release...',
        success: (data) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.APP_RELEASES],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADMIN_APP_RELEASES],
          });
          return data.message || 'App release deleted successfully ✅';
        },
        error: (error) =>
          axios.isAxiosError(error)
            ? error.response?.data?.message || 'Failed to delete app release ❌'
            : 'Something went wrong. Please try again.',
      });
    },
  });
}
