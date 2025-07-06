"use client";

import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFetchAllDesign } from "@/services/design";
import type { Design } from "@/utils/Interface";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <section className="p-2 py-12 md:py-20">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              {title}
            </h2>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="p-2 py-12 md:py-20">
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

  // Don't render on server to prevent hydration issues
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
          <Button asChild variant="outline" className="group bg-transparent">
            <Link href={viewAllLink}>
              View all designs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Grid Layout - 2 columns on mobile, 5 columns on desktop */}
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
          {designs.map((design: Design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </div>
      <Button
        asChild
        variant="outline"
        className="mx-auto mt-10 flex w-fit items-center justify-center"
      >
        <Link href={viewAllLink}>
          View all designs
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
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
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
          <h3 className="line-clamp-1 text-xs font-medium sm:text-sm">
            {design.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
