"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import QuickMenu from "./QuickMenu";
import { TeamData } from "./TeamDate";

export default function Team() {
  return (
    <div className="my-20 grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:gap-20 md:px-10">
      <div className="order-2">
        <QuickMenu />
      </div>
      <div className="">
        <p className="mb-10 text-center text-4xl font-bold">My Team</p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="group"
        >
          <CarouselContent>
            {TeamData.map((slider) => (
              <CarouselItem key={slider.id} className="md:basis-1/3">
                {/* Fixed height card */}
                <div className="white-bg flex min-h-[12rem] flex-col items-center justify-center gap-6 rounded-md p-2">
                  <Image
                    src={slider.img}
                    alt={slider.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div className="space-y-2 text-center">
                    <p className="text-md font-bold">{slider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {slider.post}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="default"
            className="ml-12 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
          <CarouselNext
            variant="default"
            className="mr-12 -translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </Carousel>
      </div>
    </div>
  );
}
