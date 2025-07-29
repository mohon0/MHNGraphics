'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  isTyping: boolean;
  className?: string;
}

export function TypingIndicator({ isTyping, className }: TypingIndicatorProps) {
  if (!isTyping) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-full bg-muted px-4 py-2 text-xs text-muted-foreground',
        className,
      )}
    >
      <span>Typing</span>
      <div className='flex gap-1'>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className='h-1.5 w-1.5 rounded-full bg-current'
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
