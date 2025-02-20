"use client";

import { FetchBloodBank } from "@/components/fetch/best-computer/FetchBloodBank";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BloodBankPagination from "./BloodBankPagination";

function List() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") || "All",
  );
  const [searchInput, setSearchInput] = useState(
    searchParams.get("searchInput") || "",
  );
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams({
      page: page.toString(),
      bloodGroup,
      searchInput,
    });
    router.replace(`/dashboard/blood-bank?${query.toString()}`);
  }, [page, bloodGroup, searchInput, router]);

  const handleFilterChange = (value: string) => setBloodGroup(value);
  const { data, isError, refetch, isFetching } = FetchBloodBank({
    currentPage: page,
    searchInput,
    bloodGroup,
  });

  const confirmDelete = async (id: string) => {
    try {
      toast.loading("Deleting, please wait...");

      const response = await axios.delete(
        `/api/best-computer/blood-bank?id=${id}`,
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Deleted successfully!");
        refetch(); // Refresh data after successful deletion
      } else {
        toast.dismiss();
        toast.error(`Failed to delete: ${response.statusText}`);
      }
    } catch (error: any) {
      toast.dismiss();
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(
          `Error: ${error.response.data?.message || "Something went wrong"}`,
        );
      } else if (error.request) {
        // Request was made, but no response received
        toast.error("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="mx-2">
      <div>
        <div className="text-center text-3xl font-bold md:text-5xl">
          Blood Bank
        </div>
        <div className="my-10 flex w-full flex-col items-center justify-center gap-3 md:gap-2 lg:flex-row lg:gap-10">
          {/* Filter dropdown */}
          <Select onValueChange={handleFilterChange} defaultValue={bloodGroup}>
            <SelectTrigger className="w-60">
              <Label>Filter By Blood Group:</Label>
              <SelectValue placeholder="Select Blood Group:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Blood Group</SelectLabel>
                {["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (value, idx) => (
                    <SelectItem
                      key={idx}
                      value={value}
                      onSelect={() => handleFilterChange(value)}
                    >
                      {value}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Search input */}
          <div className="relative flex w-full items-center md:w-1/2">
            <Input
              type="text"
              placeholder="Search by applicant name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="absolute right-4 text-xl">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>
      {/* Application list */}
      {session?.user?.role === "ADMIN" ? (
        <>
          {isFetching ? (
            <Loading />
          ) : isError ? (
            <p>Error loading applications. No Application Found.</p>
          ) : data === "No Application Found." ? (
            "No Application Found"
          ) : data.users && data.users.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 gap-3 gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-4">
                {data.users.map((user: any) => (
                  <Card key={user.id}>
                    <CardContent>
                      <div className="mt-2 flex justify-between">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <FaTrash size="12" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Application data will be deleted from the
                                database.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => confirmDelete(user.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Avatar className="mx-auto h-20 w-20">
                          <AvatarImage src={user.image} alt="@shadcn" />
                          <AvatarFallback>No Image</AvatarFallback>
                        </Avatar>
                        <Link
                          href={`/dashboard/blood-bank/edit-blood-bank?id=${user.id}`}
                        >
                          <Button size="icon" variant="secondary">
                            <FaEdit />
                          </Button>
                        </Link>
                      </div>

                      <div className="mt-4">
                        <p className="font-bold uppercase text-primary">
                          {user.name}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Blood Group:{" "}
                          </span>
                          {user.bloodGroup}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            District:{" "}
                          </span>
                          {user.district}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Number:{" "}
                          </span>
                          {user.number}
                        </p>
                        {user.number2 && (
                          <p>
                            <span className="text-muted-foreground">
                              Number:{" "}
                            </span>
                            {user.number2}
                          </p>
                        )}
                        {user.birthDate && (
                          <p>
                            <span className="text-muted-foreground">
                              BirthDate:{" "}
                            </span>
                            {user.birthDate}
                          </p>
                        )}
                        <p>
                          <span className="text-muted-foreground">
                            Donated Before:{" "}
                          </span>
                          {user.donatedBefore}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Any Diseases:{" "}
                          </span>
                          {user.diseases}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Allergies:{" "}
                          </span>
                          {user.allergies}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Address:{" "}
                          </span>
                          {user.address}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-10">
                {data && data !== "No posts found" && data.count > 12 && (
                  <BloodBankPagination
                    totalPages={Math.ceil((data?.count || 0) / 12)}
                    query={searchInput}
                    initialPage={page}
                    setPage={setPage}
                  />
                )}
              </div>
            </div>
          ) : (
            <p>No application data available.</p>
          )}
        </>
      ) : (
        "You don't have permission to access this page."
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="mb-4 flex justify-between">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-10 w-10" />
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

export default function BloodBank() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            {" "}
            <div className="space-y-4 p-4">
              <Skeleton className="h-8 w-1/3" /> {/* Title placeholder */}
              <Skeleton className="h-4 w-full" /> {/* First paragraph line */}
              <Skeleton className="h-4 w-2/3" /> {/* Second paragraph line */}
              <Skeleton className="h-64 w-full rounded-md" />{" "}
              {/* Main content area placeholder */}
            </div>
          </div>
        }
      >
        <List />
      </Suspense>
    </div>
  );
}
