import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DesignSkeleton() {
  return (
    <div className='container mx-auto space-y-4 px-4 py-10'>
      <Skeleton className='h-12 w-4/6' />
      <Skeleton className='h-3 w-5/6' />

      <div className='columns-1 gap-6 space-y-6 sm:columns-2 md:columns-3'>
        {Array.from({ length: 9 }).map((_, i) => (
          // biome-ignore lint: error
          <div key={i} className='mb-6 break-inside-avoid'>
            <Card className='overflow-hidden'>
              <Skeleton className='aspect-3/4 w-full' />
              <CardContent className='p-3'>
                <Skeleton className='h-4 w-3/4' />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
