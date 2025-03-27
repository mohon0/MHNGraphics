"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  category: string;
  query: string;
}

export default function PaginationComponent({
  totalPages,
  currentPage,
  category,
  query,
}: PaginationProps) {
  const router = useRouter();

  // Generate page numbers to display
  const generatePagination = () => {
    // If 7 or fewer pages, show all
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first, last, and pages around current
    const pages = [1];

    // Add ellipsis and pages around current page
    if (currentPage > 3) {
      pages.push(-1); // Represents ellipsis
    }

    // Determine range around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push(-1); // Represents ellipsis
    }

    // Add last page if not already included
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePagination();

  // Navigate to a specific page
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(
      `/dashboard/all-design?category=${category}&query=${query}&page=${page}`,
    );
  };

  return (
    <Pagination className="select-none">
      <PaginationContent className="flex flex-wrap items-center gap-2">
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Go to previous page</span>
          </Button>
        </PaginationItem>
        <span className="relative z-10 inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-500 focus:outline-offset-0">
          Page {currentPage} of {totalPages}
        </span>
        {pages.map((page, i) =>
          page === -1 ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={`h-9 w-9 rounded-md ${currentPage === page ? "pointer-events-none" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Go to next page</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
