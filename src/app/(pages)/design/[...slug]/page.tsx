"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleCheckBig, Download, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiCanva } from "react-icons/si";

interface PageProps {
  params: { slug: string[] };
}

interface DesignData {
  image: string;
  name: string;
  author: { name: string; image: string };
  tags: string[];
  authorId: string;
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
    <div className="container mx-auto my-6 md:my-10">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="relative overflow-hidden lg:col-span-8">
          {isLoading ? (
            <Skeleton className="aspect-[16/9] w-full" />
          ) : (
            <div className="relative aspect-auto w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={image}
                alt={designName || "Design image"}
                className={`h-auto w-full object-contain transition-opacity duration-700 ease-in-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                layout="responsive"
                width={1000}
                height={1000}
              />
              {!imageLoaded && (
                <Skeleton className="absolute inset-0 h-full w-full" />
              )}
            </div>
          )}
        </div>
        <Card className="lg:col-span-4">
          <CardContent className="space-y-2 pt-6">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            ) : (
              <>
                <p className="inline-flex items-center gap-2 text-wrap text-sm">
                  <CircleCheckBig className="h-4 w-4" />
                  Free for use under the MHN{" "}
                  <Link
                    className="text-primary underline"
                    href="/content-license"
                  >
                    Content License
                  </Link>
                </p>
                <div>
                  <div className="flex justify-between gap-5">
                    <Button className="flex-grow">
                      <SiCanva />
                      <span>Edit Image</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="flex-grow">
                          <Download className="mr-2 h-5 w-5" /> Download
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <p className="p-2 text-sm text-muted-foreground">
                          File Size
                        </p>
                        {imageDimensions && (
                          <>
                            <DropdownMenuItem asChild>
                              <a
                                href={getTransformedImageUrl(
                                  imageDimensions.width,
                                  imageDimensions.height,
                                  500,
                                )}
                                download
                                className="cursor-pointer"
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
                                  1000,
                                )}
                                download
                                className="cursor-pointer"
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
                                  1500,
                                )}
                                download
                                className="cursor-pointer"
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
                                className="cursor-pointer"
                              >
                                Original ({imageDimensions?.width} x{" "}
                                {imageDimensions?.height})
                              </a>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-10 flex w-full gap-4">
                    <Button variant="outline" className="flex-grow">
                      <Heart className="mr-2 h-5 w-5" /> Like
                    </Button>
                    <Button variant="outline" className="flex-grow">
                      <Heart className="mr-2 h-5 w-5" /> Comment
                    </Button>
                    <Button variant="outline" className="flex-grow">
                      <Share2 className="mr-2 h-5 w-5" /> Share
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h2 className="mb-2 text-lg font-semibold">
                    Image Information
                  </h2>

                  <p>
                    <span className="font-medium">Size:</span>{" "}
                    {imageDimensions
                      ? `${imageDimensions.width} x ${imageDimensions.height}`
                      : "Loading..."}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> JPG
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 space-y-6 lg:mt-12">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 text-gray-700 md:flex-row md:items-center md:justify-between md:space-y-0">
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
                  <p className="text-sm text-gray-500">View Profile</p>
                </div>
              </Link>
              <Button variant="outline">Follow</Button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {designName}
            </h1>
            <div className="space-y-2">
              <p className="font-medium">Related Tags:</p>
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag: string, index: number) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={index}
                    className="rounded-full"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
