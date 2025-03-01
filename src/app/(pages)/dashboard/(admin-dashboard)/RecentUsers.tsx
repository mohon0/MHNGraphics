"use client";

import { UserType } from "@/components/interface/UserType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserList } from "@/services/admin";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight, Clock, User } from "lucide-react";
import Link from "next/link";

/**
 * Interface for user data
 */
interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
}

/**
 * RecentUsers Component
 *
 * Displays a list of recently registered users with their information,
 * roles, and registration timestamps. Includes a link to view all users.
 */
export default function RecentUsers() {
  const { isLoading, data, isError } = useUserList({
    page: 1,
    searchQuery: "",
    pageSize: 5,
  });

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
      <CardHeader className="border-b border-gray-100 bg-white pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-800 md:text-2xl">
            Recent Users
          </CardTitle>
          <Link href="/dashboard/users?page=1">
            <Button variant="link" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <RecentUsersSkeleton />
        ) : isError ? (
          <div className="p-6 text-center text-red-500">
            Error loading recent users.
          </div>
        ) : data.data.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {data.data.map((user: UserType) => (
              <li key={user.id} className="group relative overflow-hidden">
                <Link
                  href={`/dashboard/users/${user.id}`}
                  className="flex items-center space-x-4 p-4 transition-all duration-200 ease-in-out group-hover:bg-blue-50"
                >
                  <Avatar className="h-12 w-12 rounded-full border-2 border-white shadow-sm transition-transform duration-200 ease-in-out group-hover:scale-110">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      <User className="h-6 w-6 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <div className="flex flex-wrap items-center space-x-2 space-y-1">
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDistanceToNow(new Date(user.createdAt), {
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
                    <span className="sr-only">View user</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No recent users found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * RecentUsersSkeleton Component
 *
 * Displays placeholder loading state for the recent users list
 * with animated skeleton elements.
 */
function RecentUsersSkeleton() {
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
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ))}
    </div>
  );
}
