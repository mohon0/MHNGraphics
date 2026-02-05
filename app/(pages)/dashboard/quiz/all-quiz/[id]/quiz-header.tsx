'use client';

import { Copy, Edit2, Trash2 } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { SingleQuizType } from '@/types/quiz-type';
import { DifficultyBadge } from '../difficulty-badge';
import { StatusBadge } from '../status-badge';

interface QuizHeaderProps {
  quiz: SingleQuizType;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function QuizHeader({
  quiz,
  onEdit,
  onDelete,
  onDuplicate,
}: QuizHeaderProps): JSX.Element {
  return (
    <div className='mb-8'>
      {/* Main Header */}
      <div className='bg-card rounded-xl border border-border shadow-sm overflow-hidden'>
        <div className='px-6 py-8'>
          <div className='flex items-start justify-between gap-6 mb-6'>
            <div className='flex-1'>
              <h1 className='text-4xl font-bold text-foreground mb-3 text-balance'>
                {quiz.title}
              </h1>
              <p className='text-lg text-muted-foreground leading-relaxed mb-4'>
                {quiz.description}
              </p>

              {/* Badges */}
              <div className='flex flex-wrap gap-2 items-center'>
                <StatusBadge status={quiz.status} />
                <DifficultyBadge difficulty={quiz.difficulty} />
                <Badge className='bg-secondary text-foreground border-border'>
                  {quiz.category}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-2 shrink-0'>
              <Button
                size='sm'
                variant='outline'
                onClick={onDuplicate}
                className='gap-2 bg-transparent'
              >
                <Copy className='h-4 w-4' />
                <span className='hidden sm:inline'>Duplicate</span>
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={onEdit}
                className='gap-2 bg-transparent'
              >
                <Edit2 className='h-4 w-4' />
                <span className='hidden sm:inline'>Edit</span>
              </Button>
              <Button
                size='sm'
                variant='destructive'
                onClick={onDelete}
                className='gap-2'
              >
                <Trash2 className='h-4 w-4' />
                <span className='hidden sm:inline'>Delete</span>
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border'>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-muted-foreground mb-1'>
                Time Limit
              </p>
              <p className='text-lg font-bold text-foreground'>
                {quiz.timeLimit} min
              </p>
            </div>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-muted-foreground mb-1'>
                Passing Score
              </p>
              <p className='text-lg font-bold text-foreground'>
                {quiz.passingScore}%
              </p>
            </div>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-muted-foreground mb-1'>
                Questions
              </p>
              <p className='text-lg font-bold text-foreground'>
                {quiz.questions.length}
              </p>
            </div>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-muted-foreground mb-1'>
                Tags
              </p>
              <p className='text-lg font-bold text-foreground'>
                {quiz.tags.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
