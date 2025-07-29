import type { IconType } from 'react-icons';

interface props {
  text: string;
  icon: IconType;
}

export default function WhyUsModel({ text, icon: Icon }: props) {
  return (
    <div className='flex h-48 flex-col items-center justify-center space-y-3 rounded bg-gray-200 p-4 text-center'>
      <div className='bg-primary-100 rounded-full border-4 border-gray-600 p-3 text-white'>
        <Icon size={30} />
      </div>
      <div className='text-xl font-semibold'>{text}</div>
      <div className='h-1 w-20 rounded-full bg-gray-600'></div>
    </div>
  );
}
