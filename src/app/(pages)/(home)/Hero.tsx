"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import img1 from "@/images/hero/1.jpg";
import img2 from "@/images/hero/2.jpg";
import img3 from "@/images/hero/3.jpg";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSkeleton from "./skeleton";

const heroData = [
  {
    image: img2,
    title: "Design Smarter",
    subtitle: "Create Better",
    description:
      "Premium resources to craft outstanding designs with ease and speed.",
  },
  {
    image: img1,
    title: "Unleash Creativity",
    subtitle: "Without Limits",
    description:
      "Access thousands of professional assets for your next project.",
  },
  {
    image: img3,
    title: "Elevate Your",
    subtitle: "Visual Story",
    description:
      "Turn ideas into stunning visuals with our premium collection.",
  },
];

export default function HeroImmersiveEnhanced() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  // Image transition effect
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroData.length);
    setCurrentIndex(randomIndex);
    setIsLoading(false);

    // Set up image rotation
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedQuery = searchQuery.trim().replace(/\s+/g, "+");
    router.push(`/design?category=all&query=${formattedQuery}&page=1`);
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <HeroSkeleton />;
  }

  const categories = [
    { name: "All Designs", href: "/design?category=all&query=&page=1" },
    { name: "Photos", href: "/design?category=photos&query=&page=1" },
    {
      name: "Illustrations",
      href: "/design?category=illustrations&query=&page=1",
    },
    { name: "Templates", href: "/design?category=templates&query=&page=1" },
    { name: "Animations", href: "/design?category=animation&query=&page=1" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Full-screen background with parallax effect */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroData[currentIndex].image || "/placeholder.svg"}
              alt={`Hero background ${currentIndex + 1}`}
              fill
              priority
              placeholder="blur"
              className="object-cover object-center"
              onError={() => setError("Failed to load image")}
            />
            {/* Enhanced gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/70 to-black/85" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[700px] max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-2 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-white shadow-xs backdrop-blur-xs"
            >
              Premium Design Resources
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-xs sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">{heroData[currentIndex].title}</span>
              <span className="mt-2 block bg-linear-to-r from-gray-600 to-muted bg-clip-text text-transparent drop-shadow-sm">
                {heroData[currentIndex].subtitle}
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 drop-shadow-xs sm:text-xl">
              {heroData[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-2xl"
        >
          <form
            onSubmit={handleSearch}
            className="relative mx-auto mb-10 w-full max-w-2xl overflow-hidden rounded-full border border-white/30 bg-black/40 shadow-lg backdrop-blur-xs"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-white/70" />
              <Input
                type="text"
                placeholder="Search for templates, photos, illustrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 border-0 bg-transparent pl-12 pr-32 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg"
                aria-label="Search input"
              />
              <Button
                type="submit"
                className="absolute right-2 rounded-full px-6 py-2 shadow-md"
                aria-label="Submit search"
              >
                <span className="mr-2">Search</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <Button
                variant="outline"
                className="border-white/30 bg-black/40 text-white shadow-md backdrop-blur-xs hover:bg-white/10 hover:text-white"
              >
                {category.name}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          ))}
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform gap-2">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-primary shadow-xs"
                  : "bg-white/60 hover:bg-white/90",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </section>
  );
}
