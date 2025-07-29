'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useProfile } from '@/services/profile';
import DesignGrid from './design-grid';
import ProfileHeader from './profile-header';
import ProfileInfo from './profile-info';
import ProfileSkeleton from './profile-skeleton';

export default function ProfileContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const currentPage = Number(searchParams.get('page') || '1');
  const itemsPerPage = 9;

  // Only fetch if we have an ID
  const { isLoading, data, isError } = useProfile(
    id ?? '',
    itemsPerPage,
    (currentPage - 1) * itemsPerPage,
  );

  // Show error toast when fetch fails
  useEffect(() => {
    if (isError) {
      toast.error('Failed to load profile data', {
        description: 'Please try again later',
      });
    }
  }, [isError]);

  // Memoize the content to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (!id) {
      return (
        <div className='flex h-[70vh] items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold'>No Profile Selected</h2>
            <p className='text-muted-foreground'>
              Please provide a user ID to view their profile
            </p>
          </div>
        </div>
      );
    }

    if (isLoading || !data) return <ProfileSkeleton />;

    return (
      <div className='container mx-auto mt-10'>
        <ProfileHeader user={data} isLoading={isLoading} />

        <div className='mt-8 flex flex-col gap-8 lg:flex-row'>
          <div className='w-full lg:w-1/3'>
            <ProfileInfo user={data} />
          </div>

          <div className='w-full lg:w-2/3'>
            <DesignGrid id={id} />
          </div>
        </div>
      </div>
    );
  }, [id, isLoading, data]);

  return content;
}
