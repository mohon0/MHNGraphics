"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  // Destructure data for easier access
  const { image, name: designName, author, tags }: DesignData = data || {};

  const getTransformedImageUrl = (height: number, width: number) => {
    return image.replace(
      "/upload/",
      `/upload/h_${height},w_${width},f_jpg,c_fill,fl_attachment/`,
    );
  };

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
                layout="fill"
                objectFit="contain"
                className={`transition-transform duration-700 ease-in-out ${
                  imageLoaded ? "scale-100 blur-0" : "scale-105 blur-lg"
                }`}
                onLoadingComplete={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
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
                  <DropdownMenuItem asChild>
                    <a href={getTransformedImageUrl(667, 1000)} download>
                      <p className="flex items-center gap-1 text-sm">
                        <span className="font-bold">Small</span>
                        <span>667</span>
                        <span>
                          <X />
                        </span>
                        <span>1000</span>
                      </p>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={getTransformedImageUrl(1000, 1500)} download>
                      <p className="flex items-center gap-1 text-sm">
                        <span className="font-bold">Medium</span>
                        <span>1000</span>
                        <span>
                          <X />
                        </span>
                        <span>1500</span>
                      </p>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={getTransformedImageUrl(2000, 1333)} download>
                      <p className="flex items-center gap-1 text-sm">
                        <span className="font-bold">Large</span>
                        <span>2000</span>
                        <span>
                          <X />
                        </span>
                        <span>1333</span>
                      </p>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={image} download>
                      <p className="flex items-center gap-1 text-sm">
                        <span className="font-bold">Orginal</span>
                      </p>
                    </a>
                  </DropdownMenuItem>
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
