"use client";

import { FetchAdminData } from "@/components/fetch/admin/FetchAdminData";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { FetchDuration } from "@/components/fetch/admin/FetchDuration";
import axios from "axios";
import { toast } from "react-toastify";
import { FileIcon as FileUser, Layers2, MessageCircle, Users, UsersRound } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminDashboard() {
  const { isLoading, data } = FetchAdminData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <DashboardHeader />
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <QuickStats isLoading={isLoading} data={data} />
          <DurationToggle />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <RecentActivity isLoading={isLoading} />
          <TopPerformingDesigns isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}


function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
    </div>
  );
}



function DurationToggle() {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const { refetch } = FetchDuration();

  useEffect(() => {
    const apiUrl = `api/admin/duration`;

    axios
      .get(apiUrl)
      .then((response) => {
        setVisibility(response.data.button === "On");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const handleSwitchChange = async () => {
    const newData = !visibility;

    try {
      toast.loading("Please wait...");
      const response = await axios.patch(
        "api/admin/duration",
        { button: newData ? "On" : "Off" },
        { withCredentials: true },
      );

      if (response.status === 200) {
        toast.dismiss();
        setVisibility(newData);
        refetch();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error updating status");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Free Application</CardTitle>
        <div className={`rounded-full p-2 bg-sky-100 text-sky-600`}>
          <FileUser /></div>
      </CardHeader>
      <CardContent className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex items-center space-x-2">
            <Switch id="free" checked={visibility} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="free">Free Apply {visibility ? 'Open' : 'Closed'}</Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


interface QuickStat {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface QuickStatsProps {
  isLoading: boolean;
  data: any;
}

function QuickStats({ isLoading, data }: QuickStatsProps) {
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
        icon: <FileUser className="h-6 w-6" />,
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
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`rounded-full p-2 ${stat.color}`}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
    </>
  );
}


interface RecentActivityProps {
  isLoading: boolean;
}
function RecentActivity({ isLoading }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center space-x-4 py-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))
        ) : (
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{`U${index + 1}`}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">User {index + 1}</p>
                    <p className="text-xs text-muted-foreground">Performed an action</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface TopPerformingDesignsProps {
  isLoading: boolean;
}

function TopPerformingDesigns({ isLoading }: TopPerformingDesignsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Top Performing Designs</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center space-x-4 py-2">
                <Skeleton className="h-10 w-10 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ))
        ) : (
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium">Design {index + 1}</p>
                    <p className="text-xs text-muted-foreground">{1000 - index * 100} views</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

