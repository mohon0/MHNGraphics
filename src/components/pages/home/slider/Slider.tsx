"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import img1 from "@/images/slider/img1.jpeg";
import img2 from "@/images/slider/img2.jpeg";
import img3 from "@/images/slider/img3.jpeg";
import img4 from "@/images/slider/img4.jpeg";
import img5 from "@/images/slider/img5.jpeg";
import img6 from "@/images/slider/img6.jpeg";
import img7 from "@/images/slider/img7.jpeg";
import Image from "next/image";
import Link from "next/link";

const sliderData = [
  {
    id: 1,
    name: "Slider 1",
    img: img1,
    link: "/slider1",
  },
  {
    id: 2,
    name: "Slider 2",
    img: img2,
    link: "/slider2",
  },
  {
    id: 3,
    name: "Slider 3",
    img: img3,
    link: "/slider3",
  },
  {
    id: 4,
    name: "Slider 4",
    img: img4,
    link: "/slider3",
  },
  {
    id: 5,
    name: "Slider 5",
    img: img5,
    link: "/slider3",
  },
  {
    id: 6,
    name: "Slider 6",
    img: img6,
    link: "/slider3",
  },
  {
    id: 7,
    name: "Slider 7",
    img: img7,
    link: "/slider3",
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
              <Link href="/">
                <div className="flex h-60 w-full items-center justify-center md:h-40">
                  <Image
                    src={slider.img}
                    alt=""
                    className="h-60 w-full object-cover transition-all duration-300 hover:h-44 md:h-40"
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
