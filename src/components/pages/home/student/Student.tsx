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
import QuickMenu from "./QuickMenu";

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

export function Student() {
  return (
    <div className="mt-16 px-4 md:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-20">
        <div className="order-2">
          <QuickMenu />
        </div>
        <div>
          <p className="mb-8 text-center text-4xl font-bold">My Student</p>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {sliderData.map((slider) => (
                <CarouselItem
                  key={slider.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Image
                    src={slider.img}
                    alt=""
                    className="h-60 w-full object-cover md:h-40"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
