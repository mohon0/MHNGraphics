import Image from 'next/image';
import logo from '@/images/oylkka-logo-black.png';

export default function ApplicationHeader() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 text-center'>
      <Image src={logo} alt='logo' className='h-16 w-16 md:h-20 md:w-20' />
      <div className='text-3xl font-bold lg:text-4xl'>
        Oylkka IT & Training Center
      </div>
      <div className='flex flex-col gap-2'>
        <div>Rofi Tower, 5th Floor, Paira chattor, Jhenaidah</div>
        <div>Mobile: 01989491248</div>
        <div>Email: contact@oylkka.com</div>
      </div>
    </div>
  );
}
