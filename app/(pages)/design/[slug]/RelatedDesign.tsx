'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createSlug } from '@/components/helper/slug/CreateSlug';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useRelatedDesign } from '@/services/design';

export default function RelatedDesign({ postId }: { postId: string }) {
  const { isLoading, data, isError } = useRelatedDesign(postId);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !data || data.length === 0) {
    return (
      <p className='text-center text-muted-foreground'>
        No related designs found.
      </p>
    );
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold tracking-tight text-primary'>
        Related Designs
      </h2>
      <Carousel className='mx-auto w-full'>
        <CarouselContent>
          {/* biome-ignore lint: error */}
          {data.data.map((design: any) => (
            <CarouselItem
              key={design.id}
              className='basis-10/12 md:basis-1/3 lg:basis-1/5'
            >
              <Link
                href={createSlug({ name: design.name, id: design.id })}
                className='group block overflow-hidden rounded-xl'
              >
                <div className='space-y-3'>
                  <div className='overflow-hidden rounded-xl'>
                    <Image
                      src={design.image || '/placeholder.svg'}
                      alt={design.name}
                      width={300}
                      height={200}
                      className='h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  <h3 className='line-clamp-1 font-medium group-hover:text-primary'>
                    {design.name}
                  </h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='translate-x-2 border-primary/20 bg-background/80 hover:bg-background' />
        <CarouselNext className='-translate-x-2 border-primary/20 bg-background/80 hover:bg-background' />
      </Carousel>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className='space-y-6'>
      <Skeleton className='h-8 w-64' />
      <div className='flex gap-4 overflow-hidden'>
        {[...Array(3)].map((_, i) => (
          // biome-ignore lint: error
          <div key={i} className='w-full shrink-0 space-y-3 md:w-1/3 lg:w-1/5'>
            <Skeleton className='h-44 w-full rounded-xl' />
            <Skeleton className='h-6 w-3/4' />
          </div>
        ))}
      </div>
    </div>
  );
}
