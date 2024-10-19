"use client";

import { FetchSingleDesign } from "@/components/fetch/design/FetchSingleDesign";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import Image from "next/image";
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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image || "";
    link.download = designName || "design";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                onError={() => setImageLoaded(true)} // Handle image loading errors
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
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
              {/* Removed ImageWithDimensions since it's no longer needed */}
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
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={author?.image} alt={author?.name} />
                  <AvatarFallback>
                    {author?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{author?.name}</p>
                </div>
              </div>
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
