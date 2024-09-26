"use client";
import PaginationUi from "@/components/common/pagination/PaginationUi";
import DesignSkeleton from "@/components/common/skeleton/DesignSkeleton";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { DesignType } from "@/components/interface/DesignType";
import Header from "@/components/layout/Header/Header";
import Image from "next/image";
import Link from "next/link";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

export default function Design({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { isLoading, data, isError } = FetchAllDesign(currentPage);

  return (
    <>
      <Header />

      <div className="mx-10 my-10">
        <h1 className="mb-10 text-center text-3xl font-bold">
          All The Assets You Will Ever Need
        </h1>
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

        {/* Pagination */}
        {data?.meta && data.meta.totalPages > 1 && (
          <div className="mt-8 text-center">
            <PaginationUi totalPages={data.meta.totalPages} />
          </div>
        )}
      </div>
    </>
  );
}
