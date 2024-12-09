"use client";

import { FetchRelatedDesign } from "@/components/fetch/design/FetchRelatedDesign";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export default function RelatedDesign({ postId }: { postId: string }) {
  const { isLoading, data, isError } = FetchRelatedDesign(postId);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !data || data.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No related designs found.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Related Designs</h2>
      <Carousel className="mx-auto w-full">
        <CarouselContent>
          {data.map((design: any) => (
            <CarouselItem
              key={design.id}
              className="basis-10/12 transition-all duration-300 hover:brightness-75 md:basis-1/3 lg:basis-1/5"
            >
              <Link
                href={createSlug(
                  design.category,
                  design.name,
                  design.createdAt,
                )}
              >
                <div className="space-y-3">
                  <Image
                    src={design.image}
                    alt={design.name}
                    width={300}
                    height={200}
                    className="h-44 w-full rounded-md object-cover"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-10" />
        <CarouselNext className="-translate-x-10" />
      </Carousel>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="flex gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-72" />
            <Skeleton className="h-6 w-48" />
          </div>
        ))}
      </div>
    </div>
  );
}
