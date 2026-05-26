import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { z } from 'zod';
import apiClient from '@/lib/apiClient';
import type { SignUpSchema } from '@/lib/Schemas';

interface VerifyCodePayload {
  userId: string;
  code: string;
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (values: z.infer<typeof SignUpSchema>) => {
      const apiPromise = apiClient
        .post('/api/signup', values)
        .catch((error) => {
          throw new Error(error.response?.data || 'An error occurred');
        });

      toast.promise(apiPromise, {
        loading: 'Processing registration...',
        success: () => {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
          return isEmail
            ? 'Email sent successfully 👌'
            : 'Registration successful 👌';
        },
        error: (err) => err.message,
      });

      return apiPromise.then((res) => res.data);
    },
  });
}

export function useVerifyCodeMutation() {
  return useMutation({
    mutationFn: async (data: VerifyCodePayload) => {
      const apiPromise = apiClient.put('/api/signup', data).catch((error) => {
        throw new Error(error.response?.data || 'An error occurred');
      });

      toast.promise(apiPromise, {
        loading: 'Verifying the code',
        success: 'Code verified successfully 👍',
        error: 'Invalid code. Please try again 🤯',
      });

      return apiPromise.then((res) => res.data);
    },
  });
}
