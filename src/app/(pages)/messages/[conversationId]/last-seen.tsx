import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface LastSeenProps {
  isOnline: boolean;
  lastSeen?: Date | null;
  className?: string;
}

export function LastSeen({ isOnline, lastSeen, className }: LastSeenProps) {
  if (isOnline) {
    return (
      <div className={cn('flex items-center gap-1 text-xs', className)}>
        <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
        <span>Online</span>
      </div>
    );
  }

  if (!lastSeen) {
    return (
      <div className={cn('text-xs text-muted-foreground', className)}>
        Offline
      </div>
    );
  }

  return (
    <div className={cn('text-xs text-muted-foreground', className)}>
      Last seen {formatDistanceToNow(new Date(lastSeen), { addSuffix: true })}
    </div>
  );
}
