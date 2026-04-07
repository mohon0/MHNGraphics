import { Skeleton } from '@/components/ui/skeleton';

export default function TableSkeleton({ rowCount }: { rowCount: number }) {
  return (
    // 'bg-card' and 'text-card-foreground' adapt automatically to dark mode
    <div className='overflow-hidden rounded-lg border border-border bg-card shadow-sm'>
      {/* Header Skeleton Section */}
      <div className='flex justify-between space-x-4 border-b border-border p-4 bg-muted/50'>
        <Skeleton className='h-6 w-1/3' />
        <Skeleton className='h-6 w-1/3' />
        <Skeleton className='h-6 w-1/3' />
      </div>

      {/* Row Skeleton Section */}
      {[...Array(rowCount)].map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
          key={index}
          className='flex justify-between space-x-4 border-b border-border p-4 last:border-0'
        >
          <Skeleton className='h-8 w-1/3' />
          <Skeleton className='h-8 w-1/3' />
          <Skeleton className='h-8 w-1/3' />
        </div>
      ))}
    </div>
  );
}
