"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PageProps {
  params: { slug: string[] };
}

interface DesignData {
  image: string;
  name: string;
  author: { name: string; image: string };
  tags: string[];
}

export default function Page({ params }: PageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [category, subcategory, day, month, year, name] = params.slug;

  const { isLoading, data, isError } = FetchSingleDesign({
    category,
    subcategory,
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

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div
          role="alert"
          aria-live="assertive"
          className="font-semibold text-red-500"
        >
          Error loading design.
        </div>
      </div>
    );
  }

  const getDynamicDimensions = (
    originalWidth: number,
    originalHeight: number,
    targetHeight: number,
  ) => {
    const aspectRatio = originalWidth / originalHeight;
    const width = Math.round(targetHeight * aspectRatio);
    return { width, height: targetHeight };
  };

  const getTransformedImageUrl = (
    originalWidth: number,
    originalHeight: number,
    targetHeight: number,
  ) => {
    const { width, height } = getDynamicDimensions(
      originalWidth,
      originalHeight,
      targetHeight,
    );
    return data?.image?.replace(
      "/upload/",
      `/upload/h_${height},w_${width},f_jpg,c_fill,fl_attachment/`,
    );
  };

  const { image, name: designName, author, tags }: DesignData = data || {};

  return (
    <div className="container mx-auto my-10 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="relative overflow-hidden lg:col-span-9">
          {isLoading ? (
            <Skeleton className="aspect-[16/9] w-full" />
          ) : (
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={image}
                alt={designName || "Design image"}
                className={`aspect-video h-full w-fit object-contain transition-transform duration-700 ease-in-out ${
                  imageLoaded ? "scale-100 blur-0" : "scale-105 blur-lg"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                height={1000}
                width={1000}
              />
              {!imageLoaded && <Skeleton className="absolute inset-0" />}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-4 lg:col-span-3">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-full" />
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Download className="mr-2 h-5 w-5" /> Download Options
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <p className="p-2 text-sm text-muted-foreground">File Size</p>
                  {imageDimensions && (
                    <>
                      <DropdownMenuItem asChild>
                        <a
                          href={getTransformedImageUrl(
                            imageDimensions.width,
                            imageDimensions.height,
                            500, // Target height for small size
                          )}
                          download
                        >
                          Small (
                          {
                            getDynamicDimensions(
                              imageDimensions.width,
                              imageDimensions.height,
                              500,
                            ).width
                          }{" "}
                          x 500)
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={getTransformedImageUrl(
                            imageDimensions.width,
                            imageDimensions.height,
                            1000, // Target height for medium size
                          )}
                          download
                        >
                          Medium (
                          {
                            getDynamicDimensions(
                              imageDimensions.width,
                              imageDimensions.height,
                              1000,
                            ).width
                          }{" "}
                          x 1000)
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={getTransformedImageUrl(
                            imageDimensions.width,
                            imageDimensions.height,
                            1500, // Target height for large size
                          )}
                          download
                        >
                          Large (
                          {
                            getDynamicDimensions(
                              imageDimensions.width,
                              imageDimensions.height,
                              1500,
                            ).width
                          }{" "}
                          x 1500)
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={data?.image?.replace(
                            "/upload/",
                            "/upload/fl_attachment/",
                          )}
                          download
                        >
                          Original ({imageDimensions?.width} x{" "}
                          {imageDimensions?.height})
                        </a>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      <div className="mt-8 space-y-4 lg:mt-12">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </>
        ) : (
          <div className="space-y-2">
            <div className="mt-6 flex flex-col space-y-4 text-gray-700">
              <Link
                href={`/profile?id=${data.authorId}`}
                className="flex items-center space-x-4"
              >
                <Avatar>
                  <AvatarImage src={author?.image} alt={author?.name} />
                  <AvatarFallback>
                    {author?.name?.charAt(0) || "MHN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{author?.name}</p>
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{designName}</h1>
              <div className="space-y-2">
                <p>Related Tags:</p>
                <div className="flex flex-wrap gap-4">
                  {tags?.map((tag: string, index: number) => (
                    <Button variant="outline" key={index}>
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
