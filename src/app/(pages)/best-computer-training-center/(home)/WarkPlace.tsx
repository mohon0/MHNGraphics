'use client';
import Image from 'next/image';
import { FaHandHoldingDollar } from 'react-icons/fa6';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import img2 from '@/images/best-computer/fff.png';
import img1 from '@/images/best-computer/fiverr.png';
import img3 from '@/images/best-computer/toptal.png';
import img4 from '@/images/best-computer/upwork.png';
import img5 from '@/images/best-computer/youtube.png';
import SectionHeader from './SectionHeader';

export default function WorkPlace() {
  return (
    <div className='mx-2 mt-16 space-y-4 md:mx-20'>
      <SectionHeader
        title='ছাত্রদের কর্মক্ষেত্র'
        text='আপনি যদি সম্পূর্ণরূপে কাজ শিখে নিজেকে দক্ষ ভাবে তৈরি করতে পারেন তাহলে অবশ্যই বিভিন্ন মার্কেটপ্লেস এ কাজ করতে পারবেন।'
        icon={FaHandHoldingDollar}
      />
      <Carousel
        opts={{
          align: 'center',
        }}
        className='w-full'
      >
        <CarouselContent>
          <CarouselItem className='basis-3/4 px-10 md:basis-1/5'>
            <Image
              src={img1}
              alt=''
              className='flex h-20 w-full items-center justify-center object-scale-down'
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 px-10 md:basis-1/5'>
            <Image
              src={img2}
              alt=''
              className='flex h-20 w-full items-center justify-center object-scale-down'
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 px-10 md:basis-1/5'>
            <Image
              src={img3}
              alt=''
              className='flex h-20 w-full items-center justify-center object-scale-down'
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 px-10 md:basis-1/5'>
            <Image
              src={img4}
              alt=''
              className='flex h-20 w-full items-center justify-center object-scale-down'
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 px-10 md:basis-1/5'>
            <Image
              src={img5}
              alt=''
              className='flex h-20 w-full items-center justify-center object-scale-down'
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='translate-x-10' />
        <CarouselNext className='-translate-x-10' />
      </Carousel>
    </div>
  );
}
