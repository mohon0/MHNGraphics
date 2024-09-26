"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface PaginationUiProps {
  totalPages: number;
}

export default function PaginationUi({ totalPages }: PaginationUiProps) {
  const pathname = usePathname();
  const currentPage = Number(pathname.split("/").pop()) || 1;

  // Function to create URLs for each page
  const createPageURL = (pageNumber: number | string) => {
    return `/design/page/${pageNumber}`;
  };

  // Generate pagination numbers based on the current page and total pages
  const generatePagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const pages = generatePagination();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={clsx(
              currentPage <= 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {/* Page Number Buttons */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
                aria-current={currentPage === page ? "page" : undefined}
                aria-disabled={currentPage === page}
                className={clsx(
                  currentPage === page && "pointer-events-none opacity-50",
                )}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={clsx(
              currentPage >= totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
