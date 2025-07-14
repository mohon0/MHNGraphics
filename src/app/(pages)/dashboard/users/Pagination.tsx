"use client";

import { Pagination, PaginationContent } from "@/components/ui/pagination";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UsersPaginationProps {
  totalPages: number;
  currentPage: number;
  query: string;
}

export default function UsersPagination({
  totalPages,
  currentPage,
  query,
}: UsersPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(currentPage);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);

    // Create URL with current path and search parameters
    const url = new URL(pathname, window.location.origin);
    url.searchParams.set("page", newPage.toString());
    if (query) url.searchParams.set("query", query);

    router.push(url.pathname + url.search);
  };

  // Get pagination pages based on screen size
  const pages = getPaginationPages(page, totalPages, isMobile);

  return (
    <Pagination>
      <PaginationContent
        className="flex flex-wrap items-center justify-center gap-2"
        aria-label="Pagination"
      >
        <button
          onClick={() => handlePageChange(page - 1)}
          className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
          disabled={page <= 1}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="relative z-10 inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-500 focus:outline-offset-0 sm:text-sm">
          {isMobile ? `${page}/${totalPages}` : `Page ${page} of ${totalPages}`}
        </span>

        {pages.map((pageNum, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {pageNum === "ellipsis" ? (
              <span className="relative hidden items-center px-3 py-2 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 sm:inline-flex sm:px-4 sm:text-sm">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(pageNum as number)}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-xs font-semibold focus:z-20 focus:outline-offset-0 sm:px-4 sm:text-sm ${
                  page === pageNum
                    ? "z-10 bg-primary text-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                }`}
                aria-current={page === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            )}
          </motion.span>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
          disabled={page >= totalPages}
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </PaginationContent>
    </Pagination>
  );
}

function getPaginationPages(
  currentPage: number,
  totalPages: number,
  isMobile = false,
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  // Show fewer pages on mobile
  const maxPagesToShow = isMobile ? 3 : 5;

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // On mobile, just show current page and maybe one adjacent
    if (isMobile) {
      if (currentPage > 1) pages.push(1);
      if (currentPage > 2) pages.push("ellipsis");
      pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push("ellipsis");
      if (currentPage < totalPages) pages.push(totalPages);
    } else {
      const leftEdge = Math.max(1, currentPage - 1);
      const rightEdge = Math.min(totalPages, currentPage + 1);

      if (leftEdge > 2) pages.push(1, "ellipsis");
      else for (let i = 1; i < leftEdge; i++) pages.push(i);

      for (let i = leftEdge; i <= rightEdge; i++) pages.push(i);

      if (rightEdge < totalPages - 1) pages.push("ellipsis", totalPages);
      else for (let i = rightEdge + 1; i <= totalPages; i++) pages.push(i);
    }
  }

  return pages;
}
