'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import SectionHeader from './section-header';
import { TeamData } from './TeamData';

export default function Team() {
  return (
    <div className='flex flex-col items-center justify-center md:my-10 md:gap-1'>
      <SectionHeader text='Team Members' title='My Team' />

      <div className='w-full px-10 md:px-16'>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className='my-12 w-full'
        >
          <CarouselContent className='-ml-4'>
            {TeamData.map((data) => (
              <CarouselItem
                key={data.id}
                className='pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <Card className='overflow-hidden rounded-2xl border transition-all hover:shadow-lg'>
                  <CardContent className='p-0'>
                    <div className='relative aspect-[3/4] w-full'>
                      <Image
                        src={data.img}
                        alt={data.name}
                        fill
                        className='object-cover'
                      />
                    </div>

                    <div className='my-5 flex flex-col items-center justify-center gap-1'>
                      <h3 className='text-xl font-bold text-primary'>
                        {data.name}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        {data.post}
                      </p>
                    </div>

                    <div className='mb-6 flex justify-center gap-5 text-xl text-slate-400'>
                      <Link
                        href={data.facebook}
                        target='_blank'
                        className='hover:text-primary transition-colors'
                      >
                        <FaFacebook />
                      </Link>
                      <Link
                        href={data.twitter}
                        target='_blank'
                        className='hover:text-primary transition-colors'
                      >
                        <FaTwitter />
                      </Link>
                      <Link
                        href={data.linkedin}
                        target='_blank'
                        className='hover:text-primary transition-colors'
                      >
                        <FaLinkedin />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className='hidden md:block'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
