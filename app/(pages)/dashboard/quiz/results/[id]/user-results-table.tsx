'use client';

import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { QuizResultType } from '@/types/quiz-type';

type UserResultsTableProps = {
  results: QuizResultType[];
  isPending: boolean;
};

export function UserResultsTable({
  results,
  isPending,
}: UserResultsTableProps) {
  const router = useRouter();

  if (isPending) {
    return (
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
          <Skeleton key={i} className='h-16 w-full' />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className='bg-secondary rounded-lg p-12 text-center'>
        <p className='text-muted-foreground font-semibold'>
          No submissions yet
        </p>
        <p className='text-muted-foreground text-sm mt-1'>
          Results will appear here once users complete the quiz.
        </p>
      </div>
    );
  }

  const handleClick = (resultId: string) => () => {
    router.push(`/quiz/quiz-result/stats/${resultId}`);
  };

  return (
    <div className='rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Participant</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Attempt</TableHead>
            <TableHead>Time Spent</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow
              key={result.id}
              onClick={handleClick(result.id)}
              className=' cursor-pointer'
            >
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarImage
                      src={result.userImage || '/placeholder.svg'}
                      alt={result.userName}
                    />
                    <AvatarFallback>
                      {result.userName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className='font-medium text-sm'>{result.userName}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className='font-semibold'>{result.score}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={result.percentage >= 50 ? 'default' : 'destructive'}
                >
                  {result.percentage}%
                </Badge>
              </TableCell>
              <TableCell>
                <span className='text-sm'>#{result.attemptNumber}</span>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-1 text-sm'>
                  <Clock className='h-3 w-3 text-muted-foreground' />
                  {Math.floor(result.timeSpent / 60)}:
                  {(result.timeSpent % 60).toString().padStart(2, '0')}
                </div>
              </TableCell>
              <TableCell>
                <span className='text-sm text-muted-foreground'>
                  {new Date(result.completedAt).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell className='text-right'>
                <Badge variant={result.passed ? 'default' : 'outline'}>
                  {result.passed ? 'Passed' : 'Failed'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
