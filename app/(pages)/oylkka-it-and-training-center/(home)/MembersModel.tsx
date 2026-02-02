import Image, { type StaticImageData } from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Card } from '@/components/ui/card';

interface props {
  name: string;
  title: string;
  img: StaticImageData;
}

export default function MembersModel({ name, title, img }: props) {
  return (
    <Card className='overflow-hidden'>
      <Image src={img} alt='profile-picture' />

      <div className='p-6 text-center'>
        <h4 className='text-blue-gray-900 mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased'>
          {name}
        </h4>
        <p className='from-blue-gray-600 to-blue-gray-400 block bg-linear-to-tr bg-clip-text font-sans text-base font-medium leading-relaxed antialiased'>
          {title}
        </p>
      </div>
      <div className='flex justify-center gap-7 p-6 pt-2'>
        <FaFacebook />
        <FaTwitter />
        <FaInstagram />
      </div>
    </Card>
  );
}
