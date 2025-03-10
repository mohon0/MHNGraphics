"use client";

import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import { DesignType } from "@/components/interface/DesignType";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSingleDesign } from "@/services/design";
import { ImageDimensions } from "@/utils/imageDimensions";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Author, AuthorSkeleton, Tags, TagsSkeleton } from "./AuthorAndTags";
import { Comments } from "./Comments";
import { DesignDetails, DesignDetailsSkeleton } from "./DesignDetails";
import RelatedDesign from "./RelatedDesign";

type Params = Promise<{ slug: string }>;

export default function SingleDesign(props: { params: Params }) {
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const params = use(props.params);

  const slug = params.slug;
  const id = slug.split("_")[1];

  const { isLoading, data, isError, refetch } = useSingleDesign({
    id,
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
                onContextMenu={(e) => e.preventDefault()}
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

          {/* Author */}
          <div className="mt-8 space-y-6 lg:mt-12">
            {isLoading ? (
              <AuthorSkeleton />
            ) : (
              <Author
                author={data.author}
                title={data.name}
                authorId={data.authorId}
              />
            )}
          </div>

          {/* Description */}
          {isLoading ? (
            <Skeleton className="mt-4 h-24 w-full" />
          ) : description && description.length > 11 ? (
            <Card className="mt-6">
              <CardContent className="p-2 md:p-6">
                <div
                  className="prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: description || "" }}
                />
              </CardContent>
            </Card>
          ) : (
            ""
          )}

          {/* Tags */}
          <div className="mt-8 space-y-6 lg:mt-12">
            {isLoading ? <TagsSkeleton /> : <Tags tags={data.tags} />}
          </div>

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
      {/* Related Design */}

      <div className="mt-8 lg:mt-12">
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <RelatedDesign postId={data.id} />
        )}
      </div>
    </div>
  );
}
