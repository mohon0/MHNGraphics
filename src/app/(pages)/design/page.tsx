"use client";
import PaginationUi from "@/components/common/pagination/PaginationUi";
import DesignSkeleton from "@/components/common/skeleton/DesignSkeleton";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { SlugToText } from "@/components/helper/slug/SlugToText";
import { DesignType } from "@/components/interface/DesignType";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();

  const categoryName = searchParams.get("category") || "All";
  const query = searchParams.get("query") || "";
  const tag = searchParams.get("tag") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { isLoading, data, isError } = FetchAllDesign({
    page,
    category: categoryName,
    searchQuery: query,
    tag,
  });

  // Function to clear the tag filter
  const clearTagFilter = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("tag"); // Remove the "tag" query parameter
    window.history.pushState({}, "", url.toString()); // Update the URL without reloading the page
  };

  return (
    <div>
      <div className="mx-2 my-10 md:mx-10">
        {isLoading ? (
          <DesignSkeleton />
        ) : isError ? (
          <DesignMessage message="Something went wrong while fetching the designs." />
        ) : !data?.data || data.data.length === 0 ? (
          <DesignMessage message="No designs available." />
        ) : (
          <div>
            {/* Display tag filter and clear button if a tag is selected */}
            {tag && (
              <div className="mb-4 flex items-center">
                <p className="text-lg font-semibold text-gray-800">
                  Filtering by tag:{" "}
                  <span className="text-blue-600">{SlugToText(tag)}</span>
                </p>
                <button
                  onClick={clearTagFilter}
                  className="ml-4 text-sm text-red-500 hover:text-red-700"
                >
                  Clear Tag
                </button>
              </div>
            )}

            <div className="columns-1 gap-4 md:columns-3">
              {data.data.map((item: DesignType) => (
                <Link
                  href={createSlug({ name: item.name, id: item.id })}
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
