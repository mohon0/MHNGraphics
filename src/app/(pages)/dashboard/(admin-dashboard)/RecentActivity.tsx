"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchRecentApplication } from "@/services/admin";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight, Clock, User } from "lucide-react";
import Link from "next/link";

/**
 * Interface for application data
 */
interface ApplicationData {
  id: string;
  studentName: string;
  image: string;
  course: string;
  createdAt: string;
}

/**
 * RecentActivity Component
 *
 * Displays a list of recent applications with student information,
 * course details, and timestamps. Includes a link to view all applications.
 */
export default function RecentActivity() {
  const { isLoading, data, isError } = FetchRecentApplication();

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
      <CardHeader className="border-b border-gray-100 bg-white pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-800 md:text-2xl">
            Recent Applications
          </CardTitle>
          <Link href="/dashboard/application-list?filter=All&page=1&sort=newest&certificate=All&name=&type=all">
            <Button variant="link" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <RecentActivitySkeleton />
        ) : isError ? (
          <div className="p-6 text-center text-red-500">
            Error loading recent applications.
          </div>
        ) : data.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {data.map((app: ApplicationData) => (
              <li key={app.id} className="group relative overflow-hidden">
                <Link
                  href={`/dashboard/application-list/single-application?id=${app.id}`}
                  className="flex items-center space-x-4 p-4 transition-all duration-200 ease-in-out group-hover:bg-blue-50"
                >
                  <Avatar className="h-12 w-12 rounded-full border-2 border-white shadow-sm transition-transform duration-200 ease-in-out group-hover:scale-110">
                    <AvatarImage src={app.image} alt={app.studentName} />
                    <AvatarFallback>
                      <User className="h-6 w-6 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-gray-800">
                      {app.studentName}
                    </p>
                    <div className="flex flex-wrap items-center space-x-2 space-y-1">
                      <Badge variant="secondary" className="capitalize">
                        {app.course}
                      </Badge>
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDistanceToNow(new Date(app.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5 text-primary" />
                    <span className="sr-only">View application</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No recent applications found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

/**
 * RecentActivitySkeleton Component
 *
 * Displays placeholder loading state for the recent applications list
 * with animated skeleton elements.
 */
function RecentActivitySkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ))}
    </div>
  );
}
