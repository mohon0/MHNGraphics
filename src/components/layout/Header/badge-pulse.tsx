'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgePulseVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
        outline: 'text-foreground',
        success:
          'border-transparent bg-emerald-500 text-white shadow-sm hover:bg-emerald-500/80',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
      },
    },
    defaultVariants: {
      variant: 'default',
      animation: 'none',
    },
  },
);

export interface BadgePulseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgePulseVariants> {}

function BadgePulse({
  className,
  variant,
  animation,
  ...props
}: BadgePulseProps) {
  return (
    <div
      className={cn(badgePulseVariants({ variant, animation }), className)}
      {...props}
    />
  );
}

export { BadgePulse, badgePulseVariants };
