'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { createSlug } from '@/components/helper/slug/CreateSlug';
import { SlugToText } from '@/components/helper/slug/SlugToText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchAllDesign } from '@/services/design';
import type { Design } from '@/utils/Interface';
import DesignPagination from './DesignPagination';
import DesignSkeleton from './DesignSkeleton';

function DesignMessage({ message }: { message: string }) {
  return (
    <div className='flex h-[50vh] flex-col items-center justify-center text-center'>
      <p className='text-xl font-semibold text-destructive'>{message}</p>
    </div>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryName = searchParams.get('category') || 'All';
  const query = searchParams.get('query') || '';
  const tag = searchParams.get('tag') || '';
  const page = Number.parseInt(searchParams.get('page') || '1', 10);

  const { isLoading, data, isError } = useFetchAllDesign({
    page,
    category: categoryName,
    searchQuery: query,
    tag,
  });

  // Function to clear the tag filter
  const clearTagFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('tag');
    router.push(`/design?${params.toString()}`);
  };

  if (isLoading) return <DesignSkeleton />;

  if (isError) {
    return (
      <DesignMessage message='Something went wrong while fetching the designs.' />
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <DesignMessage message='No designs available.' />;
  }

  return (
    <div className='container mx-auto px-4 py-10'>
      {/* Header with statistics */}
      <div className='mb-8 border-b pb-6'>
        <h1 className='mb-2 text-3xl font-bold tracking-tight'>
          {tag ? (
            <>
              {data.meta?.totalItems.toLocaleString()} Free {SlugToText(tag)}{' '}
              Images
            </>
          ) : query ? (
            <>
              {data.meta?.totalItems.toLocaleString()} Free {query} Images
            </>
          ) : categoryName && categoryName !== 'all' ? (
            <>
              {data.meta?.totalItems.toLocaleString()} Free{' '}
              {SlugToText(categoryName)}
            </>
          ) : (
            <>{data.meta?.totalItems.toLocaleString()} Free Stock Images</>
          )}
        </h1>
        <p className='text-muted-foreground'>
          {categoryName && categoryName !== 'All' ? (
            <>
              Browse our collection of {SlugToText(categoryName).toLowerCase()}{' '}
              images. Select any {SlugToText(categoryName).toLowerCase()} image
              to download for free in high resolution.
            </>
          ) : tag ? (
            <>
              Browse our collection of {SlugToText(tag).toLowerCase()} images.
              Select any image to download for free in high resolution.
            </>
          ) : query ? (
            <>
              Browse our collection of {query.toLowerCase()} images. Select any
              image to download for free in high resolution.
            </>
          ) : (
            <p>
              Select an image to download for free. High resolution pictures
              available for your next project.
            </p>
          )}
        </p>
      </div>
      {/* Display tag filter and clear button if a tag is selected */}
      {tag && (
        <div className='mb-6 flex items-center'>
          <Badge variant='secondary' className='px-3 py-1.5 text-base'>
            <span className='mr-2 font-medium'>Tag:</span>
            {SlugToText(tag)}
          </Badge>
          <Button
            variant='ghost'
            size='sm'
            onClick={clearTagFilter}
            className='ml-2'
          >
            <X className='mr-1 h-4 w-4' />
            Clear
          </Button>
        </div>
      )}

      {/* Column-based masonry layout to preserve original image dimensions */}
      <div className='columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3'>
        {data.data.map((item: Design) => (
          <div key={item.id} className='mb-4 break-inside-avoid'>
            <Link
              href={createSlug({ name: item.name, id: item.id })}
              className='block'
            >
              <div className='group relative overflow-hidden rounded-lg'>
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  className='w-full object-cover transition-all duration-300 group-hover:brightness-90'
                  width={500}
                  height={500}
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                  loading='lazy'
                />
                <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <h3 className='line-clamp-1 text-sm font-medium'>
                    {item.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data?.meta && data.meta.totalPages > 1 && (
        <div className='mt-10 flex justify-center'>
          <DesignPagination
            totalPages={data.meta.totalPages}
            category={categoryName}
            currentPage={page}
            query={query}
            tag={tag}
          />
        </div>
      )}
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback='Loading...'>
      <SearchPageContent />
    </Suspense>
  );
}
