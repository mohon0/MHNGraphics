"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import img1 from "@/images/hero/1.jpg";
import img2 from "@/images/hero/2.jpg";
import img3 from "@/images/hero/3.jpg";
import { ChevronDown, Search } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const imageArray: StaticImageData[] = [img1, img2, img3];

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [backgroundImage, setBackgroundImage] = useState<StaticImageData>(img1);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const randomImage =
      imageArray[Math.floor(Math.random() * imageArray.length)];
    setBackgroundImage(randomImage);
    setIsLoading(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to /search with query parameters
    router.push(
      `/search?category=${encodeURIComponent(searchFilter)}&query=${encodeURIComponent(
        searchQuery,
      )}&page=1`,
    );
  };

  const filters = ["All", "Photos", "Videos", "Vectors", "Icons"];

  if (isLoading) {
    return (
      <div className="relative h-[29.5rem]">
        <Skeleton className="h-full w-full bg-gray-300" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-4 md:space-y-8 lg:space-y-10">
          <div className="w-full max-w-2xl text-center">
            <Skeleton className="mb-4 h-12 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="h-12 w-full max-w-xl rounded-full sm:max-w-2xl md:max-w-3xl" />
          <div className="flex w-full max-w-xl flex-wrap justify-center gap-2">
            {filters.map((_, index) => (
              <Skeleton key={index} className="h-10 w-20" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        src={backgroundImage}
        alt="Hero banner image showcasing creative designs"
        width={1920}
        height={1080}
        priority
        className="h-[29.5rem] w-full object-cover brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-black bg-opacity-40 px-4 md:space-y-8 lg:space-y-10">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            Create Great Designs, Faster
          </h1>
          <p className="text-base text-slate-200 drop-shadow sm:text-lg md:text-xl">
            High-quality photos, videos, vectors, PSD, AI images, icons... to go
            from ideas to outstanding designs
          </p>
        </div>
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl"
        >
          <div className="flex overflow-hidden rounded-full bg-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 px-4 text-gray-700 hover:bg-gray-100 focus:ring-0 sm:h-12"
                >
                  {searchFilter} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {filters.map((filter) => (
                  <DropdownMenuItem
                    key={filter}
                    onSelect={() => setSearchFilter(filter)}
                  >
                    {filter}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for images, videos, vectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full pl-4 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 sm:h-12"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full focus:ring-0"
              >
                <Search className="h-5 w-5 text-white" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </form>
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              className="text-white hover:bg-white hover:bg-opacity-20 focus:ring-0"
              onClick={() => setSearchFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
