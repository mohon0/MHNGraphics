'use client';

import { Home, RotateCcw } from 'lucide-react';
import { MdQuestionAnswer } from 'react-icons/md';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onRetry?: () => void;
  onHome?: () => void;
  onNext?: () => void;
}

export function ActionButtons({ onRetry, onHome, onNext }: ActionButtonsProps) {
  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
      <Button
        onClick={onRetry}
        variant='outline'
        size='lg'
        className='gap-2 border-border hover:bg-secondary bg-transparent'
      >
        <RotateCcw size={20} />
        Try Again
      </Button>
      <Button
        onClick={onNext}
        variant='outline'
        size='lg'
        className='gap-2 border-border hover:bg-secondary bg-transparent'
      >
        <MdQuestionAnswer size={20} />
        View Solutions
      </Button>
      <Button
        onClick={onHome}
        size='lg'
        className='gap-2 bg-primary hover:bg-primary/90 text-white'
      >
        <Home size={20} />
        Back to Home
      </Button>
    </div>
  );
}
