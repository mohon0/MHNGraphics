'use client';
import { FaUsers } from 'react-icons/fa';
// Static Imports
import img1 from '@/assets/teachers/1.jpg';
import img2 from '@/assets/teachers/2.jpg';
import img3 from '@/assets/teachers/3.jpg';
import img4 from '@/assets/teachers/4.jpg';
import MembersModel from './MembersModel';
import SectionHeader from './SectionHeader';

const MembersData = [
  {
    id: 1,
    name: 'মোঃ মোহন',
    designation: 'ফাউন্ডার এন্ড সিইও',
    img: img1,
  },
  {
    id: 2,
    name: 'মোছাঃ রিয়া খাতুন',
    designation: 'ইন্সট্রাক্টর',
    department: 'ডিজিটাল মার্কেটিং',
    img: img2,
  },
  {
    id: 3,
    name: 'মোঃ তানজিল মোল্লা',
    designation: 'ইন্সট্রাক্টর',
    department: 'গ্রাফিক্স ডিজাইন',
    img: img3,
  },
  {
    id: 4,
    name: 'মোঃ মাহবুব হোসেন',
    designation: 'ইন্সট্রাক্টর',
    department: 'অফিস অ্যাপ্লিকেশন',
    img: img4,
  },
];

export default function Members() {
  return (
    <section className='py-16 px-4 md:px-10 lg:px-20'>
      <SectionHeader
        title='প্রতিষ্ঠানের সদস্যগণ'
        text='আমাদের কোর্স সমূহ পরিচালনার জন্য রয়েছে একদল দক্ষ ইন্সট্রাক্টর যারা সরাসরি বিভিন্ন কাজের সাথে জড়িত'
        icon={FaUsers}
      />

      <div className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {MembersData.map((member) => (
          <MembersModel key={member.id} {...member} />
        ))}
      </div>
    </section>
  );
}
