'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

interface PaginationUiProps {
  totalPages: number;
  currentPage: number;
  category?: string;
  query?: string;
  tag?: string;
  id: string;
  onPageChange?: (page: number) => void;
}

export default function DesignPagination({
  totalPages,
  currentPage,
  category,
  query,
  tag,
  id,
  onPageChange,
}: PaginationUiProps) {
  const router = useRouter();

  // Function to generate the URL for a specific page
  const getPageUrl = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams();

      // Always set the ID first
      params.set('id', id);

      // Only add page if it's not page 1
      if (pageNumber > 1) {
        params.set('page', pageNumber.toString());
      }

      if (category) {
        params.set('category', category);
      }

      if (query) {
        params.set('query', query);
      }

      if (tag) {
        params.set('tag', tag);
      }

      return `/profile?${params.toString()}`;
    },
    [category, query, tag, id],
  );

  // Navigate to a specific page
  const navigateToPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;

      if (onPageChange) {
        // Use the callback for client-side navigation
        onPageChange(pageNumber);
      } else {
        // Fall back to router navigation
        router.push(getPageUrl(pageNumber));
      }
    },
    [totalPages, onPageChange, router, getPageUrl],
  );

  // Calculate which page numbers to show
  const getVisiblePages = () => {
    // For small number of pages, show all
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // For larger number of pages, show a window around current page
    const pages = [];

    // Always show first page
    pages.push(1);

    // If not close to the beginning, show ellipsis
    if (currentPage > 3) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Calculate start and end of the window
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    // Add the window pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // If not close to the end, show ellipsis
    if (currentPage < totalPages - 2) {
      pages.push(-2); // -2 represents ellipsis (using different value to avoid React key conflicts)
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex flex-col items-center space-y-4'>
      <Pagination>
        <PaginationContent className='flex flex-wrap justify-center gap-2'>
          {/* First Page Button */}
          {totalPages > 7 && (
            <PaginationItem>
              <Button
                variant='outline'
                size='icon'
                className='h-9 w-9 rounded-full'
                onClick={() => navigateToPage(1)}
                disabled={currentPage === 1}
                aria-label='Go to first page'
              >
                <ChevronsLeft className='h-4 w-4' />
              </Button>
            </PaginationItem>
          )}

          {/* Previous Button */}
          <PaginationItem>
            <Button
              variant='outline'
              size='icon'
              className='h-9 w-9 rounded-full'
              onClick={() => navigateToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label='Go to previous page'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
          </PaginationItem>

          {/* Page Numbers */}
          {visiblePages.map((page) => {
            if (page < 0) {
              // Render ellipsis
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                {onPageChange ? (
                  <Button
                    variant={page === currentPage ? 'default' : 'outline'}
                    size='icon'
                    className={`h-9 w-9 rounded-full ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => navigateToPage(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                    aria-label={`Go to page ${page}`}
                  >
                    <span className='flex h-full w-full items-center justify-center'>
                      {page}
                    </span>
                  </Button>
                ) : (
                  <PaginationLink
                    href={getPageUrl(page)}
                    isActive={page === currentPage}
                    className={`h-9 w-9 rounded-full p-0 ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className='flex h-full w-full items-center justify-center'>
                      {page}
                    </span>
                  </PaginationLink>
                )}
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <Button
              variant='outline'
              size='icon'
              className='h-9 w-9 rounded-full'
              onClick={() => navigateToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label='Go to next page'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </PaginationItem>

          {/* Last Page Button */}
          {totalPages > 7 && (
            <PaginationItem>
              <Button
                variant='outline'
                size='icon'
                className='h-9 w-9 rounded-full'
                onClick={() => navigateToPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label='Go to last page'
              >
                <ChevronsRight className='h-4 w-4' />
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <div className='text-muted-foreground text-sm'>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
