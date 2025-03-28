"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ApplicationDataCard from "./ApplicationDataCard";
import ApplicationPagination from "./ApplicationPagination";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Search,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useApplicationList } from "@/services/application";
import { ApplicationSummary } from "@/utils/Interface";
import { ApplicationListSkeleton } from "./ApplicationListSkeleton";

function ApplicationListContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [filter, setFilter] = React.useState(
    searchParams.get("filter") || "All",
  );
  const [certificate, setCertificate] = React.useState(
    searchParams.get("certificate") || "All",
  );
  const [sortBy, setSortBy] = React.useState(
    searchParams.get("sort") || "newest",
  );
  const [searchInput, setSearchInput] = React.useState(
    searchParams.get("name") || "",
  );
  const [page, setPage] = React.useState(
    parseInt(searchParams.get("page") || "1"),
  );
  const type = searchParams.get("type") || "all";

  const { data, isError, refetch, isPending } = useApplicationList({
    page,
    filter,
    searchQuery: searchInput,
    certificate,
    sortBy,
    type,
  });

  // Update URL when filters change
  React.useEffect(() => {
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

  if (status === "loading") {
    return <ApplicationListSkeleton />;
  }

  if (session?.user?.role !== "ADMIN") {
    return (
      <div className="container mx-auto flex min-h-[400px] items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don&#39;t have permission to access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const statusIcons = {
    Approved: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    Pending: <Clock className="h-4 w-4 text-yellow-500" />,
    Rejected: <XCircle className="h-4 w-4 text-red-500" />,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setPage(1);
    setIsFiltersOpen(false);
  };

  const handleCertificateChange = (value: string) => {
    setCertificate(value);
    setPage(1);
    setIsFiltersOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
    setIsFiltersOpen(false);
  };

  const resetFilters = () => {
    setFilter("All");
    setCertificate("All");
    setSortBy("newest");
    setSearchInput("");
    setPage(1);
  };

  return (
    <div className="container mx-auto space-y-8 px-4 pb-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold md:text-4xl">Application List</h1>
        <Badge variant="outline" className="h-8 px-3 text-sm">
          {data?.totalPostsCount || 0} Total Applications
        </Badge>
      </div>

      <div className="sticky top-0 z-10 -mx-4 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by applicant name..."
                value={searchInput}
                onChange={handleSearchChange}
                className="w-full pl-9 md:max-w-sm"
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>

            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Adjust filters to refine your search
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filter">Application Status</Label>
                    <Select onValueChange={handleFilterChange} value={filter}>
                      <SelectTrigger id="filter">
                        <SelectValue placeholder="Filter By Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {["All", "Approved", "Pending", "Rejected"].map(
                            (value) => (
                              <SelectItem key={value} value={value}>
                                <div className="flex items-center gap-2">
                                  {
                                    statusIcons[
                                      value as keyof typeof statusIcons
                                    ]
                                  }
                                  {value}
                                </div>
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificate">Certificate Status</Label>
                    <Select
                      onValueChange={handleCertificateChange}
                      value={certificate}
                    >
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
                    <Label htmlFor="sortBy">Sort Order</Label>
                    <Select onValueChange={handleSortChange} value={sortBy}>
                      <SelectTrigger id="sortBy">
                        <SelectValue placeholder="Sort By Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sort By</SelectLabel>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div>
        {isPending ? (
          <ApplicationListSkeleton />
        ) : isError ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold">
              Error loading applications
            </h2>
            <p className="text-muted-foreground">Please try again later.</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        ) : data?.application?.length > 0 ? (
          <div className="space-y-8">
            <div
              className={cn(
                "grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4",
                isPending && "opacity-60",
              )}
            >
              {data.application.map((app: ApplicationSummary) => (
                <ApplicationDataCard key={app.id} {...app} refetch={refetch} />
              ))}
            </div>
            {data?.totalPostsCount && data.totalPostsCount > 20 && (
              <ApplicationPagination
                totalPages={Math.ceil((data?.totalPostsCount || 0) / 20)}
                category={filter}
                initialPage={page}
                sort={sortBy}
                certificate={certificate}
                query={searchInput}
                setPage={setPage}
              />
            )}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-3">
              <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">
              No applications found
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your filters or search criteria
            </p>
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
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
