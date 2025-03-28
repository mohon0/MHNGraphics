"use client";

import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFetchAllDesign } from "@/services/design";
import { Design } from "@/utils/Interface";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface ImageMarqueeProps {
  title?: string;
  viewAllLink?: string;
}

export default function ImageMarquee({
  title = "View Design & Sell Content",
  viewAllLink = "/designs",
}: ImageMarqueeProps) {
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isLoading, data, isError } = useFetchAllDesign({
    page: 1,
    category: "all",
    searchQuery: "",
    tag: "",
  });

  if (isLoading) {
    return (
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              {title}
            </h2>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="text-destructive">
              There was an error loading the designs. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const designs = data?.data || [];
  const totalItems = data?.meta?.totalItems || 0;

  // Only split the data if we have enough items
  const firstSliderData =
    totalItems > 10 ? designs.slice(0, Math.ceil(designs.length / 2)) : designs;

  const secondSliderData =
    totalItems > 10
      ? designs.slice(Math.ceil(designs.length / 2))
      : designs.slice().reverse(); // Reverse the array for visual variety if not enough items

  // Don't render marquees on server to prevent hydration issues
  if (!isClient) {
    return (
      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <div className="h-[200px] md:h-[300px]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="container mx-auto mb-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <Button asChild variant="outline" className="group">
            <Link href={viewAllLink}>
              View all designs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-8 overflow-hidden">
        {/* First Marquee */}
        <div className="relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 after:bg-gradient-to-l after:from-background after:to-transparent">
          <Marquee
            pauseOnHover={true}
            speed={30}
            className="py-4"
            gradient={false}
          >
            {firstSliderData.map((design: Design) => (
              <DesignCard
                key={design.id}
                design={design}
                className="mx-3 w-[200px] md:w-[240px]"
              />
            ))}
          </Marquee>
        </div>

        {/* Second Marquee */}
        <div className="relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 after:bg-gradient-to-l after:from-background after:to-transparent">
          <Marquee
            pauseOnHover={true}
            direction="right"
            speed={40}
            className="py-4"
            gradient={false}
          >
            {secondSliderData.map((design: Design) => (
              <DesignCard
                key={design.id}
                design={design}
                className="mx-3 w-[200px] md:w-[240px]"
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

interface DesignCardProps {
  design: Design;
  className?: string;
}

function DesignCard({ design, className }: DesignCardProps) {
  return (
    <Link
      href={createSlug({ name: design.name, id: design.id })}
      className={cn("block", className)}
    >
      <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:border-primary/50 hover:shadow-md">
        <div className="aspect-square overflow-hidden">
          <Image
            src={design.image || "/placeholder.svg"}
            alt={design.name || "Design"}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
          <h3 className="line-clamp-1 text-sm font-medium md:text-base">
            {design.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
