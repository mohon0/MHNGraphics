'use client';

import {
  BarChart,
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { QuizListType } from '@/types/quiz-type';

interface QuizActionsProps {
  quiz: QuizListType;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewResults?: (id: string) => void;
}

export function QuizActions({
  quiz,
  onEdit,
  onView,
  onDuplicate,
  onDelete,
  onViewResults,
}: QuizActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {onView && (
          <DropdownMenuItem onClick={() => onView(quiz.id)}>
            <Eye className='mr-2 h-4 w-4' />
            View Details
          </DropdownMenuItem>
        )}
        {quiz.status === 'PUBLISHED' && onViewResults && (
          <DropdownMenuItem onClick={() => onViewResults(quiz.id)}>
            <BarChart className='mr-2 h-4 w-4' />
            View Results
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(quiz.id)}>
            <Edit className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
        )}
        {onDuplicate && (
          <DropdownMenuItem onClick={() => onDuplicate(quiz.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Duplicate
          </DropdownMenuItem>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(quiz.id)}
              className='text-destructive focus:text-destructive'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
