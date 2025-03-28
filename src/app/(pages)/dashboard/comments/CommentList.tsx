"use client";

import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteComment } from "@/services/admin";
import { Comment } from "@/utils/Interface";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, ExternalLink, Trash, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
}

/**
 * CommentList Component
 *
 * Displays a table of comments with actions to view and delete
 * Uses TanStack Query for data management
 */
export function CommentList({
  comments,
  isLoading,
  isError,
}: CommentListProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);

  const deleteMutation = useDeleteComment();

  // Handle delete button click
  const handleDeleteClick = (comment: Comment) => {
    setCommentToDelete(comment);
    setIsDeleteDialogOpen(true);
  };

  // Handle comment deletion
  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    // Close the dialog immediately
    setIsDeleteDialogOpen(false);

    // Trigger the delete mutation
    deleteMutation.mutate(
      { id: commentToDelete.id },
      {
        onSettled: () => {
          // Reset the commentToDelete state regardless of success/failure
          setCommentToDelete(null);
        },
      },
    );
  };

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was an error loading the comments. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Author</TableHead>
              <TableHead className="min-w-[300px]">Comment</TableHead>
              <TableHead className="min-w-[200px]">Design</TableHead>
              <TableHead className="w-[150px]">Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="mt-2 h-4 w-2/3" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-9 w-9" />
                    </TableCell>
                  </TableRow>
                ))
            ) : comments.length === 0 ? (
              // No results
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No comments found.
                </TableCell>
              </TableRow>
            ) : (
              // Comment list
              comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={comment.user.image}
                          alt={comment.user.name}
                        />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{comment.user.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="line-clamp-2">{comment.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Link
                        href={createSlug({
                          id: comment.design.id,
                          name: comment.design.name,
                        })}
                        className="line-clamp-2 hover:underline"
                      >
                        {comment.design.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Link
                        href={`${createSlug({
                          id: comment.design.id,
                          name: comment.design.name,
                        })}`}
                      >
                        <Button size="icon" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View comment</span>
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteClick(comment)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete comment</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this comment. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              Delete Comment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
