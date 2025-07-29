'use client';
import {
  FaRegClipboard,
  FaRegHandshake,
  FaRegKeyboard,
  FaRegLightbulb,
  FaRegUser,
} from 'react-icons/fa';
import { FiClock, FiDollarSign } from 'react-icons/fi';
import { GiShipWheel } from 'react-icons/gi';
import { GoVerified } from 'react-icons/go';
import { GrDocument } from 'react-icons/gr';
import { IoCloudyNightOutline } from 'react-icons/io5';
import { LuGraduationCap } from 'react-icons/lu';
import { RiComputerLine } from 'react-icons/ri';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SectionHeader from './SectionHeader';
import WhyUsModel from './WhyUsModel';

export default function WhyUs() {
  return (
    <div className='my-10 space-y-10 px-2 md:px-20'>
      <SectionHeader
        title='আমাদের প্রতিষ্ঠানে কেন'
        text='অন্য প্রতিষ্ঠান থেকে আমরা কেন আলাদা? আমাদের প্রতিষ্ঠানকে কেন বেছে
          নিবেন?'
        icon={GiShipWheel}
      />

      <Carousel>
        <CarouselContent>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='ন্যূনতম কোর্স ফিতে সর্বোৎকৃষ্ট মানের প্রশিক্ষণ'
              icon={FiDollarSign}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='আধুনিক ও সুসজ্জিত মাল্টিমিডিয়া কম্পিউটার ল্যাব'
              icon={RiComputerLine}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel text='এককভাবে প্রশিক্ষণ দেওয়া হয়' icon={FaRegUser} />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='সিলেবাস অনুযায়ী যত্ন সহকারে পাঠদানের ব্যবস্থা'
              icon={FaRegClipboard}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel text='মানসম্মত আধুনিক সিটের ব্যবস্থা' icon={GrDocument} />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel text='সুবিধা অনুযায়ী ক্লাসের সময় নির্ধারণ' icon={FiClock} />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='চাকুরীজীবীদের জন্য রাত্রিকালীন ক্লাস'
              icon={IoCloudyNightOutline}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='পর্যাপ্ত সময় অনুশীলন করার ব্যবস্থা'
              icon={FaRegKeyboard}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='পেশাগত কাজের উপর প্রশিক্ষণ দেওয়া হয়'
              icon={FaRegLightbulb}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='অভিজ্ঞ প্রশিক্ষক মন্ডলি দ্বারা পরিচালিত'
              icon={LuGraduationCap}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='প্রশিক্ষণ পরবর্তী যে কোন সমস্যা সুষ্ঠু পরামর্শ প্রদান'
              icon={FaRegHandshake}
            />
          </CarouselItem>
          <CarouselItem className='basis-3/4 md:basis-1/5'>
            <WhyUsModel
              text='পরীক্ষার মাধ্যমে সরকারি সার্টিফিকেট এর ব্যবস্থা'
              icon={GoVerified}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='translate-x-8' />
        <CarouselNext className='-translate-x-8' />
      </Carousel>
    </div>
  );
}
