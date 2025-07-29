'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import TiptapEditor, { type TiptapEditorRef } from '@/editor';
import { NewDesignSchema, type NewDesignSchemaType } from '@/lib/Schemas';
import { useSingleDesign, useUpdateDesign } from '@/services/design';
import { DesignSkeleton } from '../new-design/skeleton';
import Category from './Category';
import { EditDesignImage } from './EditDesignImage';
import Tags from './Tags';

export default function EditDesign() {
  return (
    <div className='container'>
      <Suspense fallback={<LoadingSkeleton />}>
        <DesignPage />
      </Suspense>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className='space-y-4 p-4'>
      <Skeleton className='h-8 w-1/3' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-2/3' />
      <Skeleton className='h-64 w-full rounded-md' />
    </div>
  );
}

function DesignPage() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const editorRef = useRef<TiptapEditorRef>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const { isLoading, data, isError } = useSingleDesign({ id });
  const router = useRouter();

  // Use our custom hook for design updates
  const { submitDesignUpdate, isPending } = useUpdateDesign({
    designId: id,
    imageFile,
  });

  const form = useForm<NewDesignSchemaType>({
    resolver: zodResolver(NewDesignSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      tags: [],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || '',
        description: data.description || '',
        category: data.category || '',
        tags: data.tags || [],
      });
      setImage(data.image || '');
    }
  }, [data, form]);

  // Simplified onSubmit function
  async function onSubmit(formData: NewDesignSchemaType) {
    await submitDesignUpdate(formData);
  }

  function handleDiscard() {
    if (data) {
      form.reset({
        name: data.name || '',
        description: data.description || '',
        category: data.category || '',
        tags: data.tags || [],
      });
      setImage(data.image || '');
      toast.info('Changes discarded');
    }
  }

  if (isLoading) {
    return <DesignSkeleton />;
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <h2 className='mb-2 text-xl font-semibold text-destructive'>
          Error Loading Design
        </h2>
        <p className='mb-4 text-muted-foreground'>
          We couldn&#39;t load the design data. Please try again later.
        </p>
        <Button onClick={() => router.back()} variant='outline'>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex min-h-screen w-full flex-col'>
          <div className='flex flex-col sm:gap-4'>
            <main className='grid flex-1 items-start gap-4 sm:py-0 md:gap-8'>
              <div className='mx-auto grid w-full flex-1 auto-rows-max gap-4'>
                <div className='mb-6 flex items-center gap-4'>
                  <Button
                    variant='outline'
                    type='button'
                    size='icon'
                    className='h-9 w-9'
                    onClick={() => router.back()}
                  >
                    <ChevronLeft className='h-4 w-4' />
                    <span className='sr-only'>Back</span>
                  </Button>
                  <h1 className='flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0'>
                    Edit Design
                  </h1>
                  <div className='hidden items-center gap-2 md:ml-auto md:flex'>
                    <Button
                      variant='outline'
                      type='button'
                      onClick={handleDiscard}
                      disabled={isPending}
                    >
                      Discard
                    </Button>
                    <Button
                      type='submit'
                      disabled={isPending}
                      className='min-w-[120px]'
                    >
                      {isPending ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </div>

                <div className='grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-3 lg:gap-8'>
                  <div className='grid auto-rows-max items-start gap-6 lg:col-span-2 lg:gap-8'>
                    <Card className='p-6'>
                      <CardHeader className='px-0 pt-0'>
                        <CardTitle>Design Information</CardTitle>
                      </CardHeader>
                      <CardContent className='space-y-6 px-0 pb-0'>
                        <FormField
                          control={form.control}
                          name='name'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Design Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Title of the design'
                                  {...field}
                                  className='max-w-xl'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='description'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Design Content</FormLabel>
                              <FormControl>
                                <div className='rounded-md border'>
                                  <TiptapEditor
                                    ref={editorRef}
                                    ssr
                                    output='html'
                                    placeholder={{
                                      paragraph: 'Type your content here...',
                                    }}
                                    onContentChange={field.onChange}
                                    initialContent={
                                      field.value || data?.description || ''
                                    }
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <div className='grid auto-rows-max items-start gap-6'>
                    <EditDesignImage
                      image={image}
                      setImage={setImage}
                      setImageFile={setImageFile}
                    />
                    <Card>
                      <CardHeader>
                        <CardTitle>Category and Tags</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid gap-6'>
                          <div className='grid gap-4'>
                            <Category category={data?.category} />
                          </div>
                          <Tags />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Mobile action buttons */}
                    <div className='mt-4 flex items-center gap-2 md:hidden'>
                      <Button
                        variant='outline'
                        type='button'
                        onClick={handleDiscard}
                        disabled={isPending}
                        className='flex-1'
                      >
                        Discard
                      </Button>
                      <Button
                        type='submit'
                        disabled={isPending}
                        className='flex-1'
                      >
                        {isPending ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </form>
    </Form>
  );
}
