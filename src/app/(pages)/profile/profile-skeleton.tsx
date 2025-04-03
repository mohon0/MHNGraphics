"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto mt-10 animate-pulse space-y-8">
      {/* Profile Header Skeleton */}
      <Card className="overflow-hidden border-none bg-gradient-to-r from-slate-100 to-slate-50 shadow-md dark:from-slate-900 dark:to-slate-800">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            {/* Avatar Skeleton */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 opacity-75 blur-sm dark:from-slate-700 dark:to-slate-600"></div>
              <Skeleton className="h-28 w-28 rounded-full" />
            </div>

            {/* Profile Info Skeleton */}
            <div className="flex-1 text-center sm:text-left">
              <Skeleton className="mb-2 h-8 w-48 sm:w-64" />
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="mt-1 h-4 w-full max-w-sm" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="mt-4 flex gap-2 sm:mt-0 sm:self-start">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Stats Skeleton */}
      <Card>
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

      {/* Profile Content Skeleton */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Profile Info Skeleton */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <Skeleton className="mb-4 h-7 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="my-6 h-px w-full" />

              <Skeleton className="mb-4 h-6 w-40" />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              <Skeleton className="my-6 h-px w-full" />

              <Skeleton className="mb-4 h-6 w-56" />
              <div className="flex flex-wrap gap-2">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design Grid Skeleton */}
        <div className="w-full lg:w-2/3">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-10 w-full sm:max-w-xs" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-[180px]" />
                  <Skeleton className="h-10 w-[140px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-square w-full rounded-lg" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Skeleton className="h-10 w-64" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
