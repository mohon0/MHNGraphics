"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import img5 from "@/images/slider/icons.jpg";
import img4 from "@/images/slider/mockups.jpg";
import img1 from "@/images/slider/photo.jpg";
import img6 from "@/images/slider/sports.jpg";
import img3 from "@/images/slider/templates.jpg";
import img2 from "@/images/slider/vector.jpg";
import Image from "next/image";
import Link from "next/link";

const sliderData = [
  {
    id: 1,
    name: "People",
    img: img1,
    link: "/design?category=people&query=&page=1",
  },
  {
    id: 2,
    name: "Illustration",
    img: img2,
    link: "/design?category=illustrations&query=&page=1",
  },
  {
    id: 3,
    name: "Mock Up",
    img: img3,
    link: "/design?category=mockups&query=&page=1",
  },
  {
    id: 4,
    name: "Templates",
    img: img4,
    link: "/design?category=templates&query=&page=1",
  },
  {
    id: 5,
    name: "Icons",
    img: img5,
    link: "/design?category=icons&query=&page=1",
  },
  {
    id: 6,
    name: "Sports",
    img: img6,
    link: "/design?category=sports&query=&page=1",
  },
];

export function Slider() {
  return (
    <div className="my-16 px-4 md:px-10">
      <p className="mb-10 text-center text-4xl font-bold">
        Many Assets Ready To Go
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
      >
        <CarouselContent>
          {sliderData.map((slider) => (
            <CarouselItem
              key={slider.id}
              className="relative md:basis-1/3 lg:basis-1/5"
            >
              <Link href={slider.link}>
                <div className="flex h-60 w-full items-center justify-center md:h-40">
                  <Image
                    src={slider.img}
                    alt=""
                    className="h-60 w-full object-cover brightness-50 transition-all duration-300 hover:h-44 md:h-40"
                  />
                </div>
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-white">
                  {slider.name}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="default"
          className="translate-x-10 scale-125 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
        <CarouselNext
          variant="default"
          className="-translate-x-10 scale-125 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Carousel>
    </div>
  );
}
