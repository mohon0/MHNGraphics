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
import Autoplay from "embla-carousel-autoplay";
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
    id: 7,
    name: "People",
    img: img1,
    link: "/design?category=people&query=&page=1",
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
    <div className="my-8 px-4 md:my-16 md:px-10">
      <p className="mb-6 text-center text-2xl font-bold md:mb-10 md:text-4xl">
        Many Assets Ready To Go
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {sliderData.map((slider) => (
            <CarouselItem
              key={slider.id}
              className="relative basis-10/12 md:basis-1/3 lg:basis-1/5"
            >
              <Link href={slider.link}>
                <div className="flex h-44 w-full items-center justify-center">
                  <Image
                    src={slider.img}
                    alt=""
                    className="h-44 w-full object-cover brightness-50 transition-all duration-300 hover:h-48"
                  />
                </div>
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-white">
                  {slider.name}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-8" />
        <CarouselNext className="-translate-x-8" />
      </Carousel>
    </div>
  );
}
