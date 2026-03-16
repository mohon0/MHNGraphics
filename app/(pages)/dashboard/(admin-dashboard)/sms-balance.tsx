'use client';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCheckSMSBalance } from '@/services/sms';

export default function SMSBalanceCard() {
  const { data, isLoading, isError } = useCheckSMSBalance();

  if (isLoading) {
    return (
      <Card className='overflow-hidden'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Skeleton className='h-4 w-25' />
          <Skeleton className='h-8 w-8 rounded-full' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-7 w-15' />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className='overflow-hidden border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20'>
        <CardContent className='p-6'>
          <p className='text-sm text-red-500 dark:text-red-400'>
            Failed to load SMS balance.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>SMS Balance</CardTitle>
        <div className='rounded-full bg-orange-100 p-2 text-orange-600'>
          <MessageSquare className='h-6 w-6' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-lg font-bold md:text-2xl'>
          {data?.data?.balance ?? '—'}
        </div>
        <p className='mt-1 text-xs text-muted-foreground'>Available credits</p>
      </CardContent>
    </Card>
  );
}
