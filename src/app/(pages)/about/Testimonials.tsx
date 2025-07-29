'use client';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TestimonialCard } from './TestimonialCard';
import { TestimonialContent } from './TestimonialContent';
import { TestimonialData } from './TestimonialsData';

export default function Testimonials() {
  return (
    <div className='my-16 md:mx-10'>
      <div className='text-center'>
        <p className='text-3xl font-bold md:text-4xl'>What Our Client Say</p>
      </div>

      <div>
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {TestimonialData.map((review) => (
              <CarouselItem key={review.id}>
                <div className='mt-20 flex flex-col justify-center md:flex-row md:gap-10'>
                  <TestimonialCard review={review} />
                  <TestimonialContent review={review} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='absolute right-40 top-20 scale-150'>
            <CarouselPrevious />
          </div>
          <div className='absolute right-28 top-20 scale-150'>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
