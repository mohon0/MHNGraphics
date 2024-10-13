"use client";
import PaginationUi from "@/components/common/pagination/PaginationUi";
import TableSkeleton from "@/components/common/skeleton/TableSkeleton";
import { productCategories } from "@/components/data/ProductCategory";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { convertDateString } from "@/components/helper/date/convertDateString";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { DesignType } from "@/components/interface/DesignType";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
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
  const [category, setCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentPage = Number(searchParams.page) || 1;
  const { isLoading, data, isError, refetch } = FetchAllDesign({
    page: currentPage,
    category,
    searchQuery,
  });

  const handleFilterChange = useCallback((value: string) => {
    setCategory(value);
  }, []);

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
          <h1 className="mb-10 text-center text-3xl font-bold">All Design</h1>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="mt-4 flex gap-4">
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
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
              <Button onClick={() => refetch()} disabled={isLoading}>
                {isLoading ? "Loading..." : "Filter"}
              </Button>
            </div>
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
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
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
                          item.subcategory,
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
                            item.subcategory,
                            item.name,
                            item.createdAt,
                          )}
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-4 text-sm group-hover:flex lg:hidden">
                          <Link href="" className="text-primary">
                            Edit
                          </Link>
                          <Separator
                            orientation="vertical"
                            className="h-3 bg-black"
                          />
                          <Link
                            href={createSlug(
                              item.category,
                              item.subcategory,
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
                    <TableCell className="align-top">{item.category}</TableCell>
                    <TableCell className="align-top">
                      {item.subcategory}
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
