"use client";

import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/Header/Header";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { FileDown } from "lucide-react";
import { useState } from "react";

interface Notice {
  id: string;
  title: string;
  createdAt: string;
  pdfUrl: string;
}

interface NoticeResponse {
  notices: Notice[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalNotices: number;
}

export default function Notice() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("20");

  const { data, isLoading, error } = useQuery<NoticeResponse>({
    queryKey: ["notices", currentPage, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/notice?page=${currentPage}&pageSize=${pageSize}`,
      );
      if (!res.ok) throw new Error("Failed to fetch notices");
      return res.json();
    },
  });

  const NoticeSkeleton = () => (
    <TableRow>
      <TableCell className="py-2 md:py-4">
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell className="py-2 md:py-4">
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="hidden py-2 md:table-cell md:py-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="py-2 md:py-4">
        <Skeleton className="h-4 w-8" />
      </TableCell>
    </TableRow>
  );

  const startNumber = (currentPage - 1) * Number.parseInt(pageSize) + 1;

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Recent News / Notice</h1>

        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <Select
              value={pageSize}
              onValueChange={(value) => {
                setPageSize(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue>{pageSize}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] px-2 py-3 md:w-[100px] md:px-4 md:py-4">
                  No.
                </TableHead>
                <TableHead className="px-2 py-3 md:px-4 md:py-4">
                  Title
                </TableHead>
                <TableHead className="hidden w-[150px] px-2 py-3 md:table-cell md:px-4 md:py-4">
                  Post Date
                </TableHead>
                <TableHead className="w-[60px] px-2 py-3 md:w-[100px] md:px-4 md:py-4">
                  Download
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: Number.parseInt(pageSize) }).map(
                  (_, i) => <NoticeSkeleton key={i} />,
                )
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-2 py-4 text-center text-red-500 md:px-4"
                  >
                    Error loading notices. Please try again later.
                  </TableCell>
                </TableRow>
              ) : data?.notices.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-2 py-4 text-center md:px-4"
                  >
                    No notices found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.notices.map((notice, index) => (
                  <TableRow key={notice.id}>
                    <TableCell className="px-2 py-2 md:px-4 md:py-4">
                      {startNumber + index}
                    </TableCell>
                    <TableCell className="px-2 py-2 md:px-4 md:py-4">
                      <div className="line-clamp-2 md:line-clamp-1">
                        {notice.title}
                      </div>
                    </TableCell>
                    <TableCell className="hidden px-2 py-2 md:table-cell md:px-4 md:py-4">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-2 py-2 md:px-4 md:py-4">
                      {notice.pdfUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(notice.pdfUrl, "_blank")}
                        >
                          <FileDown className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              Showing {startNumber} to{" "}
              {Math.min(
                startNumber + data.notices.length - 1,
                data.totalNotices,
              )}{" "}
              of {data.totalNotices} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>

                {[...Array(data.totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === data.totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(data.totalPages, p + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
