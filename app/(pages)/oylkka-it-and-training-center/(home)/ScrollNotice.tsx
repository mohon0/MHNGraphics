import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import logo from '@/assets/logo.png';

export default function ScrollNotice() {
  return (
    <div className='mx-2 my-2 flex grid-cols-1 flex-col items-center justify-center gap-4 md:grid md:grid-cols-12 md:gap-0 lg:mx-10'>
      <div className='bg-secondary flex w-full items-center justify-center gap-2 rounded-md p-1 text-center md:col-span-3 lg:col-span-2'>
        <Image alt='oylkka-logo' src={logo} className='h-10 w-12' />
        <div className='animate-pulse text-lg font-bold'>
          ওয়েল্কা ট্রেনিং সেন্টার
        </div>
      </div>
      <Marquee
        pauseOnHover={true}
        className='border-primary col-span-9 h-full border-y border-r border-l font-bold md:border-l-0 md:text-xl lg:col-span-10'
      >
        সবাইকে দক্ষ করে গড়ে তোলায় আমাদের একমাত্র লক্ষ্য। ঝিনাইদহ শহরে একমাত্র আমরাই আপনাদের
        সার্বক্ষণিক পাশে আছি। আপনাদের যে কোন সমস্যা জানাতে সরাসরি চলে আসুন আমাদের অফিসে।
        ঠিকানাঃ রফি টাওয়ার (১০ তলা ভবনের ৫ম তলা) অথবা কল করুনঃ 01989-491248, Gmail:
        contact@oylkka.com ''
      </Marquee>
    </div>
  );
}
