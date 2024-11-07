"use client";
import TableSkeleton from "@/components/common/skeleton/TableSkeleton";
import { FetchAllUser } from "@/components/fetch/users/FetchAllUsers";
import { convertDateString } from "@/components/helper/date/convertDateString";
import { UserType } from "@/components/interface/UserType";
import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { DashboardSidebar } from "@/components/layout/admin/DashboardSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

export default function Users({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentPage = Number(searchParams.page) || 1;
  const { isLoading, data, isError, refetch } = FetchAllUser({
    page: currentPage,
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

  //TODO: use search query instead of catch all route.
  // TODO: add pagination

  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <BreadCrumb />
          <div className="flex">
            <main className="mx-4 w-full">
              <div>
                <>
                  <h1 className="mb-10 text-center text-3xl font-bold">
                    All Users
                  </h1>
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <Button
                        onClick={() => refetch()}
                        disabled={searchQuery.length < 3 || isLoading}
                      >
                        {isLoading ? "Loading..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </>
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
                    <Table className="mt-4 hidden md:inline-table">
                      <TableHeader className="w-full bg-secondary">
                        <TableRow className="w-full border-t">
                          <TableHead className="text-left">Design</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="max-w-20 text-right">
                            Created At
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.data.map((item: UserType) => (
                          <TableRow key={item.id} className="group">
                            <TableCell className="items-start align-top">
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
                            </TableCell>
                            <TableCell className="align-top">
                              <div className="space-y-2">
                                <Link href={`/profile?id=${item.id}`}>
                                  {item.name}
                                </Link>
                                <div className="flex items-center gap-2 text-sm group-hover:flex lg:hidden">
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
                                          delete everything related to this
                                          user.
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
                                            onClick={() =>
                                              handleDelete(item.id)
                                            }
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
                              {item.email}
                            </TableCell>
                            <TableCell className="align-top">
                              {item.status}
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

                {/* Pagination */}
                {/* {data?.meta && data.meta.totalPages > 1 && (
          <div className="mt-8 text-center">
            <PaginationUi totalPages={data.meta.totalPages} />
          </div>
        )} */}
              </div>
            </main>
          </div>
        </main>
      </SidebarProvider>
      <ToastContainer autoClose={3000} />
    </>
  );
}
