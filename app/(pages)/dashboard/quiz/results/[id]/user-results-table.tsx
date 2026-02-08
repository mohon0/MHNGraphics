'use client';

import { format } from 'date-fns';
import { Clock, Medal, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { IoMdPrint } from 'react-icons/io';
import { useReactToPrint } from 'react-to-print';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  quizTitle?: string;
};

export function UserResultsTable({
  results,
  isPending,
  quizTitle = 'Quiz Results',
}: UserResultsTableProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef as React.RefObject<Element | Text>,
  });

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

  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return (
        <div className='flex items-center gap-1.5'>
          <Trophy className='h-4 w-4 text-yellow-500' />
          <span className='font-bold text-yellow-600'>1st</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className='flex items-center gap-1.5'>
          <Medal className='h-4 w-4 text-gray-400' />
          <span className='font-bold text-gray-500'>2nd</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className='flex items-center gap-1.5'>
          <Medal className='h-4 w-4 text-amber-600' />
          <span className='font-bold text-amber-700'>3rd</span>
        </div>
      );
    }
    return (
      <span className='font-semibold text-muted-foreground'>
        {rank}
        {getRankSuffix(rank)}
      </span>
    );
  };

  const getRankSuffix = (rank: number) => {
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }

    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return (
    <div>
      <div ref={contentRef}>
        {/* Print Header - Only visible when printing */}
        <div className='hidden print:block mb-6 text-center'>
          <h1 className='text-3xl font-bold mb-2'>{quizTitle}</h1>
          <p className='text-sm text-gray-600'>
            Generated on {format(new Date(), 'MMMM d, yyyy')} at{' '}
            {format(new Date(), 'h:mm a')}
          </p>
          <p className='text-sm text-gray-600 mt-1'>
            Total Participants: {results.length}
          </p>
        </div>

        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-20'>Rank</TableHead>
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
                  className='cursor-pointer print:cursor-auto'
                >
                  <TableCell>{getRankDisplay(result.rank)}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='print:hidden'>
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
                      <span className='font-medium text-sm truncate'>
                        {result.userName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='font-semibold'>{result.score}</span>
                    <span className='text-muted-foreground text-xs ml-1'>
                      / {result.totalQuestions}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>{result.percentage}%</Badge>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>#{result.attemptNumber}</span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1 text-sm'>
                      <Clock className='h-3 w-3 text-muted-foreground print:hidden' />
                      {Math.floor(result.timeSpent / 60)}:
                      {(result.timeSpent % 60).toString().padStart(2, '0')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='text-xs text-muted-foreground'>
                        {format(new Date(result.completedAt), 'MMM d, h:mm a')}
                      </span>
                    </div>
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
      </div>

      {/* Print Button */}
      <Button
        onClick={() => reactToPrintFn()}
        size='lg'
        className='mx-auto mb-10 mt-10 flex items-center gap-3 print:hidden'
      >
        <IoMdPrint />
        Print Results
      </Button>
    </div>
  );
}
