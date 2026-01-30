import Image, { type StaticImageData } from 'next/image';
import { Card } from '@/components/ui/card';
import img2 from '@/images/best-computer/img1.jpg';
import img1 from '@/images/best-computer/img2.jpg';
import img3 from '@/images/best-computer/img3.jpg';

export default function MemberModel({
  img,
  name,
  title,
  number,
  number2,
}: BloodMemberType) {
  return (
    <Card className='flex items-center gap-6 rounded-lg bg-white p-4 transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800'>
      <div className='relative h-20 w-20 overflow-hidden rounded-full'>
        <Image src={img} alt={name} layout='fill' objectFit='cover' />
      </div>
      <div className='space-y-2'>
        <p className='text-xl font-semibold text-primary dark:text-white'>
          {name}
        </p>
        <p className='text-md font-medium text-gray-600 dark:text-gray-400'>
          {title}
        </p>
        <p className='text-sm text-gray-500 dark:text-gray-300'>{number}</p>
        {number2 && (
          <p className='text-sm text-gray-500 dark:text-gray-300'>{number2}</p>
        )}
      </div>
    </Card>
  );
}

export const MemberModelData = [
  {
    id: 1,
    name: 'মোঃ মোহন',
    title: 'সভাপতি',
    number: '০১৯৮৯-৪৯১২৪৮',
    number2: '০১৭৯৯-৫৭৪৫৭০',
    img: img1,
  },
  {
    id: 2,
    name: 'মোঃ সুমন ',
    title: 'সহ-সভাপতি',
    number: '০১৩০৩-৯৫৩৪৪১',
    img: img3,
  },
  {
    id: 3,
    name: 'হাবিবুর রহমান',
    title: 'সাধারণ সম্পাদক',
    number: '০১৫৭১-২০৯১৭৮',
    img: img2,
  },
];

export interface BloodMemberType {
  img: StaticImageData;
  name: string;
  title: string;
  number: string;
  number2: string | undefined;
}
