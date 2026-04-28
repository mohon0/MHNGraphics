'use client';

import { format } from 'date-fns';
import {
  CalendarIcon,
  Edit,
  Eye,
  ImageOff,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminHeroBanners, useDeleteHeroBanner } from '@/services/banner';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroBanner {
  id: string;
  title: string;
  subtitle?: string | null;
  slogan?: string | null;
  image: string;
  imageId: string;
  isActive: boolean;
  bannerPosition: string;
  alignment: string;
  tag?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Banner Preview Dialog ─────────────────────────────────────────────────────

function BannerPreviewDialog({
  banner,
  open,
  onClose,
}: {
  banner: HeroBanner | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!banner) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl overflow-hidden p-0'>
        <div className='relative aspect-video w-full overflow-hidden bg-muted'>
          <Image
            src={banner.image || '/placeholder.svg'}
            alt={banner.title}
            fill
            className='object-cover object-center'
          />
          {/* Overlay text preview based on alignment */}
          <div
            className={`absolute inset-0 flex flex-col justify-center p-8 ${
              banner.alignment === 'right'
                ? 'items-end text-right'
                : banner.alignment === 'center'
                  ? 'items-center text-center'
                  : 'items-start text-left'
            }`}
          >
            <div className='max-w-sm rounded-md bg-black/40 p-4 backdrop-blur-sm'>
              {banner.tag && (
                <span className='mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white'>
                  {banner.tag}
                </span>
              )}
              {banner.slogan && (
                <p className='mb-1 text-xs font-medium uppercase tracking-widest text-white/70'>
                  {banner.slogan}
                </p>
              )}
              <h2 className='text-xl font-bold text-white'>{banner.title}</h2>
              {banner.subtitle && (
                <p className='mt-1 text-sm text-white/80'>{banner.subtitle}</p>
              )}
            </div>
          </div>
        </div>
        <DialogHeader className='px-6 py-4'>
          <DialogTitle>{banner.title}</DialogTitle>
          <div className='flex flex-wrap gap-2 pt-1'>
            <Badge variant={banner.isActive ? 'default' : 'outline'}>
              {banner.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Badge variant='secondary' className='capitalize'>
              {banner.bannerPosition.replace(/_/g, ' ')}
            </Badge>
            <Badge variant='outline' className='capitalize'>
              {banner.alignment} aligned
            </Badge>
            {banner.tag && (
              <Badge variant='secondary' className='capitalize'>
                {banner.tag}
              </Badge>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

// ─── Banner Card (Grid View) ───────────────────────────────────────────────────

function BannerCard({
  banner,
  onPreview,
  onDelete,
}: {
  banner: HeroBanner;
  onPreview: (b: HeroBanner) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card className='group overflow-hidden pt-0 transition-shadow hover:shadow-md'>
      {/* Thumbnail */}
      <div className='relative aspect-video w-full overflow-hidden bg-muted'>
        <Image
          src={banner.image || '/placeholder.svg'}
          alt={banner.title}
          fill
          className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
        />
        {/* Quick preview overlay */}
        <button
          type='button'
          onClick={() => onPreview(banner)}
          className='absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100'
        >
          <div className='flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800 shadow'>
            <Eye className='h-3.5 w-3.5' />
            Preview
          </div>
        </button>
      </div>

      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between gap-2'>
          <Badge
            variant={banner.isActive ? 'default' : 'secondary'}
            className='shrink-0'
          >
            {banner.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-7 w-7 shrink-0'>
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => onPreview(banner)}>
                <Eye className='mr-2 h-4 w-4' />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/admin/banner/hero/edit?id=${banner.id}`}
                  className='flex items-center'
                >
                  <Edit className='mr-2 h-4 w-4' />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-destructive focus:text-destructive'
                onClick={() => onDelete(banner.id)}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className='line-clamp-1 text-base'>{banner.title}</CardTitle>
        {banner.subtitle && (
          <CardDescription className='line-clamp-2 text-sm'>
            {banner.subtitle}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className='pb-2'>
        <div className='flex flex-wrap gap-1.5'>
          {banner.tag && (
            <Badge variant='secondary' className='capitalize text-xs'>
              {banner.tag}
            </Badge>
          )}
          <Badge variant='outline' className='capitalize text-xs'>
            {banner.alignment}
          </Badge>
          <Badge variant='outline' className='capitalize text-xs'>
            {banner.bannerPosition.replace(/_/g, ' ')}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className='text-muted-foreground flex items-center gap-1 text-xs'>
        <CalendarIcon className='h-3 w-3' />
        <span>{format(new Date(banner.createdAt), 'MMM d, yyyy')}</span>
      </CardFooter>
    </Card>
  );
}

// ─── Banner Row (List View) ────────────────────────────────────────────────────

function BannerRow({
  banner,
  onPreview,
  onDelete,
}: {
  banner: HeroBanner;
  onPreview: (b: HeroBanner) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className='grid grid-cols-12 items-center gap-4 px-4 py-3 hover:bg-muted/40 transition-colors'>
      {/* Banner info */}
      <div className='col-span-5 flex items-center gap-3'>
        <div className='relative h-11 w-20 shrink-0 overflow-hidden rounded-md bg-muted'>
          <Image
            src={banner.image || '/placeholder.svg'}
            alt={banner.title}
            fill
            className='object-cover'
          />
        </div>
        <div className='min-w-0'>
          <p className='truncate font-medium text-sm'>{banner.title}</p>
          {banner.subtitle && (
            <p className='text-muted-foreground truncate text-xs'>
              {banner.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Position */}
      <div className='col-span-2'>
        <Badge variant='outline' className='capitalize text-xs'>
          {banner.bannerPosition.replace(/_/g, ' ')}
        </Badge>
      </div>

      {/* Status */}
      <div className='col-span-2'>
        <Badge variant={banner.isActive ? 'default' : 'secondary'}>
          {banner.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {/* Date */}
      <div className='text-muted-foreground col-span-2 text-xs'>
        {format(new Date(banner.createdAt), 'MMM d, yyyy')}
      </div>

      {/* Actions */}
      <div className='col-span-1 flex justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => onPreview(banner)}>
              <Eye className='mr-2 h-4 w-4' />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/admin/banner/hero/edit?id=${banner.id}`}
                className='flex items-center'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-destructive focus:text-destructive'
              onClick={() => onDelete(banner.id)}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BannerListSkeleton({ view }: { view: 'grid' | 'list' }) {
  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-56' />
          <Skeleton className='mt-2 h-4 w-40' />
        </div>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-9 w-9 rounded-md' />
          <Skeleton className='h-9 w-9 rounded-md' />
          <Skeleton className='h-9 w-32 rounded-md' />
        </div>
      </div>
      <div className='mb-6 flex gap-2'>
        <Skeleton className='h-9 w-28 rounded-full' />
        <Skeleton className='h-9 w-28 rounded-full' />
      </div>
      {view === 'grid' ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <Card key={i} className='overflow-hidden pt-0'>
                <Skeleton className='aspect-video w-full rounded-none' />
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-5 w-16' />
                    <Skeleton className='h-7 w-7 rounded-md' />
                  </div>
                  <Skeleton className='h-5 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </CardHeader>
                <CardContent className='pb-2'>
                  <div className='flex gap-2'>
                    <Skeleton className='h-5 w-14' />
                    <Skeleton className='h-5 w-14' />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className='h-4 w-24' />
                </CardFooter>
              </Card>
            ))}
        </div>
      ) : (
        <div className='rounded-md border'>
          <Skeleton className='h-10 w-full rounded-none rounded-t-md' />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <div key={i} className='border-t p-4'>
                <Skeleton className='h-11 w-full' />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminHeroBannerListPage() {
  const { isPending, data, isError, refetch } = useAdminHeroBanners();
  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteHeroBanner();

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [previewBanner, setPreviewBanner] = useState<HeroBanner | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);

  const handleOpenPreview = (banner: HeroBanner) => {
    setPreviewBanner(banner);
    setIsPreviewOpen(true);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setBannerToDelete(id);
    setIsAlertOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsAlertOpen(false);
    setBannerToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!bannerToDelete) return;
    deleteBanner(bannerToDelete, {
      onSettled: handleCloseDeleteDialog,
    });
  };

  if (isPending) return <BannerListSkeleton view={view} />;

  if (isError) {
    return (
      <div className='flex h-[50vh] w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10'>
          <ImageOff className='h-8 w-8 text-destructive' />
        </div>
        <h3 className='mt-4 text-lg font-semibold'>Error Loading Banners</h3>
        <p className='text-muted-foreground mt-1 text-sm'>
          Something went wrong while fetching your banners.
        </p>
        <Button
          variant='outline'
          className='mt-4 gap-2'
          onClick={() => refetch()}
        >
          <RefreshCw className='h-4 w-4' />
          Try Again
        </Button>
      </div>
    );
  }

  const banners: HeroBanner[] = data || [];

  // Group by bannerPosition
  const bannersByPosition = banners.reduce<Record<string, HeroBanner[]>>(
    (acc, banner) => {
      const pos = banner.bannerPosition || 'other';
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(banner);
      return acc;
    },
    {},
  );

  const positions = Object.keys(bannersByPosition);

  return (
    <div className='container mx-auto py-8'>
      {/* Header */}
      <div className='mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Hero Banners</h1>
          <p className='text-muted-foreground mt-0.5 text-sm'>
            Manage your hero banners and promotional content
          </p>
        </div>
        <div className='flex items-center gap-3'>
          {/* View toggle */}
          <div className='flex items-center rounded-md border p-1 gap-1'>
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size='icon'
              onClick={() => setView('grid')}
              className='h-7 w-7'
            >
              <LayoutGrid className='h-4 w-4' />
              <span className='sr-only'>Grid view</span>
            </Button>
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size='icon'
              onClick={() => setView('list')}
              className='h-7 w-7'
            >
              <List className='h-4 w-4' />
              <span className='sr-only'>List view</span>
            </Button>
          </div>
          <Link href='/dashboard/hero/add'>
            <Button className='gap-1.5'>
              <Plus className='h-4 w-4' />
              Add Banner
            </Button>
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {banners.length === 0 ? (
        <div className='flex h-[50vh] w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center'>
          <div className='bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full'>
            <ImageOff className='text-muted-foreground h-8 w-8' />
          </div>
          <h3 className='mt-4 text-lg font-semibold'>No Banners Found</h3>
          <p className='text-muted-foreground mt-1 text-sm'>
            You haven&#39;t created any hero banners yet.
          </p>
          <Link href='/dashboard/hero/add'>
            <Button className='mt-4 gap-2'>
              <Plus className='h-4 w-4' />
              Create Banner
            </Button>
          </Link>
        </div>
      ) : (
        <Tabs defaultValue={positions[0]} className='w-full'>
          <TabsList className='mb-6 w-full justify-start overflow-x-auto'>
            {positions.map((position) => (
              <TabsTrigger
                key={position}
                value={position}
                className='capitalize gap-1.5'
              >
                {position.replace(/_/g, ' ')}
                <Badge variant='secondary' className='text-xs px-1.5 py-0'>
                  {bannersByPosition[position].length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {positions.map((position) => (
            <TabsContent key={position} value={position} className='mt-0'>
              {view === 'grid' ? (
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {bannersByPosition[position].map((banner) => (
                    <BannerCard
                      key={banner.id}
                      banner={banner}
                      onPreview={handleOpenPreview}
                      onDelete={handleOpenDeleteDialog}
                    />
                  ))}
                </div>
              ) : (
                <div className='rounded-md border'>
                  {/* List header */}
                  <div className='grid grid-cols-12 gap-4 border-b bg-muted/40 px-4 py-2.5 text-xs font-medium text-muted-foreground'>
                    <div className='col-span-5'>Banner</div>
                    <div className='col-span-2'>Position</div>
                    <div className='col-span-2'>Status</div>
                    <div className='col-span-2'>Created</div>
                    <div className='col-span-1 text-right'>Actions</div>
                  </div>
                  <div className='divide-y'>
                    {bannersByPosition[position].map((banner) => (
                      <BannerRow
                        key={banner.id}
                        banner={banner}
                        onPreview={handleOpenPreview}
                        onDelete={handleOpenDeleteDialog}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Preview Dialog */}
      <BannerPreviewDialog
        banner={previewBanner}
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Banner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this banner? This will also remove
              the image from Cloudinary. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCloseDeleteDialog}
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
