"use client";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedDesign } from "@/services/design";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function RelatedDesign({ postId }: { postId: string }) {
  const { isLoading, data, isError } = useRelatedDesign(postId);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !data || data.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400">
        No related designs found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          More Like This
        </h2>
        <Link
          href="/design"
          className="text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-white"
        >
          View all designs
        </Link>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {data.data.map((design: any, index: number) => (
            <CarouselItem
              key={design.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link
                  href={createSlug({ name: design.name, id: design.id })}
                  className="group block overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200/60 bg-white shadow-lg transition-all group-hover:shadow-xl dark:border-zinc-800/60 dark:bg-zinc-900">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <Image
                      src={design.image || "/placeholder.svg"}
                      alt={design.name}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
                      <h3 className="line-clamp-1 font-medium">
                        {design.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white dark:bg-zinc-800/90 dark:hover:bg-zinc-800" />
        <CarouselNext className="-right-4 bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white dark:bg-zinc-800/90 dark:hover:bg-zinc-800" />
      </Carousel>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
