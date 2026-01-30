'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function DesignGridSkeleton() {
  // Create an array of random heights for more realistic design cards
  const randomHeights = Array.from(
    { length: 9 },
    () => Math.floor(Math.random() * 100) + 200,
  );

  return (
    <div className='animate-pulse'>
      <div className='columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3'>
        {randomHeights.map((height, index) => (
          // biome-ignore lint: error
          <div key={index} className='mb-4 break-inside-avoid'>
            <Skeleton
              className='w-full rounded-lg'
              style={{ height: `${height}px` }}
            />
            <div className='mt-2'>
              <Skeleton className='h-4 w-3/4 rounded' />
              <Skeleton className='mt-1 h-3 w-1/2 rounded' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
