"use client";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
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
import type { Design } from "@/utils/Interface";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DesignGridProps {
  designs: Design[];
  isLoading: boolean;
  sortOption: string;
  onSort: (option: string) => void;
  searchTerm?: string;
  onSearch?: (term: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function DesignGrid({
  designs,
  isLoading,
  sortOption,
  onSort,
  searchTerm = "",
  onSearch,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: DesignGridProps) {
  const [filters, setFilters] = useState({
    showFeatured: false,
    showRecent: true,
    showPopular: false,
  });

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (onSearch && localSearchTerm !== searchTerm) {
        onSearch(localSearchTerm);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, onSearch, searchTerm]);

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search designs..."
              className="pl-9"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Designs</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filters.showFeatured}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, showFeatured: checked }))
                  }
                >
                  Featured Designs
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.showRecent}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, showRecent: checked }))
                  }
                >
                  Recent Designs
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.showPopular}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, showPopular: checked }))
                  }
                >
                  Popular Designs
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortOption} onValueChange={onSort}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : designs.length === 0 ? (
          <div className="flex h-60 items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">No designs found</h3>
              <p className="text-muted-foreground">
                {localSearchTerm
                  ? "Try adjusting your search or filters"
                  : "This user hasn't created any designs yet"}
              </p>
            </div>
          </div>
        ) : (
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
            {designs.map((design) => (
              <Link
                key={design.id}
                href={createSlug({ name: design.name, id: design.id })}
                className="block"
              >
                <div className="group relative overflow-hidden rounded-lg">
                  <Image
                    src={design.image || "/placeholder.svg"}
                    alt={design.name}
                    className="w-full object-cover transition-all duration-300 group-hover:brightness-90"
                    width={500}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="line-clamp-1 text-sm font-medium">
                      {design.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && onPageChange && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) onPageChange(currentPage - 1);
                    }}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(page);
                        }}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        onPageChange(currentPage + 1);
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
