'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';

interface QuizActionsProps {
  quizId: string;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function QuizActions({
  quizId,
  onEdit,
  onView,
  onDuplicate,
  onDelete,
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
          <DropdownMenuItem onClick={() => onView(quizId)}>
            <Eye className='mr-2 h-4 w-4' />
            View
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(quizId)}>
            <Edit className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
        )}
        {onDuplicate && (
          <DropdownMenuItem onClick={() => onDuplicate(quizId)}>
            <Copy className='mr-2 h-4 w-4' />
            Duplicate
          </DropdownMenuItem>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(quizId)}
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
