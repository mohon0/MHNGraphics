import type React from 'react';
import type { IconType } from 'react-icons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ServicesCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const ServicesCard: React.FC<ServicesCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <Card>
      <CardHeader className='text-center flex items-center justify-center flex-col gap-2'>
        <div className='text-primary'>
          <Icon size={60} />
        </div>
        <div className='text-primary text-xl font-bold md:text-2xl'>
          {title}
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-sm text-muted-foreground'>{description}</div>
      </CardContent>
    </Card>
  );
};

export default ServicesCard;
