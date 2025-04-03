"use client";

import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { designCategories } from "@/constant/DesignCategory";
import { useProfileDesign } from "@/services/profile";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import DesignGridSkeleton from "./design-grid-skeleton";
import DesignPagination from "./pagination";

interface DesignGridProps {
  id: string;
}

export default function DesignGrid({ id }: DesignGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Extract search parameters from URL
  const page = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("query") || "";
  const categoryParam = searchParams.get("category") || "all";
  const sortParam = searchParams.get("sort") || "newest";

  // Local state for form inputs
  const [localSearchTerm, setLocalSearchTerm] = useState(searchQuery);
  const take = 10;

  // Update URL with new search parameters
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      // Always include the ID
      newSearchParams.set("id", id);

      // Update or delete each parameter
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "" || (key === "page" && value === 1)) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams, id],
  );

  // Update URL when filters change
  const updateFilters = useCallback(
    (params: Record<string, string | number | null>) => {
      // Reset page to 1 when filters change
      if (!params.hasOwnProperty("page")) {
        params.page = 1;
      }

      startTransition(() => {
        router.push(`${pathname}?${createQueryString(params)}`, {
          scroll: false,
        });
      });
    },
    [pathname, router, createQueryString],
  );

  // Sync local search term with URL on initial load
  useEffect(() => {
    setLocalSearchTerm(searchQuery);
  }, [searchQuery]);

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchQuery) {
        updateFilters({ query: localSearchTerm || null });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, searchQuery, updateFilters]);

  // Fetch data based on URL parameters
  const {
    isPending: isDataLoading,
    data,
    isError,
  } = useProfileDesign({
    id,
    page,
    take,
    sort: sortParam,
    category: categoryParam !== "all" ? categoryParam : "",
    search: searchQuery || "",
  });

  const isLoading = isPending || isDataLoading;

  const totalPages = useMemo(() => {
    return data?.pagination?.totalPages || 1;
  }, [data?.pagination?.totalPages]);

  // Handle category change
  const handleCategoryChange = useCallback(
    (value: string) => {
      updateFilters({ category: value === "all" ? null : value });
    },
    [updateFilters],
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (value: string) => {
      updateFilters({ sort: value === "newest" ? null : value });
    },
    [updateFilters],
  );

  // Handle page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  // Render design grid content
  const renderDesignGrid = useMemo(() => {
    if (isLoading) {
      return <DesignGridSkeleton />;
    }

    if (!data?.data?.length) {
      return (
        <div className="flex h-60 items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium">No designs found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "This user hasn't created any designs yet"}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
        {data.data.map((design: any) => (
          <Link
            key={design.id}
            href={createSlug({ name: design.name, id: design.id })}
            className="mb-4 block break-inside-avoid"
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
    );
  }, [data, isLoading, searchQuery]);

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
              aria-label="Search designs"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={categoryParam}
              onValueChange={handleCategoryChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent align="end" className="w-56">
                <SelectItem value="all">All</SelectItem>
                {designCategories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value.toLowerCase().replace(/\s+/g, "_")}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sortParam}
              onValueChange={handleSortChange}
              disabled={isLoading}
            >
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

        {renderDesignGrid}

        {totalPages > 1 && (
          <div className="mt-8">
            <DesignPagination
              totalPages={totalPages}
              currentPage={page}
              id={id}
              onPageChange={handlePageChange}
              category={categoryParam !== "all" ? categoryParam : undefined}
              query={searchQuery || undefined}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
