'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApplicationCancelPage() {
  return (
    <div className='container mx-auto flex min-h-[60vh] items-center justify-center py-10'>
      <Card className='mx-auto w-full max-w-lg text-center'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-red-600'>
            Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-6 text-lg text-gray-700'>
            Unfortunately, we were unable to process your payment.
          </p>
          <p className='mb-8 text-sm text-gray-500'>
            Please try again. If the problem persists, please contact support.
          </p>
          <Button asChild>
            <Link href='/best-computer-training-center/application'>
              Try Again
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
