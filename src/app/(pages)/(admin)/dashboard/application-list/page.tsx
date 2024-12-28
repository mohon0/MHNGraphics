"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { FetchAllApplication } from "@/components/fetch/best-computer/FetchApplication";
import { ApplicationListType } from "@/components/interface/ApplicationType";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import ApplicationDataCard from "./ApplicationDataCard";
import ApplicationPagination from "./ApplicationPagination";

function ApplicationListContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filter, setFilter] = useState(searchParams.get("filter") || "All");
  const [certificate, setCertificate] = useState(
    searchParams.get("certificate") || "All",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [searchInput, setSearchInput] = useState(
    searchParams.get("name") || "",
  );
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const type = searchParams.get("type") || "all";

  const { data, isError, refetch, isFetching } = FetchAllApplication({
    page,
    filter,
    searchQuery: searchInput,
    certificate,
    sortBy,
    type,
  });

  useEffect(() => {
    const query = new URLSearchParams({
      filter,
      page: page.toString(),
      sort: sortBy,
      certificate,
      name: searchInput,
      type,
    });
    router.replace(`/dashboard/application-list?${query.toString()}`);
  }, [filter, certificate, sortBy, searchInput, page, router, type]);

  if (session?.user?.role !== "ADMIN") {
    return (
      <Alert variant="destructive">
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You don&#39;t have permission to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-secondary">
          <CardTitle className="text-center text-3xl font-bold md:text-4xl">
            Application List
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="filter">Filter By:</Label>
              <Select onValueChange={setFilter} defaultValue={filter}>
                <SelectTrigger id="filter">
                  <SelectValue placeholder="Filter By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter By</SelectLabel>
                    {["All", "Approved", "Pending", "Rejected"].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortBy">Sort By:</Label>
              <Select onValueChange={setSortBy} defaultValue={sortBy}>
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    {["newest", "oldest"].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value === "newest" ? "Newest" : "Oldest"}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificate">Certificate:</Label>
              <Select onValueChange={setCertificate} defaultValue={certificate}>
                <SelectTrigger id="certificate">
                  <SelectValue placeholder="Select Certificate Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Certificate Status</SelectLabel>
                    {[
                      "All",
                      "At Office",
                      "Pending",
                      "Fail",
                      "Received",
                      "Course Incomplete",
                    ].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search:</Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by applicant name"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>
          </div>

          {isFetching ? (
            <LoadingSkeleton />
          ) : isError ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Error loading applications. Please try again later.
              </AlertDescription>
            </Alert>
          ) : data?.application?.length > 0 ? (
            <div>
              <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
                {data.application.map((app: ApplicationListType) => (
                  <ApplicationDataCard
                    key={app.id}
                    {...app}
                    refetch={refetch}
                  />
                ))}
              </div>
              {data?.totalPostsCount && data.totalPostsCount > 20 && (
                <div className="mt-8">
                  <ApplicationPagination
                    totalPages={Math.ceil((data?.totalPostsCount || 0) / 20)}
                    category={filter}
                    initialPage={page}
                    sort={sortBy}
                    certificate={certificate}
                    query={searchInput}
                    setPage={setPage}
                  />
                </div>
              )}
            </div>
          ) : (
            <Alert>
              <AlertTitle>No Data</AlertTitle>
              <AlertDescription>
                No application data available. Try adjusting your filters or
                search criteria.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="mb-4 flex justify-between">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-2 h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ApplicationList() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <ApplicationListContent />
    </Suspense>
  );
}
