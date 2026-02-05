'use client';

import { Calendar, Clock, Tag, Target } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { QuizListType } from '@/types/quiz-type';
import { DifficultyBadge } from './difficulty-badge';
import { QuizActions } from './quiz-actions';
import { StatusBadge } from './status-badge';

interface QuizCardProps {
  quiz: QuizListType;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewResults?: (id: string) => void;
}

export function QuizCard({
  quiz,
  onEdit,
  onView,
  onDuplicate,
  onDelete,
  onViewResults,
}: QuizCardProps): JSX.Element {
  const createdDate = new Date(quiz.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const scheduledDate = quiz.scheduledFor
    ? new Date(quiz.scheduledFor).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <Card className='group hover:shadow-md transition-all duration-300 hover:border-primary/30 flex flex-col h-full bg-card'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex-1 min-w-0'>
            <Link href={`/dashboard/quiz/all-quiz/${quiz.id}`}>
              <CardTitle className='text-lg font-bold text-balance line-clamp-2 mb-1 group-hover:text-primary transition-colors'>
                {quiz.title}
              </CardTitle>
            </Link>
            <CardDescription className='line-clamp-2 text-sm'>
              {quiz.description}
            </CardDescription>
          </div>
          <div className='shrink-0'>
            <QuizActions
              quiz={quiz}
              onEdit={onEdit}
              onView={onView}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              onViewResults={onViewResults}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex flex-col flex-1 space-y-4'>
        {/* Badges Row */}
        <div className='flex flex-wrap gap-2 items-center'>
          <StatusBadge status={quiz.status} />
          <DifficultyBadge difficulty={quiz.difficulty} />
          <Badge
            variant='outline'
            className='bg-secondary text-xs font-medium text-foreground'
          >
            {quiz.category}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-3 gap-3 py-3 border-y border-border/50'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1'>
              <Clock className='h-3.5 w-3.5 text-muted-foreground' />
              <span className='text-xs font-medium text-muted-foreground'>
                Duration
              </span>
            </div>
            <p className='text-sm font-semibold text-foreground'>
              {quiz.timeLimit}m
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1'>
              <Target className='h-3.5 w-3.5 text-muted-foreground' />
              <span className='text-xs font-medium text-muted-foreground'>
                Pass
              </span>
            </div>
            <p className='text-sm font-semibold text-foreground'>
              {quiz.passingScore}%
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1'>
              <Tag className='h-3.5 w-3.5 text-muted-foreground' />
              <span className='text-xs font-medium text-muted-foreground'>
                Tags
              </span>
            </div>
            <p className='text-sm font-semibold text-foreground'>
              {quiz.tags.length}
            </p>
          </div>
        </div>

        {/* Tags Display */}
        {quiz.tags.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {quiz.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant='secondary'>
                {tag}
              </Badge>
            ))}
            {quiz.tags.length > 2 && (
              <Badge
                variant='outline'
                className='text-xs font-medium text-muted-foreground'
              >
                +{quiz.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className='flex-1' />

        {/* Footer Section */}
        <div className='pt-2 space-y-2 border-t border-border/50 text-xs text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-3.5 w-3.5' />
            <span>Created {createdDate}</span>
          </div>
          {scheduledDate && quiz.status === 'SCHEDULED' && (
            <div className='flex items-center gap-2 text-primary font-medium'>
              <Calendar className='h-3.5 w-3.5' />
              <span>Scheduled for {scheduledDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
