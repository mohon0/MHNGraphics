import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaginationProps } from '@/utils/Interface';

export function Pagination({
  totalPages,
  initialPage,
  setPage,
}: PaginationProps) {
  const currentPage = initialPage;

  // Generate page numbers to display
  const generatePagination = () => {
    // Always show first and last page
    // Show 2 pages before and after current page
    // Use ellipsis for gaps

    const pages = [];

    // Always add page 1
    pages.push(1);

    // Calculate range to show around current page
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    // Adjust range if current page is at the start or end
    if (currentPage <= 3) {
      rangeEnd = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      rangeStart = Math.max(totalPages - 3, 2);
    }

    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push('ellipsis-start');
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    // Add last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePagination();

  return (
    <div className='flex items-center justify-center space-x-2'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label='Previous page'
      >
        <ChevronLeftIcon className='h-4 w-4' />
      </Button>

      {pages.map((page, i) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <Button
              // biome-ignore lint: error
              key={`ellipsis-${i}`}
              variant='outline'
              size='icon'
              disabled
              className='cursor-default'
            >
              <MoreHorizontalIcon className='h-4 w-4' />
            </Button>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size='icon'
            onClick={() => setPage(page as number)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant='outline'
        size='icon'
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label='Next page'
      >
        <ChevronRightIcon className='h-4 w-4' />
      </Button>
    </div>
  );
}
