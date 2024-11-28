"use client";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { DesignType } from "@/components/interface/DesignType";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function ImageMarquee() {
  const { isLoading, data, isError } = FetchAllDesign({
    page: 1,
    category: "all",
    searchQuery: "",
  });

  if (isLoading) {
    return (
      <section className="space-y-6 md:my-20">
        <h2 className="mb-6 text-center text-2xl font-bold md:mb-10 md:text-4xl">
          View Design & Sell Content
        </h2>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-6 md:my-20">
        <h2 className="mb-6 text-center text-2xl font-bold md:mb-10 md:text-4xl">
          View Design & Sell Content
        </h2>
        <p>There was an error loading the designs. Please try again later.</p>
      </section>
    );
  }

  const designs = data?.data || [];
  const totalItems = data?.meta?.totalItems || 0;

  const firstSliderData =
    totalItems > 20 ? designs.slice(0, Math.ceil(designs.length / 2)) : designs;
  const secondSliderData =
    totalItems > 20 ? designs.slice(Math.ceil(designs.length / 2)) : designs;

  return (
    <section className="overflow-hidden md:my-20 md:space-y-6">
      <h2 className="mb-2 text-center text-2xl font-bold md:mb-10 md:text-4xl">
        View Design & Sell Content
      </h2>

      {/* First Marquee */}
      <Marquee pauseOnHover={true} speed={40} className="py-4">
        {firstSliderData.map((design: DesignType) => (
          <Link
            href={createSlug(design.category, design.name, design.createdAt)}
            key={design.id}
          >
            <div className="group relative mx-2 h-52 w-full flex-shrink-0 overflow-hidden">
              <Image
                src={design.image}
                alt={design.name || "Design Image"}
                width={160}
                height={160}
                className="h-full w-full object-contain transition-transform group-hover:scale-110"
                loading="lazy" // Lazy load images for better performance
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="line-clamp-1 text-sm font-semibold">
                  {design.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </Marquee>

      {/* Second Marquee */}
      <Marquee
        pauseOnHover={true}
        direction="right"
        speed={50}
        className="py-4"
      >
        {secondSliderData.map((design: DesignType) => (
          <Link
            href={createSlug(
              design.category,
              design.name,
              design.createdAt,
            )}
            key={design.id}
          >
            <div className="group relative mx-2 h-52 w-full flex-shrink-0 overflow-hidden">
              <Image
                src={design.image}
                alt={design.name || "Design Image"}
                width={160}
                height={160}
                className="h-full w-full object-contain transition-transform group-hover:scale-110"
                loading="lazy" // Lazy load images for better performance
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="line-clamp-1 text-sm font-semibold">
                  {design.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
