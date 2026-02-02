'use client';

import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import {
  ArrowRight,
  Award,
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { SiAnswer } from 'react-icons/si';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotice } from '@/services/notice';

interface Notice {
  id: string;
  title: string;
  pdfUrl: string;
  pdfPublicId: string;
  createdAt: string;
}

export default function ModernNoticeBoard() {
  const { data, isLoading, error } = useNotice(1, 5);

  const formatNoticeDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'আজ';
    if (isYesterday(date)) return 'গতকাল';
    const daysAgo = formatDistanceToNow(date, { addSuffix: true });
    if (daysAgo.includes('day') && !daysAgo.includes('month')) {
      const days = Math.floor(
        (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
      );
      return `${days} দিন আগে`;
    }
    return format(date, 'dd MMM yyyy');
  };

  const LoadingSkeleton = () => (
    <div className='space-y-4'>
      {[...Array(5)].map((_, index) => (
        <div
          // biome-ignore lint: error
          key={index}
          className='flex items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xs'
        >
          <Skeleton className='h-12 w-12 shrink-0 rounded-xl' />
          <div className='flex-1 space-y-3'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-3 w-32' />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className='container relative mx-auto py-12'>
        <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-2'>
          {/* Notice Board Card */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-6'>
                <div className='relative'>
                  <div className='flex items-center justify-center rounded-lg border  md:h-12 md:w-12'>
                    <Bell />
                  </div>
                </div>
                <div className='flex-1'>
                  <CardTitle className='text-primary'>নোটিশ বোর্ড</CardTitle>
                  <p className='mt-2 flex items-center gap-2 text-muted-foreground'>
                    সর্বশেষ ঘোষণা ও বিজ্ঞপ্তি
                  </p>
                </div>
                {data?.totalNotices && (
                  <Badge>
                    <Clock className='mr-1 h-3 w-3' />
                    {data.totalNotices} টি নোটিশ
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className='relative space-y-6 p-2 md:p-6'>
              {isLoading ? (
                <LoadingSkeleton />
              ) : error ? (
                <Alert className='border-red-200 bg-red-50'>
                  <AlertDescription className='text-red-700'>
                    নোটিশ লোড করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।
                  </AlertDescription>
                </Alert>
              ) : data?.notices && data.notices.length > 0 ? (
                <div className='space-y-4'>
                  {data.notices.map((notice: Notice, index: number) => (
                    <Link
                      key={notice.id}
                      href={notice.pdfUrl}
                      target='_blank'
                      className='group/item block'
                    >
                      <div className='flex items-start gap-4 rounded-2xl border backdrop-blur-xs transition-all duration-300 hover:scale-[1.02] p-2 hover:shadow-xl md:p-3'>
                        <div className='shrink-0'>
                          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover/item:scale-110'>
                            <FileText className='h-5 w-5 text-white' />
                          </div>
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h4 className='line-clamp-2 text-base font-semibold  transition-colors group-hover/item:text-primary'>
                            {notice.title}
                          </h4>
                          <div className='mt-2 flex items-center gap-3'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4 text-muted-foreground' />
                              <span className='text-xs text-muted-foreground'>
                                {formatNoticeDate(notice.createdAt)}
                              </span>
                            </div>
                            {index === 0 && (
                              <Badge className='bg-linear-to-r from-green-500 to-emerald-600 px-2 py-1 text-xs text-white'>
                                <Sparkles className='mr-1 h-3 w-3' />
                                নতুন
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className='shrink-0'>
                          <ExternalLink className='h-5 w-5 text-muted-foreground transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-primary' />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className='py-12 text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100'>
                    <FileText className='h-8 w-8 text-slate-400' />
                  </div>
                  <p className='text-slate-600'>কোন নোটিশ পাওয়া যায়নি</p>
                </div>
              )}

              {/* View All Button */}
              <div>
                <Link href='/oylkka-it-and-training-center/notice'>
                  <Button className='group w-full  shadow-lg transition-all duration-300 '>
                    <span className='font-medium'>সব নোটিশ দেখুন</span>
                    <ChevronRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Application Section */}
          <div className='space-y-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
            {/* Application Button Card */}
            <Card>
              <CardContent className='flex  flex-col items-center gap-6 p-6 md:flex-row text-center'>
                <div className='w-full'>
                  <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary'>
                    <Users className='h-8 w-8' />
                  </div>
                  <h3 className='mb-4 text-2xl font-bold '>আজই যোগ দিন</h3>
                  <p className='mb-6 text-muted-foreground'>
                    আপনার ভবিষ্যৎ গড়ুন আমাদের সাথে
                  </p>
                  <Link href='/oylkka-it-and-training-center/application'>
                    <Button className='w-full'>আবেদন করুন</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='flex flex-col items-center gap-6 p-6 md:flex-row text-center'>
                <div className='w-full'>
                  <div className='mx-auto mb-6 flex h-16 w-16 items-center bg-secondary justify-center rounded-full'>
                    <SiAnswer className='h-8 w-8' />
                  </div>
                  <h3 className='mb-4 text-2xl font-bold '>কুইজ শুরু করুন</h3>
                  <p className='mb-6 text-muted-foreground'>
                    আপনার জ্ঞান পরীক্ষা করুন এবং নতুন কিছু শিখুন
                  </p>
                  <Link href='/quiz'>
                    <Button className='w-full'>কুইজ খেলুন</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Required Documents Card */}
            <Card className='relative overflow-hidden md:col-span-2 '>
              <CardHeader className='relative'>
                <CardTitle className='flex items-center gap-3 text-xl font-bold '>
                  <Award className='h-6 w-6 text-amber-600' />
                  আবেদনের জন্য প্রয়োজনীয় কাগজপত্র
                </CardTitle>
              </CardHeader>
              <CardContent className='relative space-y-4'>
                {[
                  'পাসপোর্ট সাইজের এক কপি রঙিন ছবি',
                  'এস.এস.সি/জে.এস.সি মার্কশীটের ফটোকপি',
                  'এন.আই.ডি/জন্ম নিবন্ধনের ফটোকপি',
                ].map((item, index) => (
                  <div
                    key={item}
                    className='flex items-start gap-3 rounded-xl bg-secondary p-4 backdrop-blur-xs'
                  >
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-emerald-600' />
                    <p>
                      <span className='font-semibold '>{index + 1}.</span>{' '}
                      {item}
                    </p>
                  </div>
                ))}
                <div className='mt-6 rounded-xl text-primary p-4'>
                  <p className='flex items-center gap-2 text-sm '>
                    <ArrowRight className='h-4 w-4' />
                    সব কাগজপত্র সাথে নিয়ে আসুন
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
