"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileIcon,
  Layers2,
  MessageCircle,
  Users,
  UsersRound,
} from "lucide-react";

/**
 * Interface for individual stat item
 */
interface QuickStat {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

/**
 * Props for QuickStats component
 */
interface QuickStatsProps {
  isLoading: boolean;
  data: any; // Dashboard data containing counts
}

/**
 * QuickStats Component
 *
 * Displays key metrics in card format:
 * - Total designs
 * - Total applications
 * - Total subscribers
 * - Total comments
 * - Total users
 *
 * Shows loading skeletons while data is being fetched.
 */
export default function QuickStats({ isLoading, data }: QuickStatsProps) {
  // Define stats based on fetched data
  const quickStats: QuickStat[] = isLoading
    ? []
    : [
        {
          title: "Designs",
          value: data.designCount,
          icon: <Layers2 className="h-6 w-6" />,
          color: "bg-blue-100 text-blue-600",
        },
        {
          title: "Applications",
          value: data.applicationCount,
          icon: <FileIcon className="h-6 w-6" />,
          color: "bg-green-100 text-green-600",
        },
        {
          title: "Subscribers",
          value: data.subscriberCount,
          icon: <Users className="h-6 w-6" />,
          color: "bg-yellow-100 text-yellow-600",
        },
        {
          title: "Comments",
          value: data.commentsCount,
          icon: <MessageCircle className="h-6 w-6" />,
          color: "bg-purple-100 text-purple-600",
        },
        {
          title: "Users",
          value: data.userCount,
          icon: <UsersRound className="h-6 w-6" />,
          color: "bg-pink-100 text-pink-600",
        },
      ];

  return (
    <>
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-[60px]" />
                </CardContent>
              </Card>
            ))
        : quickStats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.color}`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold md:text-2xl">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
    </>
  );
}
