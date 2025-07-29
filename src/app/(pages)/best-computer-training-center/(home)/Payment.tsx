import Image from 'next/image';
import img from '@/images/best-computer/BKash-bKash-Logo.wine.png';
import img1 from '@/images/best-computer/Nagad-Logo.wine.png';

export default function Payment() {
  return (
    <div className='mx-2 my-20 space-y-2 md:mx-60'>
      <div className='text-primary-100 text-center text-3xl font-bold md:text-4xl'>
        মোবাইল পেমেন্ট
      </div>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-20'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={img} alt='' />
          <p className='-mt-4'>০১৭৯৯-৫৭৪৫৭০ (পার্সোনাল)</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Image src={img1} alt='' />
          <p className='-mt-4'>০১৭৯৯-৫৭৪৫৭০ (পার্সোনাল)</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Image src={img} alt='' />
          <p className='-mt-4'>০১৭৭৯-১২০০২৩ (মার্চেন্ট)</p>
        </div>
      </div>
    </div>
  );
}
