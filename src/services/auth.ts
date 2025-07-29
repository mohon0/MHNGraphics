import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { SignUpSchema } from '@/lib/Schemas';

interface VerifyCodePayload {
  userId: string;
  code: string;
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (values: z.infer<typeof SignUpSchema>) => {
      return toast
        .promise(
          axios.post('/api/signup', values).catch((error) => {
            throw new Error(error.response?.data || 'An error occurred');
          }),
          {
            loading: 'Processing registration...',
            success: () => {
              const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
              return isEmail
                ? 'Email sent successfully 👌'
                : 'Registration successful 👌';
            },
            error: (err) => err.message,
          },
        )
        .unwrap();
    },
  });
}

export function useVerifyCodeMutation() {
  return useMutation({
    mutationFn: async (data: VerifyCodePayload) => {
      return toast
        .promise(
          axios.put('/api/signup', data).catch((error) => {
            throw new Error(error.response?.data || 'An error occurred');
          }),
          {
            loading: 'Verifying the code',
            success: 'Code verified successfully 👍',
            error: 'Invalid code. Please try again 🤯',
          },
        )
        .unwrap();
    },
  });
}
