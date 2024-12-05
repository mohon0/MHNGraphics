"use client";

import PaginationUi from "@/components/common/pagination/PaginationUi";
import DesignSkeleton from "@/components/common/skeleton/DesignSkeleton";
import TableSkeleton from "@/components/common/skeleton/TableSkeleton";
import { productCategories } from "@/components/data/ProductCategory";
import { FetchUserDesign } from "@/components/fetch/design/FetchUserDesign";
import { convertDateString } from "@/components/helper/date/convertDateString";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { DesignType } from "@/components/interface/DesignType";
import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { DashboardSidebar } from "@/components/layout/admin/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

function DesignCard({
  item,
  session,
  onDelete,
  onStatusChange,
}: {
  item: DesignType;
  session: any;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link href={createSlug(item.category, item.name, item.createdAt)}>
            <Image
              src={item.image}
              alt={item.name}
              height={100}
              width={100}
              className="h-24 w-24 object-cover"
              priority
            />
          </Link>
          <div className="flex-1 space-y-2">
            <Link
              href={createSlug(item.category, item.name, item.createdAt)}
              className="font-medium hover:underline"
            >
              {item.name}
            </Link>
            <div className="text-sm text-muted-foreground">
              <p>Category: {item.category}</p>
              <p>Author: {item.author.name}</p>
              <p>{convertDateString(item.createdAt.toString())}</p>
            </div>
            <div className="pt-2">
              {session?.user?.role === "ADMIN" ? (
                <Select
                  defaultValue={item.status}
                  onValueChange={(value) => onStatusChange(item.id, value)}
                >
                  <SelectTrigger
                    className={`w-full ${
                      item.status === "PUBLISHED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLISHED" className="text-green-600">
                      Published
                    </SelectItem>
                    <SelectItem value="PENDING" className="text-yellow-600">
                      Pending
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p
                  className={
                    item.status === "PUBLISHED"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {item.status}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href={`/dashboard/edit-design?id=${item.id}`}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link
                href={createSlug(item.category, item.name, item.createdAt)}
                className="text-sm text-primary hover:underline"
              >
                View
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm font-normal text-destructive hover:bg-transparent"
                  >
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Delete Design</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this design? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Design() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || "",
  );

  const handleFilterChange = useCallback(
    (value: string) => {
      setCategory(value);
      router.push(
        `/dashboard/all-design?category=${value}&query=${searchQuery}&page=1`,
      );
    },
    [router, searchQuery],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
      router.push(
        `/dashboard/all-design?category=${category}&query=${newQuery}&page=1`,
      );
    },
    [router, category],
  );

  const handleSearch = useCallback(() => {
    router.push(
      `/dashboard/all-design?category=${category}&query=${searchQuery}&page=1`,
    );
  }, [router, category, searchQuery]);

  const categoryName = searchParams.get("category") || "All";
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { isLoading, data, isError, refetch } = FetchUserDesign({
    page,
    category: categoryName,
    searchQuery: query,
  });

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting design... ⏳");

    try {
      const response = await fetch(`/api/design/single-design?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the design.");
      }

      toast.update(toastId, {
        render: "Design deleted successfully! ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      refetch();
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to delete the design. ❌ Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    toast.loading("Please wait...");
    try {
      const response = await axios.patch(`/api/design/single-design?id=${id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Design updated successfully");
        refetch();
      } else {
        toast.dismiss();
        toast.error("Failed to update design");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update the design");
    }
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <BreadCrumb />
        <div className="flex">
          <main className="mx-4 w-full">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Select value={category} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>All Categories</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        {productCategories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value
                              .toLowerCase()
                              .replace(/\s+/g, "_")}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? "Loading..." : "Filter"}
                  </Button>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Input
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="w-full sm:w-auto"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? "Loading..." : "Search"}
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="mt-10">
                  <TableSkeleton rowCount={10} />
                </div>
              ) : isError ? (
                <DesignMessage message="Something went wrong while fetching the designs." />
              ) : !data?.data || data.data.length === 0 ? (
                <DesignMessage message="No designs available." />
              ) : (
                <>
                  {/* Mobile View */}
                  <div className="grid gap-4 md:hidden">
                    {data.data.map((item: DesignType) => (
                      <DesignCard
                        key={item.id}
                        item={item}
                        session={session}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>

                  {/* Desktop View */}
                  <Table className="mt-4 hidden md:inline-table">
                    <TableHeader className="w-full bg-secondary">
                      <TableRow className="w-full border-t">
                        <TableHead className="text-left">Design</TableHead>
                        <TableHead className="w-80">Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="max-w-20 text-right">
                          Created At
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.data.map((item: DesignType) => (
                        <TableRow key={item.id} className="group">
                          <TableCell className="items-start align-top">
                            <Link
                              href={createSlug(
                                item.category,
                                item.name,
                                item.createdAt,
                              )}
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                height={100}
                                width={100}
                                className="w-20"
                                priority
                              />
                            </Link>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="space-y-2">
                              <Link
                                href={createSlug(
                                  item.category,
                                  item.name,
                                  item.createdAt,
                                )}
                              >
                                {item.name}
                              </Link>
                              <div className="flex items-center gap-4 text-sm group-hover:flex lg:hidden">
                                <Link
                                  href={`/dashboard/edit-design?id=${item.id}`}
                                  className="text-primary"
                                >
                                  Edit
                                </Link>
                                <Separator
                                  orientation="vertical"
                                  className="h-3 bg-black"
                                />
                                <Link
                                  href={createSlug(
                                    item.category,
                                    item.name,
                                    item.createdAt,
                                  )}
                                  className="text-primary"
                                >
                                  View
                                </Link>
                                <Separator
                                  orientation="vertical"
                                  className="h-3 bg-black"
                                />
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <span className="cursor-pointer text-destructive">
                                      Delete
                                    </span>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Delete Design</DialogTitle>
                                      <DialogDescription>
                                        Are you sure you want to delete this
                                        design? This action cannot be undone.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          type="button"
                                          variant="secondary"
                                        >
                                          Cancel
                                        </Button>
                                      </DialogClose>
                                      <DialogClose asChild>
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          onClick={() => handleDelete(item.id)}
                                        >
                                          Delete
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            {item.category}
                          </TableCell>
                          <TableCell className="align-top">
                            {session?.user?.role === "ADMIN" ? (
                              <Select
                                defaultValue={item.status}
                                onValueChange={(value) =>
                                  handleStatusChange(item.id, value)
                                }
                              >
                                <SelectTrigger
                                  className={`w-[120px] ${
                                    item.status === "PUBLISHED"
                                      ? "text-green-600"
                                      : "text-yellow-600"
                                  }`}
                                >
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value="PUBLISHED"
                                    className="text-green-600"
                                  >
                                    Published
                                  </SelectItem>
                                  <SelectItem
                                    value="PENDING"
                                    className="text-yellow-600"
                                  >
                                    Pending
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p
                                className={
                                  item.status === "PUBLISHED"
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }
                              >
                                {item.status}
                              </p>
                            )}
                          </TableCell>
                          <TableCell className="align-top">
                            {item.author.name}
                          </TableCell>
                          <TableCell className="text-right align-top leading-6">
                            {convertDateString(item.createdAt.toString())}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}

              {data?.meta && data.meta.totalPages > 1 && (
                <div className="mt-8 text-center">
                  <PaginationUi
                    totalPages={data.meta.totalPages}
                    category={category}
                    currentPage={page}
                    query={searchQuery}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<DesignSkeleton />}>
      <Design />
    </Suspense>
  );
}
