import { X } from 'lucide-react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { CgAsterisk } from 'react-icons/cg';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PostImageProps {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}

export const EditDesignImage: React.FC<PostImageProps> = ({
  image,
  setImage,
  setImageFile,
}) => {
  function handleRemoveImage() {
    setImage(null);
    setImageFile(null);
  }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file);
    }
  }
  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <span>Cover Image</span>
          <CgAsterisk color='red' className='ml-1' />
        </CardTitle>
        <CardDescription>Maximum file size is 900 KB.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-2'>
          {image ? (
            <div className='relative w-full'>
              <Image
                alt='Product image'
                className='aspect-square h-48 w-full rounded-md object-cover'
                height={300}
                src={image}
                width={300}
                onError={() => toast.error('Failed to load image')}
              />
              <Button
                variant='destructive'
                className='absolute right-1 top-1 scale-75 rounded-full'
                size='icon'
                type='button'
                onClick={handleRemoveImage}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ) : (
            <label className='flex h-48 w-full cursor-pointer items-center justify-center rounded-md border border-dashed bg-secondary'>
              <Image
                src='/placeholder.svg'
                alt='Image'
                className='h-48 w-full object-cover dark:brightness-[0.2] dark:grayscale'
                width={200}
                height={200}
              />
              <input
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />
              <span className='sr-only'>Upload</span>
            </label>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
