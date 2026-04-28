import { Skeleton } from '@/components/ui/skeleton';

export default function HeroSkeleton() {
  return (
    <section className='relative overflow-hidden'>
      {/* Background skeleton */}
      <div className='absolute inset-0'>
        <Skeleton className='h-full w-full' />
        <div className='absolute inset-0 bg-linear-to-b from-black/85 via-black/70 to-black/85' />
      </div>

      {/* Content */}
      <div className='relative mx-auto flex min-h-[700px] max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8'>
        {/* Title skeleton */}
        <div className='max-w-4xl text-center'>
          <div className='mb-6'>
            <Skeleton className='mx-auto mb-2 h-12 w-3/4 bg-white/20' />
            <Skeleton className='mx-auto h-12 w-1/2 bg-white/20' />
          </div>
          <Skeleton className='mx-auto mb-10 h-6 w-2/3 bg-white/20' />
        </div>

        {/* Search bar skeleton */}
        <div className='mb-10 w-full max-w-2xl'>
          <Skeleton className='h-16 w-full rounded-full bg-white/20' />
        </div>

        {/* Category buttons skeleton */}
        <div className='flex flex-wrap justify-center gap-3 md:gap-4'>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className='h-10 w-24 rounded-md bg-white/20' />
          ))}
        </div>

        {/* Slide indicators skeleton */}
        <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 transform gap-2'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-2 w-2 rounded-full bg-white/40' />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <Skeleton className='absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/5' />
        <Skeleton className='absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/5' />
      </div>
    </section>
  );
}
