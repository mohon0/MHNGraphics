"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <Skeleton className="h-28 w-28 rounded-full" />

            <div className="flex-1 text-center sm:text-left">
              <Skeleton className="mb-2 h-8 w-48 sm:w-64" />
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="mt-1 h-4 w-full max-w-sm" />
            </div>

            <div className="mt-4 flex gap-2 sm:mt-0 sm:self-start">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-4 text-center"
                >
                  <Skeleton className="mb-1 h-5 w-16" />
                  <Skeleton className="h-7 w-12" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full sm:max-w-xs" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4">
                    <Skeleton className="mb-2 h-6 w-3/4" />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
