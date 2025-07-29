import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import img1 from '@/images/best-computer/1.jpg';
import img2 from '@/images/best-computer/2.jpg';
import img3 from '@/images/best-computer/3.jpg';
import img4 from '@/images/best-computer/4.jpg';
import img5 from '@/images/best-computer/5.jpg';
import img6 from '@/images/best-computer/6.jpg';

export default function Gallery() {
  return (
    <div className='space-y-4'>
      <div className='text-primary-100 text-center text-3xl font-bold'>
        গ্যালারি
      </div>
      <Carousel>
        <CarouselContent>
          <CarouselItem className='basis-2/3 md:basis-1/3'>
            <Image src={img1} alt='' />
          </CarouselItem>
          <CarouselItem className='basis-2/3 md:basis-1/3'>
            <Image src={img2} alt='' />
          </CarouselItem>
          <CarouselItem className='basis-2/3 md:basis-1/3'>
            <Image src={img3} alt='' />
          </CarouselItem>
          <CarouselItem className='basis-2/3 md:basis-1/3'>
            <Image src={img4} alt='' />
          </CarouselItem>
          <CarouselItem className='basis-2/3 md:basis-1/3'>
            <Image src={img5} alt='' />
          </CarouselItem>
          <CarouselItem className='basis-2/3 md:basis-1/3'>
            <Image src={img6} alt='' />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='translate-x-8' />
        <CarouselNext className='-translate-x-8' />
      </Carousel>
    </div>
  );
}
