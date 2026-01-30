'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalPages: number;
  category?: string;
  query: string;
  initialPage: number;
  sort?: string;
  certificate?: string;
  searchQuery?: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationComponent({
  totalPages,
  category,
  query,
  initialPage,
  sort,
  certificate,
  searchQuery,
  setPage,
}: PaginationProps) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createPageURL = (page: number) => {
    const url = new URL(pathname, window.location.origin);
    if (category) url.searchParams.set('filter', category);
    if (query) url.searchParams.set('name', query);
    if (sort) url.searchParams.set('sort', sort);
    if (certificate) url.searchParams.set('certificate', certificate);
    if (searchQuery) url.searchParams.set('searchQuery', searchQuery);
    url.searchParams.set('page', page.toString());
    return url.toString();
  };

  const pages = getPaginationPages(currentPage, totalPages);

  if (!mounted) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setPage(page); // Update page in the parent component
    window.history.pushState(null, '', createPageURL(page)); // Update the URL
  };

  return (
    <Pagination className='select-none'>
      <PaginationContent className='flex flex-wrap items-center gap-2'>
        <PaginationItem>
          <Button
            variant='outline'
            size='icon'
            className='h-10 w-10 rounded-md border ring-1 ring-gray-300 ring-inset'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className='h-5 w-5' />
            <span className='sr-only'>Previous</span>
          </Button>
        </PaginationItem>

        <span className='relative z-10 inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-500 focus:outline-offset-0'>
          Page {currentPage} of {totalPages}
        </span>

        {pages.map((page, index) => (
          // biome-ignore lint: error
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <span className='relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0'>
                ...
              </span>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => handlePageChange(page as number)}
                  className={`h-10 w-10 rounded-md text-sm font-semibold ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'ring-1 ring-gray-300 ring-inset hover:bg-gray-50'
                  }`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </Button>
              </motion.div>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            variant='outline'
            size='icon'
            className='h-10 w-10 rounded-md border ring-1 ring-gray-300 ring-inset'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className='h-5 w-5' />
            <span className='sr-only'>Next</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getPaginationPages(
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const leftEdge = Math.max(1, currentPage - 1);
    const rightEdge = Math.min(totalPages, currentPage + 1);

    if (leftEdge > 2) pages.push(1, 'ellipsis');
    else for (let i = 1; i < leftEdge; i++) pages.push(i);

    for (let i = leftEdge; i <= rightEdge; i++) pages.push(i);

    if (rightEdge < totalPages - 1) pages.push('ellipsis', totalPages);
    else for (let i = rightEdge + 1; i <= totalPages; i++) pages.push(i);
  }

  return pages;
}
