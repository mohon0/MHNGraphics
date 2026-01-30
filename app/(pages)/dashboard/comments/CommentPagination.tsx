import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommentPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function CommentPagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: CommentPaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Generate array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the start
      if (currentPage <= 2) {
        end = 4;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('ellipsis');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='flex items-center justify-center gap-1'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        <ChevronLeft className='h-4 w-4' />
        <span className='sr-only'>Previous page</span>
      </Button>

      {getPageNumbers().map((page, index) => (
        // biome-ignore lint: error
        <div key={index}>
          {page === 'ellipsis' ? (
            <Button
              variant='ghost'
              size='icon'
              disabled
              className='cursor-default'
            >
              ...
            </Button>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size='icon'
              onClick={() => onPageChange(page as number)}
              disabled={disabled}
            >
              {page}
            </Button>
          )}
        </div>
      ))}

      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
      >
        <ChevronRight className='h-4 w-4' />
        <span className='sr-only'>Next page</span>
      </Button>
    </div>
  );
}
