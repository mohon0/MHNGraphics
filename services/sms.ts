import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constant/QueryKeys';

// Check Balance
export function useCheckSMSBalance() {
  return useQuery({
    queryKey: [QUERY_KEYS.SMS_BALANCE],
    queryFn: async () => {
      const response = await axios.get('/api/sms/balance');
      return response.data;
    },
  });
}

// Send SMS
export function useSendSMS() {
  return useMutation({
    mutationFn: async ({
      phone,
      message,
    }: {
      phone: string;
      message: string;
    }) => {
      const sendPromise = axios
        .post<{ message: string }>('/api/sms/send-sms', { phone, message })
        .then((res) => res.data);

      return toast.promise(sendPromise, {
        loading: 'Sending SMS...',
        success: (data) => data.message || 'SMS sent successfully ✅',
        error: (error) =>
          axios.isAxiosError(error)
            ? error.response?.data?.message || 'Failed to send SMS ❌'
            : 'Something went wrong. Please try again.',
      });
    },
  });
}

// Send OTP
export function useSendOTP() {
  return useMutation({
    mutationFn: async ({
      phone,
      brand = 'MyApp',
    }: {
      phone: string;
      brand?: string;
    }) => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const message = `${brand} OTP is ${otp}`;

      const otpPromise = axios
        .post<{ message: string }>('/api/sms/send-sms', { phone, message })
        .then((res) => ({ ...res.data, otp })); // return otp so you can verify it

      return toast.promise(otpPromise, {
        loading: 'Sending OTP...',
        success: 'OTP sent successfully ✅',
        error: (error) =>
          axios.isAxiosError(error)
            ? error.response?.data?.message || 'Failed to send OTP ❌'
            : 'Something went wrong. Please try again.',
      });
    },
  });
}
