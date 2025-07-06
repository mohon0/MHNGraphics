"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import img5 from "@/images/slider/icons.jpg";
import img4 from "@/images/slider/mockups.jpg";
import img1 from "@/images/slider/photo.jpg";
import img6 from "@/images/slider/sports.jpg";
import img3 from "@/images/slider/templates.jpg";
import img2 from "@/images/slider/vector.jpg";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const sliderData = [
  {
    id: 1,
    name: "People",
    description: "High-quality photos of people for your projects",
    img: img1,
    link: "/design?category=people&query=&page=1",
    color: "from-blue-600/80 to-indigo-700/80",
  },
  {
    id: 2,
    name: "Illustration",
    description: "Creative illustrations for unique designs",
    img: img2,
    link: "/design?category=illustrations&query=&page=1",
    color: "from-purple-600/80 to-pink-700/80",
  },
  {
    id: 3,
    name: "Mock Up",
    description: "Professional mockups for product presentations",
    img: img3,
    link: "/design?category=mockups&query=&page=1",
    color: "from-emerald-600/80 to-teal-700/80",
  },
  {
    id: 4,
    name: "Templates",
    description: "Ready-to-use templates for quick implementation",
    img: img4,
    link: "/design?category=templates&query=&page=1",
    color: "from-amber-600/80 to-orange-700/80",
  },
  {
    id: 5,
    name: "Icons",
    description: "Versatile icons for any design project",
    img: img5,
    link: "/design?category=icons&query=&page=1",
    color: "from-rose-600/80 to-red-700/80",
  },
  {
    id: 6,
    name: "Sports",
    description: "Dynamic sports imagery for active content",
    img: img6,
    link: "/design?category=sports&query=&page=1",
    color: "from-cyan-600/80 to-blue-700/80",
  },
];

export function Slider() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const autoplayRef = useRef<any>(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-muted/30" />
      <div className="absolute -left-20 -top-20 -z-10 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 -z-10 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:mb-16 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Explore Our <span className="text-primary">Asset Categories</span>
            </h2>
            <p className="mt-4 max-w-[40rem] text-muted-foreground">
              Discover our extensive collection of high-quality assets ready for
              your next creative project.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {current} / {count}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayRef.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {sliderData.map((item) => (
              <CarouselItem
                key={item.id}
                className="md:basic-1/3 basis-2/3 pl-4 lg:basis-1/4"
              >
                <Link href={item.link} className="group block h-full">
                  <div className="overflow-hidden rounded-xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* Image */}
                      <Image
                        src={item.img || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Gradient overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-t opacity-90",
                          item.color,
                        )}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h3 className="text-2xl font-bold tracking-tight">
                          {item.name}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-white/80">
                          {item.description}
                        </p>

                        <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
