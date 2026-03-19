import Image, { type StaticImageData } from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MemberProps {
  name: string;
  designation: string;
  department?: string;
  img: StaticImageData;
}

export default function MembersModel({
  name,
  designation,
  department,
  img,
}: MemberProps) {
  return (
    <Card className='group overflow-hidden border-muted bg-card transition-all hover:border-primary/50'>
      <CardHeader className='p-0'>
        <div className='relative aspect-4/5 w-full overflow-hidden'>
          <Image
            src={img}
            alt={name}
            fill
            placeholder='blur'
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
      </CardHeader>

      <CardContent className='flex flex-col items-center p-6 text-center'>
        <h4 className='text-2xl font-bold tracking-tight text-foreground'>
          {name}
        </h4>

        <p className='text-sm font-medium text-primary'>{designation}</p>

        {department && (
          <Badge variant='secondary' className='mt-4 font-normal'>
            {department}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
