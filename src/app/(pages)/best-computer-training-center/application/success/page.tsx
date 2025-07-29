'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApplicationSuccessPage() {
  return (
    <div className='container mx-auto flex min-h-[60vh] items-center justify-center py-10'>
      <Card className='mx-auto w-full max-w-lg text-center'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-600'>
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-6 text-lg text-gray-700'>
            Your application has been submitted successfully.
          </p>
          <p className='mb-8 text-sm text-gray-500'>
            You will receive a confirmation email shortly. You can check the
            status of your application in your dashboard.
          </p>
          <Button asChild>
            <Link href='/dashboard'>Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
