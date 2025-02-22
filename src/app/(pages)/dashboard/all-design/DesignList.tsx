"use client";

import {
  AlertCircle,
  Command,
  Loader2,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import PaginationUi from "@/components/common/pagination/PaginationUi";
import { designCategories } from "@/components/data/ProductCategory";
import { DesignType } from "@/components/interface/DesignType";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useFetchUserDesign } from "@/services/design";
import DesignCard from "./DesignCard";

export function DesignList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = React.useState<string>(
    searchParams.get("category") || "all",
  );
  const [searchQuery, setSearchQuery] = React.useState<string>(
    searchParams.get("query") || "",
  );
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const handleFilterChange = React.useCallback(
    (value: string) => {
      setCategory(value);
      router.push(
        `/dashboard/all-design?category=${value}&query=${searchQuery}&page=1`,
      );
      setIsFiltersOpen(false);
    },
    [router, searchQuery],
  );

  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
    },
    [],
  );

  React.useEffect(() => {
    router.push(
      `/dashboard/all-design?category=${category}&query=${searchQuery}&page=1`,
    );
  }, [router, category, searchQuery]);

  const { isLoading, data, isError, refetch } = useFetchUserDesign({
    page,
    category,
    searchQuery,
  });

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold">Error loading designs</h2>
        <p className="text-muted-foreground">Please try again later.</p>
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-10 space-y-8 px-4">
      <div className="sticky top-0 z-10 -mx-4 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-9 md:max-w-sm"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter designs by category
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <Select value={category} onValueChange={handleFilterChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="all">All Designs</SelectItem>
                        {designCategories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value
                              .toLowerCase()
                              .replace(/\s+/g, "_")}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          isLoading && "opacity-60",
        )}
      >
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="h-48 animate-pulse bg-muted" />
              <CardContent className="mt-4 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>
          ))
        ) : data?.data.length === 0 ? (
          <div className="col-span-full flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-3">
              <Command className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">No designs found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your filters or search keywords
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setCategory("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          data?.data.map((design: DesignType) => (
            <DesignCard key={design.id} design={design} refetch={refetch} />
          ))
        )}
      </div>

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-8">
          <PaginationUi
            totalPages={data.meta.totalPages}
            category={category}
            currentPage={page}
            query={searchQuery}
          />
        </div>
      )}
    </div>
  );
}
