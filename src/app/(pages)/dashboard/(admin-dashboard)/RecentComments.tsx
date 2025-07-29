'use client';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRight, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { createSlug } from '@/components/helper/slug/CreateSlug';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCommentList } from '@/services/admin';
import type { Comment } from '@/utils/Interface';

/**
 * RecentComments Component
 *
 * Displays a list of recent comments with user information,
 * comment content, and timestamps. Includes a link to view all comments.
 */
export default function RecentComments() {
  const { isLoading, data, isError } = useCommentList({
    page: 1,
    pageSize: 5,
    searchQuery: '',
  });

  return (
    <Card className='overflow-hidden bg-linear-to-br from-white to-gray-50 shadow-lg'>
      <CardHeader className='border-b border-gray-100 bg-white pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-bold text-gray-800 md:text-2xl'>
            Recent Comments
          </CardTitle>
          <Link href='/dashboard/comments?filter=All&page=1&sort=newest'>
            <Button variant='link' size='sm'>
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        {isLoading ? (
          <RecentCommentsSkeleton />
        ) : isError ? (
          <div className='p-6 text-center text-red-500'>
            Error loading recent comments.
          </div>
        ) : data.data.length > 0 ? (
          <ul className='divide-y divide-gray-100'>
            {data.data.map((comment: Comment) => (
              <li key={comment.id} className='group relative overflow-hidden'>
                <Link
                  href={createSlug({
                    id: comment.design.id,
                    name: comment.design.name,
                  })}
                  className='flex items-start space-x-4 p-4 transition-all duration-200 ease-in-out group-hover:bg-blue-50'
                >
                  <Avatar className='h-10 w-10 rounded-full border-2 border-white shadow-xs transition-transform duration-200 ease-in-out group-hover:scale-110'>
                    <AvatarImage
                      src={comment.user.image}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>
                      <User className='h-5 w-5 text-gray-400' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center justify-between'>
                      <p className='font-semibold text-gray-800'>
                        {comment.user.name}
                      </p>
                      <span className='flex items-center text-xs text-gray-500'>
                        <Clock className='mr-1 h-3 w-3' />
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className='line-clamp-2 text-sm text-gray-600'>
                      {comment.content}
                    </p>
                    <p className='text-xs text-gray-500'>
                      on{' '}
                      <span className='font-medium text-primary'>
                        {comment.design.name}
                      </span>
                    </p>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='mt-1 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'
                  >
                    <ChevronRight className='h-5 w-5 text-primary' />
                    <span className='sr-only'>View comment</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className='p-6 text-center text-gray-500'>
            No recent comments found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * RecentCommentsSkeleton Component
 *
 * Displays placeholder loading state for the recent comments list
 * with animated skeleton elements.
 */
function RecentCommentsSkeleton() {
  return (
    <div className='divide-y divide-gray-100'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          // biome-ignore lint: error
          <div key={index} className='flex items-start space-x-4 p-4'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <div className='flex-1 space-y-2'>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-3 w-20' />
              </div>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-3 w-32' />
            </div>
            <Skeleton className='mt-1 h-8 w-8 rounded-full' />
          </div>
        ))}
    </div>
  );
}
