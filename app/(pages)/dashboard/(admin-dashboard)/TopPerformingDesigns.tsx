'use client';

import { formatDistanceToNow } from 'date-fns';
import { ChevronRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createSlug } from '@/components/helper/slug/CreateSlug';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchRecentDesign } from '@/services/admin';

/**
 * Interface for design data
 */
interface DesignData {
  id: string;
  name: string;
  image: string;
  createdAt: string;
}

/**
 * TopPerformingDesigns Component
 *
 * Displays a list of recent designs with thumbnails, names, and timestamps.
 * Includes a link to view all designs.
 */
export default function TopPerformingDesigns() {
  const { isLoading, data, isError } = FetchRecentDesign();
  const [designs, setDesigns] = useState<DesignData[]>([]);

  // Update state when fetched data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setDesigns(data);
    }
  }, [data]);

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='border-b pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-bold  md:text-2xl'>
            Recent Designs
          </CardTitle>
          <Link href='/dashboard/all-design?category=all&query=&page=1'>
            <Button variant='link' size='sm'>
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        {isLoading ? (
          <TopPerformingDesignsSkeleton />
        ) : isError ? (
          <div className='p-6 text-center text-red-500'>
            Error loading recent designs.
          </div>
        ) : designs.length > 0 ? (
          <ul className='divide-y'>
            {designs.map((design) => (
              <li key={design.id} className='group relative overflow-hidden'>
                <Link
                  href={`${createSlug({ id: design.id, name: design.name })}`}
                  className='flex items-center space-x-4 p-4'
                >
                  <div className='relative h-16 w-16 overflow-hidden rounded-md shadow-xs transition-transform duration-200 ease-in-out group-hover:scale-105'>
                    {design.image ? (
                      <Image
                        src={design.image || '/placeholder.svg'}
                        alt={design.name}
                        layout='fill'
                        objectFit='cover'
                        className='transition-opacity duration-200 group-hover:opacity-80'
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center'>
                        <ImageIcon className='h-8 w-8 text-muted-foreground' />
                      </div>
                    )}
                  </div>
                  <div className='flex-1 space-y-1'>
                    <p className='line-clamp-1 font-semibold '>{design.name}</p>
                    <div className='flex items-center space-x-2'>
                      <span className='text-xs text-muted-foreground'>
                        {formatDistanceToNow(new Date(design.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'
                  >
                    <ChevronRight className='h-5 w-5 text-primary' />
                    <span className='sr-only'>View design</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className='p-6 text-center text-muted-foreground'>
            No top performing designs found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Skeleton } from '@/components/ui/skeleton';

/**
 * TopPerformingDesignsSkeleton Component
 *
 * Displays placeholder loading state for the recent designs list
 * with animated skeleton elements.
 */
function TopPerformingDesignsSkeleton() {
  return (
    <div className='divide-y '>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          // biome-ignore lint: error
          <div key={index} className='flex items-center space-x-4 p-4'>
            <Skeleton className='h-16 w-16 rounded-md' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-3/4' />
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-5 w-20 rounded-full' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
        ))}
    </div>
  );
}
