"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import { DesignType } from "@/components/interface/DesignType";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageDimensions } from "@/utils/imageDimensions";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthorAndTags, AuthorAndTagsSkeleton } from "./AuthorAndTags";
import { Comments } from "./Comments";
import { DesignDetails, DesignDetailsSkeleton } from "./DesignDetails";

interface PageProps {
  params: { slug: string[] };
}

export default function SingleDesign({ params }: PageProps) {
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [category, day, month, year, name] = params.slug;

  const { isLoading, data, isError, refetch } = FetchSingleDesign({
    category,
    day,
    month,
    year,
    name,
  });

  useEffect(() => {
    if (data?.image) {
      getImageDimensions(data.image)
        .then((dimensions) => setImageDimensions(dimensions))
        .catch((error) =>
          console.error("Failed to fetch image dimensions:", error),
        );
    }
  }, [data?.image]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    refetch();
  };

  if (isError) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center space-y-4 p-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-xl font-semibold">Error Loading Design</h2>
            <p className="text-center text-muted-foreground">
              We couldn&apos;t load the design. Please try again.
            </p>
            <Button
              onClick={handleRetry}
              disabled={retryCount >= 3}
              className="w-full"
            >
              {retryCount >= 3 ? "Too many attempts" : "Retry"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { image, name: designName, description }: DesignType = data || {};

  return (
    <div className="container mx-auto my-8 px-2 md:my-12 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Main content */}
        <div className="lg:col-span-8">
          {isLoading ? (
            <Skeleton className="h-[30rem] w-full rounded-xl md:h-[40rem] lg:h-[50rem]" />
          ) : (
            <div className="bg-secondary md:h-[38rem]">
              <Image
                src={image}
                alt={designName || "Design image"}
                className="h-full w-full object-scale-down"
                height={1000}
                width={1000}
                priority
              />
            </div>
          )}

          {/* Design details for mobile */}
          <div className="mt-6 lg:hidden">
            <Card>
              <CardContent className="space-y-6 p-6">
                {isLoading ? (
                  <DesignDetailsSkeleton />
                ) : (
                  <DesignDetails
                    data={data}
                    imageDimensions={imageDimensions}
                    params={params}
                    refetch={refetch}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Author and Tags */}
          <div className="mt-8 space-y-6 lg:mt-12">
            {isLoading ? (
              <AuthorAndTagsSkeleton />
            ) : (
              <AuthorAndTags data={data} />
            )}
          </div>

          {/* Description */}
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : description && description.length > 11 ? (
            <Card className="mt-6">
              <CardContent className="p-2 md:p-6">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: description || "" }}
                />
              </CardContent>
            </Card>
          ) : (
            ""
          )}

          {/* Comments block */}
          <div className="mt-8 lg:mt-12">
            {isLoading ? (
              <Skeleton className="h-48 w-full" />
            ) : (
              <Comments data={data} refetch={refetch} />
            )}
          </div>
        </div>

        {/* Sidebar Design Details for large screens */}
        <div className="hidden lg:col-span-4 lg:block">
          <Card className="sticky top-20">
            <CardContent className="space-y-6 p-6">
              {isLoading ? (
                <DesignDetailsSkeleton />
              ) : (
                <DesignDetails
                  data={data}
                  imageDimensions={imageDimensions}
                  params={params}
                  refetch={refetch}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
