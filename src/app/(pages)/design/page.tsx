"use client";

import PaginationUi from "@/components/common/pagination/PaginationUi";
import DesignSkeleton from "@/components/common/skeleton/DesignSkeleton";
import { productCategories } from "@/components/data/ProductCategory";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { DesignType } from "@/components/interface/DesignType";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || "",
  );

  const handleFilterChange = useCallback(
    (value: string) => {
      setCategory(value);
      router.push(`/design?category=${value}&query=${searchQuery}&page=1`);
    },
    [router, searchQuery],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
      // Update URL parameters and trigger fetchDesign with debouncing within it
      router.push(`/design?category=${category}&query=${newQuery}&page=1`);
    },
    [router, category],
  );

  const handleSearch = useCallback(() => {
    router.push(`/design?category=${category}&query=${searchQuery}&page=1`);
  }, [router, category, searchQuery]);

  const categoryName = searchParams.get("category") || "All";
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { isLoading, data, isError } = FetchAllDesign({
    page,
    category: categoryName,
    searchQuery: query,
  });

  return (
    <div>
      <div className="mx-10 my-10">
        <div className="mb-10 flex flex-col items-center justify-center gap-3">
          <h1 className="text-center text-3xl font-bold">
            All The Assets You Will Ever Need
          </h1>
          <div className="mx-auto flex flex-col items-baseline gap-4 md:flex-row md:gap-20">
            <div className="mt-4 flex gap-4">
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Categories</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    {productCategories.map((category) => (
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
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Loading..." : "Filter"}
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button onClick={handleSearch} type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Search"}
              </Button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <DesignSkeleton />
        ) : isError ? (
          <DesignMessage message="Something went wrong while fetching the designs." />
        ) : !data?.data || data.data.length === 0 ? (
          <DesignMessage message="No designs available." />
        ) : (
          <div className="columns-1 gap-4 md:columns-3">
            {data.data.map((item: DesignType) => (
              <Link
                href={createSlug(
                  item.category,
                  item.subcategory,
                  item.name,
                  item.createdAt,
                )}
                key={item.id}
                className="image-container py-2"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover py-2"
                  width={500}
                  height={500}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        )}

        {data?.meta && data.meta.totalPages > 1 && (
          <div className="mt-8 text-center">
            <PaginationUi
              totalPages={data.meta.totalPages}
              category={categoryName}
              currentPage={page}
              query={query}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<DesignSkeleton />}>
      <SearchPageContent />
    </Suspense>
  );
}
