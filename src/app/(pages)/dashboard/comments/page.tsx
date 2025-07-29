'use client';

import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { useCommentList } from '@/services/admin';
import { CommentList } from './CommentList';
import { CommentPagination } from './CommentPagination';
import { CommentSearch } from './CommentSearch';

/**
 * Comments Page
 *
 * Admin page that displays all comments with search and pagination functionality.
 * Uses TanStack Query for data management.
 */
export default function Comments() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 10;

  const { data, isPending, isError } = useCommentList({
    page,
    pageSize,
    searchQuery,
  });

  // Handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top of the list when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isError) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertDescription>
          There was an error loading the comments. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Comments</h1>
        <p className='mt-2 text-muted-foreground'>
          Manage and monitor all comments across the platform.
        </p>
      </div>

      <Card className='overflow-hidden'>
        <div className='p-4 sm:p-6'>
          <CommentSearch onSearch={handleSearch} disabled={isPending} />

          {data?.meta && (
            <div className='mt-4 text-sm text-muted-foreground'>
              {data.meta.totalItems.toLocaleString()} total comments
              {searchQuery && (
                <span className='font-medium'>
                  matching &#34;{searchQuery}&#34;
                </span>
              )}
            </div>
          )}
        </div>

        <CommentList
          comments={data?.data ?? []}
          isLoading={isPending}
          isError={isError}
        />

        {data?.meta && (
          <div className='border-t p-4'>
            <CommentPagination
              currentPage={data.meta.currentPage}
              totalPages={data.meta.totalPages}
              onPageChange={handlePageChange}
              disabled={isPending}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
