import type { IconType } from 'react-icons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface props {
  text: string;
  icon: IconType;
}

export default function WhyUsModel({ text, icon: Icon }: props) {
  return (
    <Card>
      <CardHeader className='flex items-center justify-center'>
        <div className='flex items-center justify-center bg-primary/10 p-4 rounded-full'>
          <Icon size={30} className='text-primary' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-xl font-semibold text-center'>{text}</div>
      </CardContent>
    </Card>
  );
}
