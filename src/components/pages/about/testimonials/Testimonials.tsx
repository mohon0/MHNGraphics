"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialContent } from "./TestimonialContent";
import { TestimonialData } from "./TestimonialsData";

export default function Testimonials() {
  return (
    <div className="mx-3 my-16 md:mx-10 lg:mx-auto lg:max-w-7xl">
      <div className="text-center">
        <p className="text-4xl font-bold lg:text-6xl">Testimonials</p>
      </div>

      <div className="relative lg:mx-20">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent className="relative">
            {TestimonialData.map((review) => (
              <CarouselItem key={review.id}>
                <div className="mt-20 flex flex-col justify-center md:flex-row md:gap-10">
                  <TestimonialCard review={review} />
                  <TestimonialContent review={review} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute right-40 top-20 scale-150">
            <CarouselPrevious />
          </div>
          <div className="absolute right-10 top-20 scale-150">
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
