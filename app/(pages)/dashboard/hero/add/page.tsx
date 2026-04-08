'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  ImageIcon,
  Loader2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAddHeroBanner } from '@/services/banner';

// ─── Constants ────────────────────────────────────────────────────────────────

const BANNER_POSITIONS = [
  { value: 'hero', label: 'Hero' },
  { value: 'hero_secondary', label: 'Hero Secondary' },
  { value: 'top_strip', label: 'Top Strip' },
  { value: 'mid_page', label: 'Mid Page' },
  { value: 'bottom_strip', label: 'Bottom Strip' },
  { value: 'sidebar', label: 'Sidebar' },
] as const;

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Left', icon: AlignLeft },
  { value: 'center', label: 'Center', icon: AlignCenter },
  { value: 'right', label: 'Right', icon: AlignRight },
] as const;

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be under 100 characters'),
  subtitle: z
    .string()
    .max(200, 'Subtitle must be under 200 characters')
    .optional(),
  slogan: z.string().max(80, 'Slogan must be under 80 characters').optional(),
  bannerPosition: z.string().min(1, 'Position is required'),
  alignment: z.enum(['left', 'center', 'right']),
  tag: z.string().max(40, 'Tag must be under 40 characters').optional(),
  isActive: z.boolean(),
  image: z
    .instanceof(File, { message: 'Banner image is required' })
    .refine((f) => f.size <= 2 * 1024 * 1024, 'Image must be under 2 MB')
    .refine(
      (f) => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type),
      'Only JPG, PNG, or WebP allowed',
    ),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Live Preview ─────────────────────────────────────────────────────────────

function BannerLivePreview({
  previewUrl,
  title,
  subtitle,
  slogan,
  tag,
  alignment,
}: {
  previewUrl: string | null;
  title: string;
  subtitle: string;
  slogan: string;
  tag: string;
  alignment: 'left' | 'center' | 'right';
}) {
  const alignClass =
    alignment === 'right'
      ? 'items-end text-right'
      : alignment === 'center'
        ? 'items-center text-center'
        : 'items-start text-left';

  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-lg border bg-muted'>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt='Preview'
          fill
          className='object-cover object-center'
        />
      ) : (
        <div className='flex h-full items-center justify-center'>
          <div className='text-center'>
            <ImageIcon className='mx-auto h-10 w-10 text-muted-foreground/40' />
            <p className='mt-2 text-xs text-muted-foreground'>
              Upload an image to see preview
            </p>
          </div>
        </div>
      )}

      {/* Overlay */}
      {previewUrl && (
        <div
          className={`absolute inset-0 flex flex-col justify-center p-6 ${alignClass}`}
        >
          <div className='max-w-xs rounded-md bg-black/45 p-4 backdrop-blur-sm'>
            {tag && (
              <span className='mb-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium text-white'>
                {tag}
              </span>
            )}
            {slogan && (
              <p className='mb-1 text-[10px] font-medium uppercase tracking-widest text-white/70'>
                {slogan}
              </p>
            )}
            <h3 className='text-sm font-bold leading-tight text-white'>
              {title || 'Banner Title'}
            </h3>
            {subtitle && (
              <p className='mt-1 text-[11px] text-white/80 leading-snug'>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Alignment indicator */}
      {previewUrl && (
        <div className='absolute bottom-2 right-2'>
          <Badge
            variant='secondary'
            className='text-[10px] capitalize opacity-80'
          >
            {alignment}
          </Badge>
        </div>
      )}
    </div>
  );
}

// ─── Image Upload Field ───────────────────────────────────────────────────────

function ImageUploadField({
  value,
  onChange,
  previewUrl,
  onPreviewChange,
  error,
}: {
  value: File | undefined;
  onChange: (file: File | undefined) => void;
  previewUrl: string | null;
  onPreviewChange: (url: string | null) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      // Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Please upload an image smaller than 2MB.');
        return; // Stop execution
      }
      onChange(file);
      const url = URL.createObjectURL(file);
      onPreviewChange(url);
    },
    [onChange, onPreviewChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleRemove = () => {
    onChange(undefined);
    onPreviewChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className='space-y-2'>
      {!previewUrl ? (
        // biome-ignore lint/a11y/noStaticElementInteractions: this is fine
        // biome-ignore lint/a11y/useKeyWithClickEvents: this is fine
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : error
                ? 'border-destructive bg-destructive/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
        >
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
            <ImageIcon className='h-6 w-6 text-muted-foreground' />
          </div>
          <div className='text-center'>
            <p className='text-sm font-medium'>
              Drop image here or{' '}
              <span className='text-primary underline underline-offset-2'>
                browse
              </span>
            </p>
            <p className='mt-1 text-xs text-muted-foreground'>
              JPG, PNG, WebP · Max 2 MB · Recommended: 1920×600
            </p>
          </div>
        </div>
      ) : (
        <div className='relative overflow-hidden rounded-lg border'>
          <div className='relative aspect-video w-full'>
            <Image
              src={previewUrl}
              alt='Uploaded banner'
              fill
              className='object-cover'
            />
          </div>
          <div className='flex items-center justify-between border-t bg-muted/50 px-3 py-2'>
            <div className='flex items-center gap-2'>
              <ImageIcon className='h-3.5 w-3.5 text-muted-foreground' />
              <span className='text-xs text-muted-foreground truncate max-w-50'>
                {value?.name}
              </span>
              {value && (
                <span className='text-xs text-muted-foreground'>
                  ({(value.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              )}
            </div>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-7 w-7 text-muted-foreground hover:text-destructive'
              onClick={handleRemove}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        className='hidden'
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className='text-sm font-medium text-destructive'>{error}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddHeroBannerPage() {
  const router = useRouter();
  const { mutate: addBanner, isPending } = useAddHeroBanner();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      slogan: '',
      bannerPosition: 'hero',
      alignment: 'left',
      tag: '',
      isActive: true,
    },
  });

  // Watch fields for live preview
  const watchedTitle = form.watch('title');
  const watchedSubtitle = form.watch('subtitle');
  const watchedSlogan = form.watch('slogan');
  const watchedTag = form.watch('tag');
  const watchedAlignment = form.watch('alignment');

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    if (values.subtitle) formData.append('subtitle', values.subtitle);
    if (values.slogan) formData.append('slogan', values.slogan);
    formData.append('bannerPosition', values.bannerPosition);
    formData.append('alignment', values.alignment);
    if (values.tag) formData.append('tag', values.tag);
    formData.append('isActive', String(values.isActive));
    formData.append('image', values.image);

    addBanner(formData, {
      onSuccess: () => {
        router.push('/dashboard/hero');
      },
    });
  };

  return (
    <div className='container mx-auto max-w-6xl py-8'>
      {/* Header */}
      <div className='mb-8'>
        <Button
          variant='ghost'
          size='sm'
          className='mb-4 gap-1.5 text-muted-foreground hover:text-foreground'
          onClick={() => router.back()}
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Banners
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Add Hero Banner</h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          Create a new hero banner for your website
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-5'>
            {/* ── Left column: form fields ── */}
            <div className='space-y-6 lg:col-span-3'>
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-base'>Basic Information</CardTitle>
                  <CardDescription>
                    Title is required. Subtitle and slogan are optional overlay
                    text.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-5'>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Title <span className='text-destructive'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. Summer Sale — Up to 50% Off'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Main headline displayed on the banner.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subtitle */}
                  <FormField
                    control={form.control}
                    name='subtitle'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='e.g. Shop the latest collection and save big on your favourites'
                            className='resize-none'
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Supporting text shown below the title.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Slogan */}
                  <FormField
                    control={form.control}
                    name='slogan'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slogan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. Limited Time Only'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Small eyebrow text shown above the title.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tag */}
                  <FormField
                    control={form.control}
                    name='tag'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tag</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. New, Hot, Featured'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Short badge label shown on the banner chip.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Display Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-base'>Display Settings</CardTitle>
                  <CardDescription>
                    Control where and how this banner appears.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-5'>
                  {/* Position */}
                  <FormField
                    control={form.control}
                    name='bannerPosition'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Position <span className='text-destructive'>*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select position' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BANNER_POSITIONS.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Where this banner will be placed on the page.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Alignment */}
                  <FormField
                    control={form.control}
                    name='alignment'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text Alignment</FormLabel>
                        <FormControl>
                          <div className='flex gap-2'>
                            {ALIGNMENT_OPTIONS.map(
                              ({ value, label, icon: Icon }) => (
                                <button
                                  key={value}
                                  type='button'
                                  onClick={() => field.onChange(value)}
                                  className={`flex flex-1 flex-col items-center gap-1.5 rounded-md border px-3 py-2.5 text-xs font-medium transition-colors ${
                                    field.value === value
                                      ? 'border-primary bg-primary/5 text-primary'
                                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                                  }`}
                                >
                                  <Icon className='h-4 w-4' />
                                  {label}
                                </button>
                              ),
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Alignment of overlay text on the banner image.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* Is Active */}
                  <FormField
                    control={form.control}
                    name='isActive'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between rounded-lg border p-4'>
                        <div>
                          <FormLabel className='text-sm font-medium'>
                            Active
                          </FormLabel>
                          <FormDescription className='mt-0.5'>
                            Inactive banners are saved but not shown on the
                            site.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-base'>Banner Image</CardTitle>
                  <CardDescription>
                    Upload a high-resolution image. Recommended aspect ratio:
                    16:5 (1920×600).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUploadField
                            value={field.value as File | undefined}
                            onChange={field.onChange}
                            previewUrl={previewUrl}
                            onPreviewChange={setPreviewUrl}
                            error={form.formState.errors.image?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* ── Right column: live preview ── */}
            <div className='lg:col-span-2'>
              <div className='sticky top-6 space-y-4'>
                <Card>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-base'>Live Preview</CardTitle>
                    <CardDescription>
                      Updates as you fill in the form.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BannerLivePreview
                      previewUrl={previewUrl}
                      title={watchedTitle}
                      subtitle={watchedSubtitle ?? ''}
                      slogan={watchedSlogan ?? ''}
                      tag={watchedTag ?? ''}
                      alignment={watchedAlignment}
                    />
                  </CardContent>
                </Card>

                {/* Summary card */}
                <Card className='bg-muted/30'>
                  <CardContent className='pt-4 pb-4 space-y-3'>
                    <p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
                      Summary
                    </p>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Position</span>
                        <span className='font-medium capitalize'>
                          {form.watch('bannerPosition').replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Alignment</span>
                        <span className='font-medium capitalize'>
                          {watchedAlignment}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Status</span>
                        <Badge
                          variant={
                            form.watch('isActive') ? 'default' : 'secondary'
                          }
                          className='text-xs'
                        >
                          {form.watch('isActive') ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Image</span>
                        <span className='font-medium text-xs'>
                          {previewUrl ? '✓ Uploaded' : 'Not uploaded'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className='flex flex-col gap-2'>
                  <Button
                    type='submit'
                    className='w-full gap-2'
                    disabled={isPending}
                  >
                    {isPending && <Loader2 className='h-4 w-4 animate-spin' />}
                    {isPending ? 'Creating Banner…' : 'Create Banner'}
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    className='w-full'
                    disabled={isPending}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
