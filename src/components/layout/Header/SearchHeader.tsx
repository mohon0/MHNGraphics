"use client";

import { productCategories } from "@/components/data/ProductCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import DesktopMenu from "./DesktopMenu";

function SearchHeaderComponent({ fixed = false }: { fixed?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || "",
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleFilterChange = useCallback(
    (value: string) => {
      setCategory(value);
      router.push(`/design?category=${value}&query=${searchQuery}&page=1`);
    },
    [router, searchQuery],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
      // Update URL parameters and trigger fetchDesign with debouncing within it
      router.push(`/design?category=${category}&query=${newQuery}&page=1`);
    },
    [router, category],
  );

  const handleSearch = useCallback(() => {
    router.push(`/design?category=${category}&query=${searchQuery}&page=1`);
  }, [router, category, searchQuery]);

  return (
    <>
      <div>
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="z-20 ml-48 hidden lg:block">
                <DesktopMenu fixed={fixed} />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Pricing
              </Link>
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky left-0 top-0 z-10 border-b bg-background">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <motion.div
                className="mr-4"
                initial={{ y: -56 }}
                animate={{
                  y: isScrolled ? 0 : -56,
                  transition: {
                    default: { type: "spring" },
                  },
                }}
              >
                <Link
                  href="/"
                  className={`space-x-2 font-extrabold ${
                    fixed ? "text-white" : "text-black"
                  }`}
                >
                  <span className="text-2xl">MHN</span>
                  <span className="text-xl">Graphics</span>
                </Link>
              </motion.div>

              <Select
                defaultValue={category}
                onValueChange={handleFilterChange}
              >
                <SelectTrigger
                  className={`bg-background ${isScrolled ? "ml-10" : "-ml-44"} min-w-32 transition-all duration-200`}
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Categories</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    {productCategories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value
                          .toLowerCase()
                          .replace(/\s+/g, "_")}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button onClick={handleSearch} type="submit">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SearchHeader() {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton className="h-20" />
        </div>
      }
    >
      <SearchHeaderComponent />
    </Suspense>
  );
}
