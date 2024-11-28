"use client";

import PaginationUi from "@/components/common/pagination/PaginationUi";
import DesignSkeleton from "@/components/common/skeleton/DesignSkeleton";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { DesignType } from "@/components/interface/DesignType";
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
                  item.name,
                  item.createdAt,
                )}
                key={item.id}
                className="image-container py-2"
              >
                <div className="group relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover py-2 transition-all duration-300 group-hover:brightness-50"
                    width={500}
                    height={500}
                    loading="lazy"
                  />

                  <div className="absolute bottom-6 left-2 right-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="line-clamp-1 text-sm font-semibold">
                      {item.name}
                    </h3>
                  </div>
                </div>
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
