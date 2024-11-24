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
  ImageDimensions,
  getAspectRatio,
  getDynamicDimensions,
  getTransformedImageUrl,
} from "@/utils/imageDimensions";
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
  createdAt: string;
}

export default function Page({ params }: PageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);

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

  const { image, name: designName, author, tags }: DesignData = data || {};

  const aspectRatio = imageDimensions
    ? getAspectRatio(imageDimensions.width, imageDimensions.height)
    : 1;
  const imageContainerClass =
    aspectRatio > 1.5 ? "h-auto aspect-[3/2]" : "h-[30rem] md:h-[40rem]";

  return (
    <div className="container mx-auto my-6 px-4 md:my-10 md:px-6">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {isLoading ? (
            <Skeleton className="h-[30rem] w-full md:h-[40rem]" />
          ) : (
            <div
              className={`relative flex w-full rounded-lg bg-secondary ${imageContainerClass}`}
            >
              <Image
                src={image}
                alt={designName || "Design image"}
                className={`rounded-lg object-contain transition-opacity duration-700 ease-in-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                fill
                priority
              />
            </div>
          )}
        </div>

        <Card className="h-fit lg:col-span-4">
          <CardContent className="space-y-4 pt-6">
            {isLoading ? (
              <DesignDetailsSkeleton />
            ) : (
              <DesignDetails data={data} imageDimensions={imageDimensions} />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-6 lg:mt-12">
        {isLoading ? <AuthorAndTagsSkeleton /> : <AuthorAndTags data={data} />}
      </div>
    </div>
  );
}

function DesignDetailsSkeleton() {
  return (
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
  );
}

interface DesignDetailsProps {
  data: DesignData;
  imageDimensions: ImageDimensions | null;
}

function DesignDetails({ data, imageDimensions }: DesignDetailsProps) {
  return (
    <>
      <p className="inline-flex items-center gap-2 text-wrap text-sm">
        <CircleCheckBig className="h-4 w-4" />
        Free for use under the MHN{" "}
        <Link className="text-primary underline" href="/content-license">
          Content License
        </Link>
      </p>
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button className="w-full sm:w-auto">
            <SiCanva className="mr-2" />
            <span>Edit Image</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <p className="p-2 text-sm text-muted-foreground">File Size</p>
              {imageDimensions && (
                <>
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={500}
                    label="Small"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={1000}
                    label="Medium"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={1500}
                    label="Large"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    label="Original"
                  />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <Heart className="mr-2 h-5 w-5" /> Love
          </Button>
          <Button variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-5 w-5" /> Comment
          </Button>
          <Button variant="outline" className="w-full">
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

        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="details">
            <AccordionTrigger>Show details</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Love:</span> 20
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Resolution:</span>{" "}
                {imageDimensions
                  ? `${imageDimensions.width} x ${imageDimensions.height}`
                  : "Loading..."}
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Media type:</span> JPG
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Published date:</span>
                {convertToReadableDate(data.createdAt)}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

interface DownloadMenuItemProps {
  imageDimensions: ImageDimensions;
  originalImage: string;
  targetHeight?: number;
  label: string;
}

function DownloadMenuItem({
  imageDimensions,
  originalImage,
  targetHeight,
  label,
}: DownloadMenuItemProps) {
  const { width, height } = targetHeight
    ? getDynamicDimensions(
        imageDimensions.width,
        imageDimensions.height,
        targetHeight,
      )
    : imageDimensions;

  const downloadUrl = targetHeight
    ? getTransformedImageUrl(
        originalImage,
        imageDimensions.width,
        imageDimensions.height,
        targetHeight,
      )
    : originalImage.replace("/upload/", "/upload/fl_attachment/");

  return (
    <DropdownMenuItem asChild>
      <a href={downloadUrl} download className="cursor-pointer">
        {label} ({width} x {height})
      </a>
    </DropdownMenuItem>
  );
}

function AuthorAndTagsSkeleton() {
  return (
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
  );
}

function AuthorAndTags({ data }: { data: DesignData }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 text-gray-700 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Link
          href={`/profile?id=${data.authorId}`}
          className="flex items-center space-x-4"
        >
          <Avatar>
            <AvatarImage src={data.author?.image} alt={data.author?.name} />
            <AvatarFallback>
              {data.author?.name?.charAt(0) || "MHN"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{data.author?.name}</p>
            <p className="text-sm text-gray-500">View Profile</p>
          </div>
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
        {data.name}
      </h1>

      {data.tags && data.tags.filter((tag) => tag.trim() !== "").length > 0 && (
        <div className="space-y-2">
          <p className="font-medium">Related Tags:</p>
          <div className="flex flex-wrap gap-2">
            {data.tags
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
  );
}
