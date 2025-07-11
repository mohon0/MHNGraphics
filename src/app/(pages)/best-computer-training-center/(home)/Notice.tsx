"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNotice } from "@/services/notice";
import {
  FileText,
  Calendar,
  ExternalLink,
  Bell,
  ChevronRight,
  Sparkles,
  Users,
  Award,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

interface Notice {
  id: string;
  title: string;
  pdfUrl: string;
  pdfPublicId: string;
  createdAt: string;
}

interface NoticeData {
  page: number;
  pageSize: number;
  totalPages: number;
  totalNotices: number;
  notices: Notice[];
}

export default function ModernNoticeBoard() {
  const { data, isLoading, error } = useNotice(1, 5);

  const formatNoticeDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return "আজ";
    if (isYesterday(date)) return "গতকাল";
    const daysAgo = formatDistanceToNow(date, { addSuffix: true });
    if (daysAgo.includes("day") && !daysAgo.includes("month")) {
      const days = Math.floor(
        (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
      );
      return `${days} দিন আগে`;
    }
    return format(date, "dd MMM yyyy");
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
        >
          <Skeleton className="h-12 w-12 flex-shrink-0 rounded-xl" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-600/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto py-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Notice Board Card */}
          <Card className="hover:shadow-3xl group relative overflow-hidden border-0 bg-white/80 p-2 shadow-2xl backdrop-blur-xl transition-all duration-500 md:p-6">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />

            <CardHeader className="relative p-2 pb-6 md:p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-xl md:h-20 md:w-20">
                    <Bell className="text-white md:h-10 md:w-10" />
                  </div>
                  <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg md:h-6 md:w-6" />
                  <div className="absolute -right-1 -top-1 h-1 w-1 animate-ping rounded-full bg-red-400 md:h-4 md:w-4" />
                </div>
                <div className="flex-1">
                  <CardTitle className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-xl font-bold text-transparent md:text-3xl">
                    নোটিশ বোর্ড
                  </CardTitle>
                  <p className="mt-2 flex items-center gap-2 text-slate-600">
                    <Sparkles className="h-4 w-4" />
                    সর্বশেষ ঘোষণা ও বিজ্ঞপ্তি
                  </p>
                </div>
                {data?.totalNotices && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white shadow-lg">
                    <Clock className="mr-1 h-3 w-3" />
                    {data.totalNotices} টি নোটিশ
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="relative space-y-6 p-2 md:p-6">
              {isLoading ? (
                <LoadingSkeleton />
              ) : error ? (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    নোটিশ লোড করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।
                  </AlertDescription>
                </Alert>
              ) : data?.notices && data.notices.length > 0 ? (
                <div className="space-y-4">
                  {data.notices.map((notice: Notice, index: number) => (
                    <Link
                      key={notice.id}
                      href={notice.pdfUrl}
                      target="_blank"
                      className="group/item block"
                    >
                      <div className="flex items-start gap-4 rounded-2xl border border-white/50 bg-white/60 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-200 hover:bg-white/80 hover:shadow-xl md:p-5">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-2 text-base font-semibold text-slate-800 transition-colors group-hover/item:text-blue-600">
                            {notice.title}
                          </h4>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600">
                                {formatNoticeDate(notice.createdAt)}
                              </span>
                            </div>
                            {index === 0 && (
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 px-2 py-1 text-xs text-white">
                                <Sparkles className="mr-1 h-3 w-3" />
                                নতুন
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <ExternalLink className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-blue-600" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600">কোন নোটিশ পাওয়া যায়নি</p>
                </div>
              )}

              {/* View All Button */}
              <div className="border-t border-white/50 pt-6">
                <Link href="/best-computer-training-center/notice">
                  <Button className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl">
                    <span className="font-medium">সব নোটিশ দেখুন</span>
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Application Section */}
          <div className="space-y-8 p-2">
            {/* Application Button Card */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-700 p-1 shadow-2xl">
              <div className="rounded-2xl bg-white/95 p-8 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-600 shadow-xl">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-4 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-2xl font-bold text-transparent">
                    আজই যোগ দিন
                  </h3>
                  <p className="mb-8 text-slate-600">
                    আপনার ভবিষ্যৎ গড়ুন আমাদের সাথে
                  </p>
                  <Link href="/best-computer-training-center/application">
                    <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <span className="relative z-10 flex items-center gap-3">
                        আবেদন করুন
                        <div className="h-3 w-3 animate-pulse rounded-full bg-white/80" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Required Documents Card */}
            <Card className="relative overflow-hidden border-0 bg-white/80 shadow-xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800">
                  <Award className="h-6 w-6 text-amber-600" />
                  আবেদনের জন্য প্রয়োজনীয় কাগজপত্র
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {[
                  "পাসপোর্ট সাইজের এক কপি রঙিন ছবি",
                  "এস.এস.সি/জে.এস.সি মার্কশীটের ফটোকপি",
                  "এন.আই.ডি/জন্ম নিবন্ধনের ফটোকপি",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-white/60 p-4 backdrop-blur-sm"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">
                        {index + 1}.
                      </span>{" "}
                      {item}
                    </p>
                  </div>
                ))}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                  <p className="flex items-center gap-2 text-sm text-blue-700">
                    <ArrowRight className="h-4 w-4" />
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
