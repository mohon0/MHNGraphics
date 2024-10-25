"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page({ params }: { params: { slug: string[] } }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [category, subcategory, day, month, year, name] = params.slug;

  const { isLoading, data, isError } = FetchSingleDesign({
    category,
    subcategory,
    day,
    month,
    year,
    name,
  });

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        Error loading design.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted md:col-span-9">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <>
              <Image
                src={data.image}
                alt={data.name || "Design image"}
                layout="fill"
                objectFit="contain"
                className={`duration-700 ease-in-out ${
                  imageLoaded ? "scale-100 blur-0" : "scale-110 blur-2xl"
                }`}
                onLoadingComplete={() => setImageLoaded(true)}
              />
              {!imageLoaded && <Skeleton className="absolute inset-0" />}
            </>
          )}
        </div>
        <div className="md:col-span-3">
          <div className="mt-6">
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </>
        ) : (
          <div className="mt-10">
            <div></div>
            <h1 className="text-2xl font-bold">{data.name}</h1>

            <p className="text-muted-foreground">{`${day}/${month}/${year}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
