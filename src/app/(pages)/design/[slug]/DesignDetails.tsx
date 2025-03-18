"use client";

import { convertToReadableDate } from "@/components/helper/date/convertDateString";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ImageDimensions } from "@/utils/imageDimensions";
import type { DesignType } from "@/utils/Interface";
import axios from "axios";
import {
  CircleCheckBig,
  Download,
  Heart,
  Maximize2,
  MessageSquare,
} from "lucide-react";
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
  params: { slug: string };
  refetch: () => void;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  toggleFullScreen?: () => void;
}

interface LikeButtonProps {
  likes: { userId: string }[];
  session: any;
  isLiked?: boolean;
}

const LikeButton = ({ likes, session, isLiked }: LikeButtonProps) => {
  const userId = session?.user?.id;

  // If isLiked is provided, use it, otherwise check the likes array
  const hasLiked =
    isLiked !== undefined
      ? isLiked
      : userId
        ? likes.some((like) => like.userId === userId)
        : false;

  return (
    <>
      {hasLiked ? (
        <HiHeart size={24} className="text-rose-500" />
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
  isLiked,
  onLikeToggle,
  toggleFullScreen,
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

    // If we have an external handler, use it
    if (onLikeToggle) {
      onLikeToggle();
      return;
    }

    const toastId = toast.loading("Processing...");

    try {
      const response = await axios.post("/api/design/single-design/like", {
        postId,
        userId,
      });

      if (response.status === 200 || response.status === 201) {
        const { message, status: likeStatus } = response.data;

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
      <div className="mb-6 rounded-lg border border-emerald-200/50 bg-emerald-50/50 p-4 backdrop-blur-sm dark:border-emerald-900/30 dark:bg-emerald-900/10">
        <div className="flex flex-wrap items-center gap-2 text-wrap text-sm text-emerald-800 dark:text-emerald-300">
          <CircleCheckBig className="h-5 w-5 text-emerald-500" />
          <span>Free for use under the MHN </span>
          <Link
            className="font-medium text-emerald-700 underline hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            href="/content-license"
          >
            Content License
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button className="w-full bg-zinc-900 text-white shadow-md transition-transform hover:scale-105 hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:w-auto">
            <SiCanva className="mr-2" />
            <span>Edit in Canva</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-zinc-300 bg-white text-zinc-800 shadow-md transition-transform hover:scale-105 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <p className="p-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Select Size
              </p>
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
                    targetHeight={imageDimensions.height}
                    label="Original"
                  />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex h-16 items-center justify-center gap-2 border-zinc-300/80 bg-white/50 transition-all hover:border-zinc-400 hover:bg-white dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
            onClick={toggleFullScreen}
          >
            <Maximize2 className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
            <span>View Full</span>
          </Button>
          <Share params={params} />
          <Button
            variant="outline"
            className={cn(
              "flex h-16 items-center justify-center gap-2 border-zinc-300/80 bg-white/50 transition-all hover:border-zinc-400 hover:bg-white dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800",
              isLiked &&
                "border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100 dark:border-rose-800/50 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/30",
            )}
          >
            <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
            <span>{isLiked ? "Liked" : "Like"}</span>
          </Button>
          <Link href="#comments">
            <Button
              variant="outline"
              className="flex h-16 w-full items-center justify-center gap-2 border-zinc-300/80 bg-white/50 transition-all hover:border-zinc-400 hover:bg-white dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
            >
              <MessageSquare className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              <span>Comments</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-4 rounded-lg border border-zinc-200/60 bg-zinc-50/50 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/50">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Design Information
        </h3>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="text-zinc-500 dark:text-zinc-400">Resolution</div>
          <div className="font-medium text-zinc-900 dark:text-white">
            {imageDimensions
              ? `${imageDimensions.width} × ${imageDimensions.height}`
              : "Loading..."}
          </div>

          <div className="text-zinc-500 dark:text-zinc-400">Media type</div>
          <div className="font-medium text-zinc-900 dark:text-white">JPG</div>

          <div className="text-zinc-500 dark:text-zinc-400">Published</div>
          <div className="font-medium text-zinc-900 dark:text-white">
            {convertToReadableDate(data.createdAt)}
          </div>

          <div className="text-zinc-500 dark:text-zinc-400">Likes</div>
          <div className="font-medium text-zinc-900 dark:text-white">
            {data.likeCount}
          </div>

          <div className="text-zinc-500 dark:text-zinc-400">Comments</div>
          <div className="font-medium text-zinc-900 dark:text-white">
            {data.commentsCount}
          </div>
        </div>
      </div>
    </>
  );
}

export function DesignDetailsSkeleton() {
  return (
    <>
      <Skeleton className="mb-6 h-20 w-full rounded-lg" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Skeleton className="h-10 w-full sm:w-40" />
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>

      <Skeleton className="mt-8 h-48 w-full rounded-lg" />
    </>
  );
}
