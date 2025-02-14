"use client";
import img1 from "@/images/best-computer/bg_notice_board.png";
import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";
import { useFetchNotice } from "@/components/fetch/best-computer/FetchNotice";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Notice() {
 
  const { data, isLoading, error } = useFetchNotice(1, 5);

  return (
    <div className="mx-2 my-10 grid grid-cols-1 gap-10 md:mx-20 md:grid-cols-2">
      <div className="flex gap-10 overflow-hidden border bg-gradient-to-b from-gray-50 to-gray-200">
        <Image
          src={img1}
          alt="Notice Board Background"
          className="hidden h-fit w-24 md:block"
        />
        <div className="px-2 py-3 md:py-6">
          <CardTitle className="text-xl font-bold">নোটিশ বোর্ড</CardTitle>
          <div className="p-2">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full rounded" />
                ))}
              </div>
            ) : error ? (
              <p>Error loading notices</p>
            ) : data && data.notices && data.notices.length > 0 ? (
              <ul className="space-y-2">
                {data.notices.map((notice: any) => (
                  <li key={notice.id} className="text-sm">
                    <Link href={notice.pdfUrl} target="_blank">
                      {notice.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">No notices available</p>
            )}
            <div className="mt-4 flex items-center justify-end">
              <Link
                href="/best-computer-training-center/notice"
                className="rounded border border-primary-100 px-3 py-1"
              >
                সব দেখুন
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <AnimatedButton />
      </div>
    </div>
  );
}
