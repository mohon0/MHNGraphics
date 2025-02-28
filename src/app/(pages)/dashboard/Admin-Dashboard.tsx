"use client";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  FetchRecentApplication,
  FetchRecentDesign,
  useFetchAdminData,
  useFetchDuration,
} from "@/services/admin";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronRight,
  Clock,
  FileIcon as FileUser,
  ImageIcon,
  Layers2,
  MessageCircle,
  User,
  Users,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { isLoading, data } = useFetchAdminData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-6 grid grid-cols-2 gap-2 md:gap-6 lg:grid-cols-4">
        <QuickStats isLoading={isLoading} data={data} />
        <DurationToggle />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <TopPerformingDesigns />
      </div>
    </div>
  );
}

function DurationToggle() {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const { refetch } = useFetchDuration();

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
        <div className={`rounded-full bg-sky-100 p-2 text-sky-600`}>
          <FileUser />
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex items-center space-x-2">
            <Switch
              id="free"
              checked={visibility}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="free">
              Free Apply {visibility ? "Open" : "Closed"}
            </Label>
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

interface ApplicationData {
  id: string;
  studentName: string;
  image: string;
  course: string;
  createdAt: string;
}

export function RecentActivity() {
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

interface DesignData {
  id: string;
  name: string;
  image: string;
  createdAt: string;
}

export function TopPerformingDesigns() {
  const { isLoading, data, isError } = FetchRecentDesign();
  const [designs, setDesigns] = useState<DesignData[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setDesigns(data);
    }
  }, [data]);

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
      <CardHeader className="border-b border-gray-100 bg-white pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-800 md:text-2xl">
            Recent Designs
          </CardTitle>
          <Link href="/dashboard/all-design?category=all&query=&page=1">
            <Button variant="link" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <TopPerformingDesignsSkeleton />
        ) : isError ? (
          <div className="p-6 text-center text-red-500">
            Error loading recent designs.
          </div>
        ) : designs.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {designs.map((design, index) => (
              <li key={design.id} className="group relative overflow-hidden">
                <Link
                  href={`${createSlug({ id: design.id, name: design.name })}`}
                  className="flex items-center space-x-4 p-4 transition-all duration-200 ease-in-out group-hover:bg-blue-50"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-md shadow-sm transition-transform duration-200 ease-in-out group-hover:scale-105">
                    {design.image ? (
                      <Image
                        src={design.image}
                        alt={design.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-200 group-hover:opacity-80"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="line-clamp-1 font-semibold text-gray-800">
                      {design.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(design.createdAt), {
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
                    <span className="sr-only">View design</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No top performing designs found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TopPerformingDesignsSkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4">
            <Skeleton className="h-16 w-16 rounded-md" />
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
