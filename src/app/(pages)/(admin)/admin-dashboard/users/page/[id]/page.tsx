"use client";
import PaginationUi from "@/components/common/pagination/PaginationUi";
import TableSkeleton from "@/components/common/skeleton/TableSkeleton";
import { FetchAllUser } from "@/components/fetch/users/FetchAllUsers";
import { convertDateString } from "@/components/helper/date/convertDateString";
import { UserType } from "@/components/interface/UserType";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

export default function Design({
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

  if (isError) {
    toast.error("Something went wrong while fetching the designs.");
  }

  return (
    <>
      <div className="mx-10 my-10">
        <>
          <h1 className="mb-10 text-center text-3xl font-bold">All Users</h1>
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
                    <TableCell className="align-top">
                      <div className="space-y-2">
                        <Link href={`/profile?id=${item.id}`}>{item.name}</Link>
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
                                <DialogTitle>Delete Product</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this product?
                                  This action cannot be undone.
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
                    <TableCell className="align-top">{item.email}</TableCell>
                    <TableCell className="align-top">{item.status}</TableCell>

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
        {data?.meta && data.meta.totalPages > 1 && (
          <div className="mt-8 text-center">
            <PaginationUi totalPages={data.meta.totalPages} />
          </div>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
}
