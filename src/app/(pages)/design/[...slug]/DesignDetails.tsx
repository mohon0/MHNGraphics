"use client";

import { convertToReadableDate } from "@/components/helper/date/convertDateString";
import { DesignType } from "@/components/interface/DesignType";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageDimensions } from "@/utils/imageDimensions";
import axios from "axios";
import { CircleCheckBig, Download, MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { SiCanva } from "react-icons/si";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadMenuItem from "./DownloadMenuItem";
import Share from "./Share";

interface DesignDetailsProps {
  data: DesignType;
  imageDimensions: ImageDimensions | null;
  params: { slug: string[] };
  refetch: () => void;
}

interface LikeButtonProps {
  likes: { userId: string }[];
  session: any;
}

const LikeButton = ({ likes, session }: LikeButtonProps) => {
  const userId = session?.user?.id;

  // Check if the current user has already liked this design
  const isLiked = userId ? likes.some((like) => like.userId === userId) : false;

  return (
    <>
      {" "}
      {isLiked ? (
        <HiHeart size={24} color="red" />
      ) : (
        <HiOutlineHeart size={24} />
      )}
    </>
  );
};

export function DesignDetails({
  data,
  imageDimensions,
  params,
  refetch,
}: DesignDetailsProps) {
  const { status, data: session } = useSession();

  async function handleLike({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    if (status === "unauthenticated") {
      toast.error("You must be logged in to like this design");
      return;
    }

    // Display loading toast
    const toastId = toast.loading("Processing...");

    try {
      const response = await axios.post("/api/design/single-design/like", {
        postId,
        userId,
      });

      if (response.status === 200 || response.status === 201) {
        const { message, status: likeStatus } = response.data;

        // Handle success
        if (likeStatus === "success") {
          refetch();
          toast.update(toastId, {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(toastId, {
            render: "Error updating like",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        toast.update(toastId, {
          render: "Error updating like",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      // Handle failure
      toast.update(toastId, {
        render: "Error updating like",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  return (
    <>
      <p className="inline-flex items-center gap-2 text-wrap text-sm">
        <CircleCheckBig className="h-4 w-4" />
        Free for use under the MHN{" "}
        <Link className="text-primary underline" href="/content-license">
          Content License
        </Link>
      </p>
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button className="w-full sm:w-auto">
            <SiCanva className="mr-2" />
            <span>Edit Image</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <p className="p-2 text-sm text-muted-foreground">File Size</p>
              {imageDimensions && (
                <>
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={500}
                    label="Small"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={1000}
                    label="Medium"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={1500}
                    label="Large"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    label="Original"
                  />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              if (session?.user) {
                handleLike({ postId: data.id, userId: session.user.id });
              } else {
                toast.error("You must be logged in to like this design");
              }
            }}
          >
            <LikeButton likes={data.likes} session={session} />
            {data.likeCount}
          </Button>

          <Link href="#comment">
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-5 w-5" /> {data.commentsCount}
            </Button>
          </Link>
          <Share params={params} />
        </div>
      </div>
      <div className="w-full pt-4">
        <div className="space-y-2">
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Love:</span>{" "}
            {data.likeCount}
          </p>
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Comment:</span>{" "}
            {data.commentsCount}
          </p>
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Resolution:</span>{" "}
            {imageDimensions
              ? `${imageDimensions.width} x ${imageDimensions.height}`
              : "Loading..."}
          </p>
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Media type:</span> JPG
          </p>
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Published date:</span>
            {convertToReadableDate(data.createdAt)}
          </p>
        </div>
      </div>
    </>
  );
}

export function DesignDetailsSkeleton() {
  return (
    <>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-8 w-full" />
      <div>
        <div className="flex justify-between gap-5">
          <Skeleton className="h-10 w-full flex-grow" />
          <Skeleton className="h-10 w-full flex-grow" />
        </div>
        <div className="mt-6 flex w-full gap-4">
          <Skeleton className="h-10 w-full flex-grow" />
          <Skeleton className="h-10 w-full flex-grow" />
          <Skeleton className="h-10 w-full flex-grow" />
        </div>
      </div>
      <div className="w-full pt-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="mt-2 h-4 w-1/3" />
        <div className="mt-4">
          <Skeleton className="h-4 w-1/4" />
          <div className="mt-2 space-y-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    </>
  );
}
