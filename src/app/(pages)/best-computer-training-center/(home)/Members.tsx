'use client';
import { FaUsers } from 'react-icons/fa';
import img2 from '@/images/best-computer/mahbub.jpg';
import img1 from '@/images/best-computer/mohon.jpg';
import MembersModel from './MembersModel';
import SectionHeader from './SectionHeader';

export default function Members() {
  return (
    <div className='mx-2 flex flex-col items-center justify-center gap-10 text-center md:mx-20'>
      <SectionHeader
        title='প্রতিষ্ঠানের সদস্যগণ'
        text='আমাদের কোর্স সমূহ পরিচালনার জন্য রয়েছে একদল দক্ষ ইন্সট্রাক্টর যারা
          সরাসরি বিভিন্ন কাজের সাথে জড়িত'
        icon={FaUsers}
      />

      <div className='grid gap-10 md:grid-cols-3'>
        <MembersModel name='মোঃ মোহন' title='পরিচালক' img={img1} />
        <MembersModel name='মোঃ মাহবুব' title='শিক্ষক' img={img2} />
      </div>
    </div>
  );
}
