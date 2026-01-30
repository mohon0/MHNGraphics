'use client';

import { Mail, Phone, User } from 'lucide-react';
import Image from 'next/image';
import type * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useFetchPaymentReport } from '@/services/payment';

interface StudentInfoProps {
  id: string | null;
}

interface InfoItemProps {
  icon: React.ReactNode;
  content?: string | null;
  className?: string;
}

function InfoItem({ icon, content, className }: InfoItemProps) {
  if (!content) return null;

  return (
    <div
      className={cn('flex items-center gap-2 text-muted-foreground', className)}
    >
      {icon}
      <span className='break-words'>{content}</span>
    </div>
  );
}

export default function StudentInfo({ id }: StudentInfoProps) {
  const { isLoading, data, isError } = useFetchPaymentReport(id || '');

  if (isError) {
    return (
      <Card className='border-destructive'>
        <CardContent className='p-6'>
          <div className='text-destructive'>
            Error loading student information
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <StudentInfoSkeleton />;
  }

  const hasContactInfo = data.fullAddress || data.mobileNumber || data.email;

  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex gap-4'>
          {/* Student Image */}
          {data.image && (
            <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full border sm:h-24 sm:w-24'>
              <Image
                src={data.image || '/placeholder.svg'}
                alt={data.studentName || 'Student'}
                fill
                className='object-cover'
                priority
              />
            </div>
          )}

          {/* Student Info */}
          <div className='min-w-0 flex-1'>
            {' '}
            {/* min-w-0 helps with text truncation */}
            {data.studentName && (
              <h2 className='truncate text-lg font-semibold sm:text-xl'>
                {data.studentName}
              </h2>
            )}
            {data.course && (
              <p className='mt-1 text-sm text-muted-foreground'>
                {data.course}
              </p>
            )}
            {hasContactInfo && (
              <div className='mt-4 space-y-2 text-sm'>
                <InfoItem
                  icon={<User className='h-4 w-4 shrink-0' />}
                  content={data.fullAddress}
                />
                <InfoItem
                  icon={<Phone className='h-4 w-4 shrink-0' />}
                  content={data.mobileNumber}
                />
                <InfoItem
                  icon={<Mail className='h-4 w-4 shrink-0' />}
                  content={data.email}
                  className='break-all'
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StudentInfoSkeleton() {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex gap-4'>
          <Skeleton className='h-20 w-20 shrink-0 rounded-full sm:h-24 sm:w-24' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-4 w-32' />
            <div className='mt-4 space-y-2'>
              {[...Array(3)].map((_, i) => (
                // biome-ignore lint: error
                <div key={i} className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4 shrink-0' />
                  <Skeleton className='h-4 w-full' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
