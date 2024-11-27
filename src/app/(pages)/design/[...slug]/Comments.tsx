"use client";

import { timeAgo } from "@/components/helper/date/dateago";
import { DesignType } from "@/components/interface/DesignType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MessageCircle, Send, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  comment: z
    .string()
    .min(3, {
      message: "Comment must be at least 3 characters.",
    })
    .max(500, {
      message: "Comment must not be longer than 500 characters.",
    }),
});

export function Comments({
  data,
  refetch,
}: {
  data: DesignType;
  refetch: () => void;
}) {
  const { status, data: session } = useSession();
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(CommentData: z.infer<typeof FormSchema>) {
    if (!session?.user?.id) {
      toast.error("You must be logged in to comment.");
      return;
    }

    const payload = {
      comment: CommentData.comment,
      userId: session.user.id,
      designId: data.id,
    };

    const loadingToast = toast.loading("Submitting your comment...");

    axios
      .post("/api/design/single-design/comments", payload)
      .then(() => {
        refetch();
        toast.update(loadingToast, {
          render: "Comment submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        form.reset();
      })
      .catch((error) => {
        toast.update(loadingToast, {
          render:
            error.response?.data?.message ||
            "Failed to submit your comment. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.error(
          "Failed to submit comment:",
          error.response?.data || error.message,
        );
      });
  }

  function handleDelete(commentId: string) {
    const loadingToast = toast.loading("Deleting comment...");

    axios
      .delete(`/api/design/single-design/comments?commentId=${commentId}`)
      .then(() => {
        refetch(); // Refresh the data
        toast.update(loadingToast, {
          render: "Comment deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000, // Dismiss the toast automatically
        });
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to delete comment. Please try again.";
        toast.update(loadingToast, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.error(
          "Error deleting comment:",
          error.response?.data || error.message,
        );
      })
      .finally(() => {
        setCommentToDelete(null); // Ensure cleanup
      });
  }

  return (
    <Card className="mx-auto w-full max-w-3xl shadow-lg" id="comment">
      <CardHeader className="flex flex-row items-center justify-between rounded-t-lg bg-primary/5">
        <CardTitle className="text-2xl font-bold text-primary">
          Comments
        </CardTitle>
        <div className="flex items-center space-x-2 rounded-full bg-background px-3 py-1 text-muted-foreground">
          <MessageCircle size={18} />
          <span className="font-medium">{data.commentsCount}</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-6 p-6">
            {data.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start space-x-4 rounded-lg bg-secondary/10 p-4 transition-all hover:bg-secondary/20"
              >
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage
                    src={comment.user.image}
                    alt={comment.user.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {comment.user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/profile?id=${comment.userId}`}
                      className="text-sm font-medium text-primary"
                    >
                      {comment.user.name}
                    </Link>
                    <p className="rounded-full bg-secondary/20 px-2 py-1 text-xs text-muted-foreground">
                      {timeAgo(comment.createdAt)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {comment.content}
                  </p>
                </div>
                {(session?.user?.role === "ADMIN" ||
                  comment.userId === session?.user?.id) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => setCommentToDelete(comment.id)}
                        aria-label="Delete comment"
                      >
                        <Trash size={18} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this comment? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setCommentToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(comment.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="rounded-b-lg bg-secondary/5">
        {status === "authenticated" ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-start space-x-2 pt-4"
            >
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage
                  src={session?.user?.image || undefined}
                  alt={session?.user?.name || "User Avatar"}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {session?.user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        placeholder="Add a comment..."
                        className="min-h-[80px] resize-none bg-background focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
                aria-label="Post comment"
              >
                <Send size={18} className="text-primary-foreground" />
              </Button>
            </form>
          </Form>
        ) : (
          <Link href="/signin" className="flex w-full justify-center pt-4">
            <Button
              variant="default"
              className="bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              aria-label="Login to comment"
            >
              Login to Comment
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
