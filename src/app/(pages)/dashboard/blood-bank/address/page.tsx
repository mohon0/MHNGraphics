"use client";
import { AddressListType } from "@/components/interface/UserType";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressPagination from "./AddressPagination";

export default function AddressPage() {
  return (
    <Suspense fallback={<AddressPageSkeleton />}>
      <AddressContent />
    </Suspense>
  );
}

function AddressPageSkeleton() {
  return (
    <Card className="mx-auto max-w-7xl">
      <CardHeader>
        <Skeleton className="mx-auto h-8 w-64" />
      </CardHeader>
      <CardContent>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <AddressCardSkeleton key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const AddressContent: React.FC = () => {
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [searchInput, setSearchInput] = useState("");
  const [filterBy, setFilterBy] = useState("All");

  const { isLoading, data, error } = useAddress({
    currentPage: page,
    filterBy,
    searchInput,
  });

  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams({
      page: page.toString(),
      searchInput,
      filterBy,
    });
    router.replace(`/dashboard/blood-bank/address?${query.toString()}`);
  }, [page, searchInput, filterBy, router]);

  if (status !== "authenticated" || session?.user?.role !== "ADMIN") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You are not authorized to view this page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mx-auto max-w-7xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Address Directory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddressFilter
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        {isLoading ? (
          <AddressGrid isLoading={true} users={[]} />
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : data === "No users found." ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Results</AlertTitle>
            <AlertDescription>
              No users found matching your criteria.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <AddressGrid isLoading={false} users={data.users} />
            <AddressPagination
              totalPages={Math.ceil((data?.totalUsersCount || 0) / 20)}
              query=""
              initialPage={page}
              setPage={setPage}
            />
          </>
        )}
      </CardContent>
      <ToastContainer position="top-center" autoClose={3000} />
    </Card>
  );
};

function AddressCardSkeleton() {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-col items-center">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="mt-2 h-6 w-32" />
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

interface AddressFilterProps {
  filterBy: string;
  setFilterBy: (value: string) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
}

function AddressFilter({
  filterBy,
  setFilterBy,
  searchInput,
  setSearchInput,
}: AddressFilterProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end">
      <div className="flex-1 space-y-2">
        <Label htmlFor="bloodGroup">Filter By Blood Group:</Label>
        <Select onValueChange={setFilterBy} value={filterBy}>
          <SelectTrigger id="bloodGroup">
            <SelectValue placeholder="Blood Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 space-y-2">
        <Label htmlFor="search">Search:</Label>
        <div className="relative">
          <Input
            id="search"
            type="text"
            placeholder="Search by address..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
      </div>
    </div>
  );
}

interface AddressGridProps {
  isLoading: boolean;
  users: AddressListType[];
}

function AddressGrid({ isLoading, users }: AddressGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <AddressCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <AddressCard key={user.id} user={user} />
      ))}
    </div>
  );
}

interface AddressCardProps {
  user: AddressListType;
}

import { Badge } from "@/components/ui/badge";
import { useAddress } from "@/services/blood-bank";
import { Mail, MapPin, Phone, User } from "lucide-react";

interface AddressCardProps {
  user: AddressListType;
}

function AddressCard({ user }: AddressCardProps) {
  return (
    <Card className="flex flex-col justify-between overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="flex flex-col items-center space-y-2 pb-6">
        <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
          <AvatarImage src={user.image} alt={user.studentName} />
          <AvatarFallback>{user.studentName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-center text-xl font-bold text-primary">
          {user.studentName}
        </h3>
        {user.bloodGroup && (
          <Badge className="text-sm font-semibold">{user.bloodGroup}</Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {user.email && (
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{user.email}</span>
          </div>
        )}
        {user.mobileNumber && (
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{user.mobileNumber}</span>
          </div>
        )}
        {user.fullAddress && (
          <div className="flex items-start space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{user.fullAddress}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Link
          href={`/dashboard/application-list/single-application?id=${user.id}`}
          className="w-full"
        >
          <Button className="w-full" variant="default">
            <User className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
