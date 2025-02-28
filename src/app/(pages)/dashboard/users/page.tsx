"use client";

import type React from "react";

import PaginationUi from "@/components/common/pagination/PaginationUi";
import TableSkeleton from "@/components/common/skeleton/TableSkeleton";
import { convertDateString } from "@/components/helper/date/convertDateString";
import type { UserType } from "@/components/interface/UserType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useUserList } from "@/services/admin";
import axios from "axios";
import { Eye, RefreshCw, Search, Trash2, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccessDenied } from "./empty-state";
import { UsersList } from "./users-list";

// Replace the DesignMessage component with a more modern empty state
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <UsersIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
      <p className="text-xl font-medium text-muted-foreground">{message}</p>
    </div>
  );
}

// Update the UserCard component with a more modern design
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
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-4">
          <Link href={`/profile?id=${item.id}`}>
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={item.image} alt={item.name} />
              <AvatarFallback className="bg-primary/10 text-xl font-medium text-primary">
                {item.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Link
                href={`/profile?id=${item.id}`}
                className="font-medium hover:text-primary"
              >
                {item.name}
              </Link>
              {item.status === "ADMIN" && (
                <Badge variant="secondary" className="ml-2">
                  Admin
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">{item.email}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Joined {convertDateString(item.createdAt.toString())}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t bg-muted/30 p-3">
          {item.status === "ADMIN" ? (
            <Badge>Admin</Badge>
          ) : (
            <Select
              defaultValue={item.status}
              onValueChange={(value) => onStatusChange(item.id, value)}
            >
              <SelectTrigger className="h-8 w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="AUTHOR">Author</SelectItem>
              </SelectContent>
            </Select>
          )}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/profile?id=${item.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. It will delete
                          everything related to this user.
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
                </TooltipTrigger>
                <TooltipContent>Delete User</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Update the Users component with a more modern design
function Users() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;

  const { isLoading, data, isError, refetch } = useUserList({
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
    <div>
      <Card className="mb-6 border-none bg-transparent shadow-none">
        <CardHeader className="px-0 pt-0">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle className="text-3xl font-bold">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-7 w-7" />
                User Management
              </div>
            </CardTitle>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-9 sm:w-[250px]"
              />
              <Button
                onClick={() => refetch()}
                disabled={searchQuery.length < 3 || isLoading}
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {isLoading ? (
        <TableSkeleton rowCount={10} />
      ) : isError ? (
        <EmptyState message="Something went wrong while fetching the users." />
      ) : !data?.data || data.data.length === 0 ? (
        <EmptyState message="No users available." />
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
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((item: UserType) => (
                    <TableRow key={item.id} className="group">
                      <TableCell>
                        <Link href={`/profile?id=${item.id}`}>
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={item.image} alt={item.name} />
                            <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                              {item.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/profile?id=${item.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.status === "ADMIN" ? (
                          <Badge>Admin</Badge>
                        ) : (
                          <Select
                            defaultValue={item.status}
                            onValueChange={(value) =>
                              handleStatusChange(item.id, value)
                            }
                          >
                            <SelectTrigger className="h-8 w-[110px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USER">User</SelectItem>
                              <SelectItem value="AUTHOR">Author</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {convertDateString(item.createdAt.toString())}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={`/profile?id=${item.id}`}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>View Profile</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
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
                              </TooltipTrigger>
                              <TooltipContent>Delete User</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
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
  );
}

// Update the UsersPage component with a more modern design for the access denied state
export default function UsersPage() {
  const { isLoading, user, hasRequiredRole } = useAuth({
    requiredRole: "ADMIN",
  });

  // Display a loading state while authentication is in progress
  if (isLoading) {
    return <TableSkeleton rowCount={20} />;
  }

  // Although the hook should redirect unauthorized users,
  // include an extra safeguard fallback
  if (!user || !hasRequiredRole) {
    return <AccessDenied />;
  }

  return (
    <Suspense fallback={<TableSkeleton rowCount={10} />}>
      <UsersList />
    </Suspense>
  );
}
