"use client";

import PaginationUi from "@/components/common/pagination/PaginationUi";
import TableSkeleton from "@/components/common/skeleton/TableSkeleton";
import { FetchAllUser } from "@/components/fetch/users/FetchAllUsers";
import { convertDateString } from "@/components/helper/date/convertDateString";
import { UserType } from "@/components/interface/UserType";
import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { DashboardSidebar } from "@/components/layout/admin/DashboardSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  SelectItem,
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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

function UserCard({
  item,
  onDelete,
  onStatusChange,
}: {
  item: UserType;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link href={`/profile?id=${item.id}`}>
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={item.image} alt={item.name} />
              <AvatarFallback className="text-xl font-medium">
                {item.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 space-y-2">
            <Link href={`/profile?id=${item.id}`} className="font-medium">
              {item.name}
            </Link>
            <div className="text-sm text-muted-foreground">{item.email}</div>
            <div className="pt-2">
              {item.status === "ADMIN" ? (
                <span className="text-sm font-medium">ADMIN</span>
              ) : (
                <Select
                  defaultValue={item.status}
                  onValueChange={(value) => onStatusChange(item.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="AUTHOR">Author</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="text-muted-foreground">
                {convertDateString(item.createdAt.toString())}
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. It will delete everything
                      related to this user.
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

function Users() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;

  const { isLoading, data, isError, refetch } = FetchAllUser({
    page,
    searchQuery,
  });

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  const handleDelete = async (id: string) => {
    toast.loading("Please wait...");
    try {
      const response = await axios.delete(`/api/users?id=${id}`);
      if (response.status === 200) {
        toast.dismiss();
        toast.success("User deleted successfully");
        refetch();
      } else {
        toast.dismiss();
        toast.error("Error deleting user");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error deleting user");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    toast.loading("Please wait...");
    try {
      const response = await axios.patch(`/api/profile?id=${id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        toast.dismiss();
        toast.success("User updated successfully");
        refetch();
      } else {
        toast.dismiss();
        toast.error("Failed to update user");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update the user");
    }
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1">
        <BreadCrumb />
        <div className="container mx-auto px-4 py-4">
          <h1 className="mb-6 text-center text-3xl font-bold">All Users</h1>

          <div className="mb-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
                <Input
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full sm:w-auto"
                />
                <Button
                  onClick={() => refetch()}
                  disabled={searchQuery.length < 3 || isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Loading..." : "Search"}
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <TableSkeleton rowCount={10} />
          ) : isError ? (
            <DesignMessage message="Something went wrong while fetching the users." />
          ) : !data?.data || data.data.length === 0 ? (
            <DesignMessage message="No users available." />
          ) : (
            <>
              {/* Mobile View */}
              <div className="grid gap-4 md:hidden">
                {data.data.map((item: UserType) => (
                  <UserCard
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <Table className="mt-4 w-full table-auto">
                  <TableHeader className="w-full bg-secondary">
                    <TableRow className="w-full border-t">
                      <TableHead className="hidden sm:table-cell">
                        Design
                      </TableHead>
                      <TableHead className="min-w-[100px]">Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden text-right sm:table-cell">
                        Created At
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((item: UserType) => (
                      <TableRow key={item.id} className="group">
                        <TableCell className="hidden sm:table-cell">
                          <Link href={`/profile?id=${item.id}`}>
                            <Avatar className="h-12 w-12 border">
                              <AvatarImage src={item.image} alt={item.name} />
                              <AvatarFallback className="text-xl font-medium">
                                {item.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center gap-4 sm:hidden">
                              <Link href={`/profile?id=${item.id}`}>
                                <Avatar className="h-12 w-12 border">
                                  <AvatarImage
                                    src={item.image}
                                    alt={item.name}
                                  />
                                  <AvatarFallback className="text-xl font-medium">
                                    {item.name
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                              <Link href={`/profile?id=${item.id}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="hidden sm:block">
                              <Link href={`/profile?id=${item.id}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="sm:hidden">
                              <div className="mt-2 text-sm text-muted-foreground">
                                {item.email}
                              </div>
                              <div className="mt-2">
                                {item.status === "ADMIN" ? (
                                  "ADMIN"
                                ) : (
                                  <Select
                                    defaultValue={item.status}
                                    onValueChange={(value) =>
                                      handleStatusChange(item.id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="USER">User</SelectItem>
                                      <SelectItem value="AUTHOR">
                                        Author
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">
                                {convertDateString(item.createdAt.toString())}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Link
                                href={`/profile?id=${item.id}`}
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
                                    <DialogTitle>Delete User</DialogTitle>
                                    <DialogDescription>
                                      This action cannot be undone. It will
                                      delete everything related to this user.
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
                        <TableCell className="hidden sm:table-cell">
                          {item.email}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {item.status === "ADMIN" ? (
                            "ADMIN"
                          ) : (
                            <Select
                              defaultValue={item.status}
                              onValueChange={(value) =>
                                handleStatusChange(item.id, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="AUTHOR">Author</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                        <TableCell className="hidden text-right sm:table-cell">
                          {convertDateString(item.createdAt.toString())}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {data?.meta && data.meta.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <PaginationUi
                totalPages={data.meta.totalPages}
                currentPage={page}
                query={searchQuery}
              />
            </div>
          )}
        </div>
      </main>
      <ToastContainer autoClose={3000} />
    </SidebarProvider>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<TableSkeleton rowCount={10} />}>
      <Users />
    </Suspense>
  );
}
