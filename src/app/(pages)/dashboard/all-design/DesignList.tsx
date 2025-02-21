"use client";

import PaginationUi from "@/components/common/pagination/PaginationUi";
import { designCategories } from "@/components/data/ProductCategory";
import { FetchUserDesign } from "@/components/fetch/design/FetchUserDesign";
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
import { AlertCircle, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DesignCard from "./DesignCard";

export function DesignList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || "",
  );

  const categoryName = searchParams.get("category") || "All";
  const query = searchParams.get("query") || "";
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  const { isLoading, data, isError, refetch } = FetchUserDesign({
    page,
    category: categoryName,
    searchQuery: query,
  });

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString("query", searchInput));
  };

  const handleCategoryChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("category", value));
  };

  // 🔴 Show error message if there is an error fetching designs
  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold">Error loading designs</h2>
        <p className="text-muted-foreground">Please try again later.</p>
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🔹 Search & Category Filter */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
          <Select value={categoryName} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>All Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {designCategories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value.toLowerCase().replace(/\s+/g, "_")}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <form onSubmit={handleSearch} className="flex w-full gap-2 sm:w-auto">
            <Input
              placeholder="Search designs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full sm:w-[300px]"
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* 🔹 Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-48 bg-muted" />
              <CardContent className="mt-4">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        // 🔹 Show "No Designs Found" message
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-2 text-xl font-semibold">No designs found</h2>
          <p className="text-muted-foreground">
            Try adjusting your filters or search keywords.
          </p>
        </div>
      ) : (
        <>
          {/* 🔹 Display Designs */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.data.map((design: DesignType) => (
              <DesignCard key={design.id} design={design} refetch={refetch} />
            ))}
          </div>

          {/* 🔹 Pagination */}
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
        </>
      )}
    </div>
  );
}
