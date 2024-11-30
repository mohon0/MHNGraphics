"use client";

import { FetchAdminData } from "@/components/fetch/admin/FetchAdminData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Layers2, MessageCircle, Users, UsersRound } from "lucide-react";
import React from "react";

export interface QuickStat {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const { isLoading, data, isError } = FetchAdminData();

  const quickStats = isLoading
    ? []
    : [
        {
          title: "Designs",
          value: data.designCount,
          icon: <Layers2 className="h-4 w-4 text-muted-foreground" />,
        },
        {
          title: "Subscribers",
          value: data.subscriberCount,
          icon: <Users className="h-4 w-4 text-muted-foreground" />,
        },
        {
          title: "Comments",
          value: data.commentsCount,
          icon: <MessageCircle className="h-4 w-4 text-muted-foreground" />,
        },
        {
          title: "Users",
          value: data.userCount,
          icon: <UsersRound className="h-4 w-4 text-muted-foreground" />,
        },
      ];

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-6">
        <div className="container mx-auto">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-7 w-[60px]" />
                      </CardContent>
                    </Card>
                  ))
              : quickStats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      {stat.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl font-semibold">
                  <span>Recent Activity</span>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 py-2"
                      >
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[150px]" />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="space-y-4">
                    {/* Replace with actual activity data */}
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <Avatar>
                            <AvatarFallback>{`U${index + 1}`}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              User {index + 1}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Performed an action
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl font-semibold">
                  <span>Top Performing Designs</span>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 py-2"
                      >
                        <Skeleton className="h-10 w-10 rounded" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="space-y-4">
                    {/* Replace with actual top designs data */}
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <div className="h-10 w-10 rounded bg-gray-200"></div>
                          <div>
                            <p className="text-sm font-medium">
                              Design {index + 1}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {1000 - index * 100} views
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
