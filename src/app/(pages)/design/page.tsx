"use client";

import DesignSkeleton from "@/components/common/skeleton/DesignSkeleton";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { DesignType } from "@/components/interface/DesignType";
import Header from "@/components/layout/Header/Header";
import Hero from "@/components/pages/home/hero/Hero";
import Image from "next/image";
import Link from "next/link";

// Message component for error or empty data states
function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

export default function Design() {
  const { isLoading, data, isError } = FetchAllDesign();

  return (
    <>
      {/* Always render Header */}
      <Header fixed />
      <Hero />
      <div className="mx-10 my-10">
        <p className="mb-10 text-center text-3xl font-bold">
          All The Assets You Will Ever Need
        </p>

        {/* Conditional rendering for loading, error, or data display */}
        {isLoading ? (
          <DesignSkeleton />
        ) : isError ? (
          <DesignMessage message="Something went wrong while fetching the designs." />
        ) : !Array.isArray(data) || data.length === 0 ? (
          <DesignSkeleton />
        ) : (
          <div className="columns-1 gap-4 md:columns-3">
            {data.map((item: DesignType) => (
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
      </div>
    </>
  );
}
