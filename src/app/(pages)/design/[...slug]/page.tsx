"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { convertToReadableDate } from "@/components/helper/date/convertDateString";
import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
  CircleCheckBig,
  Download,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
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
            <Skeleton className="h-[33rem] w-full" />
          ) : (
            <div className="relative h-[33rem] w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={designName || "Design image"}
                className={`h-full w-full object-contain object-top transition-opacity duration-700 ease-in-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                fill // Ensures the image fills the container
                priority // Optimized for above-the-fold images
              />
              {!imageLoaded && (
                <Skeleton className="absolute inset-0 h-full w-full" />
              )}
            </div>
          )}
        </div>

        <Card className="h-fit lg:col-span-4">
          <CardContent className="space-y-2 pt-6">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-8 w-full" />
                <div>
                  <div className="flex justify-between gap-5">
                    <Skeleton className="h-10 w-full flex-grow" />
                    <Skeleton className="h-10 w-full flex-grow" />
                  </div>
                  <div className="mt-6 flex w-full gap-4">
                    <Skeleton className="h-10 w-full flex-grow" />
                    <Skeleton className="h-10 w-full flex-grow" />
                    <Skeleton className="h-10 w-full flex-grow" />
                  </div>
                </div>
                <div className="w-full pt-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="mt-2 h-4 w-1/3" />
                  <div className="mt-4">
                    <Skeleton className="h-4 w-1/4" />
                    <div className="mt-2 space-y-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                </div>
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
                  <div className="mt-6 flex w-full gap-4">
                    <Button variant="outline" className="flex-grow">
                      <Heart className="mr-2 h-5 w-5" /> Love
                    </Button>
                    <Button variant="outline" className="flex-grow">
                      <MessageSquare className="mr-2 h-5 w-5" /> Comment
                    </Button>
                    <Button variant="outline" className="flex-grow">
                      <Share2 className="mr-2 h-5 w-5" /> Share
                    </Button>
                  </div>
                </div>
                <div className="w-full pt-4">
                  <p className="flex items-center justify-between">
                    <span className="text-muted-foreground">View:</span>
                    <span>1000</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-muted-foreground">Download:</span>
                    <span>100</span>
                  </p>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="details">
                      <AccordionTrigger>Show details</AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p className="flex items-center justify-between">
                          <span className="text-muted-foreground">Love:</span>{" "}
                          20
                        </p>
                        <p className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Resolution:
                          </span>{" "}
                          {imageDimensions
                            ? `${imageDimensions.width} x ${imageDimensions.height}`
                            : "Loading..."}
                        </p>
                        <p className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Media type:
                          </span>{" "}
                          JPG
                        </p>
                        <p className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Published date:
                          </span>
                          {convertToReadableDate(data.createdAt)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 space-y-6 lg:mt-12">
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            <Skeleton className="h-8 w-3/4" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Author Section */}
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
            </div>

            {/* Design Title */}
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {designName}
            </h1>

            {/* Related Tags */}
            {tags && tags.filter((tag) => tag.trim() !== "").length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Related Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {tags
                    .filter((tag) => tag.trim() !== "")
                    .map((tag: string, index: number) => (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
