import Image, { type StaticImageData } from 'next/image';

interface props {
  img: StaticImageData;
  name: string;
  des: string;
}

export default function FeedBackModel({ img, name, des }: props) {
  return (
    <div className='relative flex w-full max-w-104 flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none'>
      <div className='relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pb-8 pt-0 text-gray-700 shadow-none'>
        <Image
          src={img}
          alt={name}
          className='relative inline-block h-[58px] w-[58px] rounded-full! object-cover object-center'
        />
        <div className='flex w-full flex-col gap-0.5'>
          <div className='flex items-center justify-between'>
            <h5 className='text-blue-gray-900 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased'>
              {name}
            </h5>
          </div>
          <p className='text-blue-gray-900 block font-sans text-base font-light leading-relaxed antialiased'>
            ছাত্র
          </p>
        </div>
      </div>
      <div className='mb-6 p-0'>
        <p className='block font-sans text-base font-light leading-relaxed text-inherit antialiased'>
          {des}
        </p>
      </div>
    </div>
  );
}
