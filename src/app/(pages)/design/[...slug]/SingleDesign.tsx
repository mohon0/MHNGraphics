"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import { DesignType } from "@/components/interface/DesignType";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageDimensions, getAspectRatio } from "@/utils/imageDimensions";
import { AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthorAndTags, AuthorAndTagsSkeleton } from "./AuthorAndTags";
import { Comments } from "./Comments";
import { DesignDetails, DesignDetailsSkeleton } from "./DesignDetails";

interface PageProps {
  params: { slug: string[] };
}

export default function SingleDesign({ params }: PageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const aspectRatio = imageDimensions
    ? getAspectRatio(imageDimensions.width, imageDimensions.height)
    : 1;
  const imageContainerClass =
    aspectRatio > 1.5
      ? "h-auto aspect-[3/2]"
      : "h-[30rem] md:h-[40rem] lg:h-[50rem]";

  return (
    <div className="container mx-auto my-8 px-4 md:my-12 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          {isLoading ? (
            <Skeleton className="h-[30rem] w-full rounded-xl md:h-[40rem] lg:h-[50rem]" />
          ) : (
            <Card
              className={`relative flex w-full overflow-hidden ${imageContainerClass}`}
            >
              <Image
                src={image}
                alt={designName || "Design image"}
                className={`object-contain transition-opacity duration-700 ease-in-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
            </Card>
          )}

          <div className="mt-8 space-y-6 lg:mt-12">
            {isLoading ? (
              <AuthorAndTagsSkeleton />
            ) : (
              <AuthorAndTags data={data} />
            )}
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              {isLoading ? (
                <Skeleton className="h-24 w-full" />
              ) : (
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: description || "" }}
                />
              )}
            </CardContent>
          </Card>

          <Card className="mt-8 lg:mt-12">
            <CardContent className="p-6">
              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <Comments data={data} refetch={refetch} />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
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
