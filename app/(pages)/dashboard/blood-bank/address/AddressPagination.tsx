'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PaginationUiProps {
  totalPages: number;
  query: string;
  initialPage: number;

  setPage: React.Dispatch<React.SetStateAction<number>>; // Passed from parent
}

export default function AddressPagination({
  totalPages,
  query,
  initialPage,
  setPage,
}: PaginationUiProps) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createPageURL = () => {
    const url = new URL(pathname, window.location.origin);

    if (query) url.searchParams.set('name', query);

    return url.toString();
  };

  const pages = getPaginationPages(currentPage, totalPages);

  if (!mounted) {
    return null;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPage(page); // Update page in the parent component
    window.history.pushState(null, '', createPageURL()); // Update the URL
  };

  return (
    <nav
      className='mt-8 flex items-center justify-center space-x-2'
      aria-label='Pagination'
    >
      <button
        type='button'
        onClick={() => handlePageChange(currentPage - 1)}
        className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
        }`}
        disabled={currentPage <= 1}
      >
        <span className='sr-only'>Previous</span>
        <ChevronLeft className='h-5 w-5' aria-hidden='true' />
      </button>
      <span className='relative z-10 inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-500 focus:outline-offset-0'>
        Page {currentPage} of {totalPages}
      </span>
      {pages.map((page, index) => (
        <motion.span
          // biome-ignore lint: error
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page === 'ellipsis' ? (
            <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>
              ...
            </span>
          ) : (
            <button
              type='button'
              onClick={() => handlePageChange(page as number)}
              className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                currentPage === page
                  ? 'z-10 bg-primary text-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )}
        </motion.span>
      ))}
      <button
        type='button'
        onClick={() => handlePageChange(currentPage + 1)}
        className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
        }`}
        disabled={currentPage >= totalPages}
      >
        <span className='sr-only'>Next</span>
        <ChevronRight className='h-5 w-5' aria-hidden='true' />
      </button>
    </nav>
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
