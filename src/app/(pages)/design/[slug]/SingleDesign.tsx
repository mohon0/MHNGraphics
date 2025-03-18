"use client";

import { getImageDimensions } from "@/components/helper/image/GetImageDimensions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSingleDesign } from "@/services/design";
import type { ImageDimensions } from "@/utils/imageDimensions";
import type { DesignType } from "@/utils/Interface";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Download,
  Eye,
  Heart,
  Info,
  MessageSquare,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { use, useEffect, useRef, useState } from "react";
import { Author, AuthorSkeleton, Tags, TagsSkeleton } from "./AuthorAndTags";
import { Comments } from "./Comments";
import { DesignDetails, DesignDetailsSkeleton } from "./DesignDetails";
import RelatedDesign from "./RelatedDesign";

type Params = Promise<{ slug: string }>;

export default function SingleDesign(props: { params: Params }) {
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const params = use(props.params);
  const slug = params.slug;
  const id = slug.split("_")[1];

  const { isLoading, data, isError, refetch } = useSingleDesign({
    id,
  });

  useEffect(() => {
    if (data?.image) {
      getImageDimensions(data.image)
        .then((dimensions) => setImageDimensions(dimensions))
        .catch((error) =>
          console.error("Failed to fetch image dimensions:", error),
        );
    }

    // Simulate view count for demo purposes
    setViewCount(Math.floor(Math.random() * 1000) + 100);

    // Check if user has liked this design
    if (data?.likes) {
      // This would typically check against the current user's ID
      // For demo purposes, we'll just set a random initial state
      setIsLiked(Math.random() > 0.7);
    }
  }, [data?.image, data?.likes]);

  useEffect(() => {
    // Reset zoom and position when fullscreen mode changes
    if (!isFullscreen) {
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
      setControlsVisible(true);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    // Handle escape key to exit fullscreen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    refetch();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setControlsVisible(true);
    resetIdleTimer();
  };

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    setControlsVisible(true);

    idleTimerRef.current = setTimeout(() => {
      if (isFullscreen && !isDragging) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  const handleMouseMove = () => {
    if (isFullscreen) {
      resetIdleTimer();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleImageDrag = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      });
    }
  };

  const handleImageMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setImagePosition({ x: newX, y: newY });
    }
  };

  const handleImageRelease = () => {
    setIsDragging(false);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically call an API to update the like status
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data?.name || "Amazing design",
          text: "Check out this awesome design!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      // You would typically show a toast notification here
      alert("Link copied to clipboard!");
    }
  };

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="w-full max-w-md overflow-hidden border-none bg-white/90 p-8 shadow-2xl backdrop-blur-md dark:bg-gray-900/90">
            <div className="flex flex-col items-center space-y-8">
              <div className="rounded-full bg-red-50 p-5 dark:bg-red-900/20">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">Error Loading Design</h2>
                <p className="mt-2 text-muted-foreground">
                  We couldn&apos;t load the design. Please try again.
                </p>
              </div>
              <Button
                onClick={handleRetry}
                disabled={retryCount >= 3}
                className="w-full"
                size="lg"
                variant="destructive"
              >
                {retryCount >= 3 ? "Too many attempts" : "Retry"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const { image, name: designName, description }: DesignType = data || {};

  return (
    <>
      {/* Fullscreen Image View */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            onClick={() => setIsFullscreen(false)}
            onMouseMove={handleMouseMove}
          >
            <div
              className="relative h-full w-full"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleImageDrag}
              onMouseMove={handleImageMove}
              onMouseUp={handleImageRelease}
              onMouseLeave={handleImageRelease}
            >
              {data?.image && (
                <div
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  style={{
                    cursor:
                      zoomLevel > 1
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
                      transition: isDragging
                        ? "none"
                        : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <Image
                      src={data.image || "/placeholder.svg"}
                      alt={data.name || "Design image"}
                      width={1500}
                      height={1500}
                      className="max-h-screen object-contain"
                      onContextMenu={(e) => e.preventDefault()}
                      priority
                    />
                  </motion.div>
                </div>
              )}

              {/* Fullscreen Controls */}
              <AnimatePresence>
                {controlsVisible && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform items-center gap-6 rounded-full bg-black/40 px-8 py-4 backdrop-blur-md"
                    >
                      <button
                        onClick={handleZoomOut}
                        className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                        disabled={zoomLevel <= 0.5}
                      >
                        <ZoomOut className="h-6 w-6" />
                      </button>
                      <span className="min-w-[60px] text-center text-sm font-medium text-white">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <button
                        onClick={handleZoomIn}
                        className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                        disabled={zoomLevel >= 3}
                      >
                        <ZoomIn className="h-6 w-6" />
                      </button>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setIsFullscreen(false)}
                      className="absolute right-8 top-8 rounded-full bg-black/40 p-3 text-white/90 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close fullscreen</span>
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setShowInfo(!showInfo)}
                      className="absolute left-8 top-8 rounded-full bg-black/40 p-3 text-white/90 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Info className="h-6 w-6" />
                      <span className="sr-only">Image information</span>
                    </motion.button>

                    <AnimatePresence>
                      {showInfo && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-8 top-24 max-w-xs rounded-lg bg-black/40 p-4 text-white backdrop-blur-md"
                        >
                          <h3 className="mb-2 text-lg font-semibold">
                            {data?.name}
                          </h3>
                          <div className="space-y-1 text-sm">
                            <p>By: {data?.author?.name}</p>
                            {imageDimensions && (
                              <p>
                                Dimensions: {imageDimensions.width} ×{" "}
                                {imageDimensions.height}
                              </p>
                            )}
                            <p>Likes: {data?.likeCount}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
        {/* Main content */}
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left column - Main image and details */}
            <div className="lg:col-span-8">
              {/* Design title for mobile */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 lg:hidden"
              >
                <h1 className="text-pretty text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
                  {isLoading ? <Skeleton className="h-10 w-3/4" /> : designName}
                </h1>
                <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span>{viewCount} views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isLiked && "fill-rose-500 text-rose-500",
                      )}
                    />
                    <span>{data?.likeCount || 0} likes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span>{data?.commentsCount || 0} comments</span>
                  </div>
                </div>
              </motion.div>

              {/* Design image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl"
                ref={imageContainerRef}
              >
                {isLoading ? (
                  <Skeleton className="aspect-[4/3] w-full rounded-2xl md:aspect-[16/9]" />
                ) : (
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">
                    <div className="relative aspect-auto md:h-[38rem]">
                      <Image
                        onContextMenu={(e) => e.preventDefault()}
                        src={image || "/placeholder.svg"}
                        alt={designName || "Design image"}
                        className="h-full w-full object-contain"
                        height={1000}
                        width={1000}
                        priority
                      />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10"
              >
                <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  {isLoading ? (
                    <AuthorSkeleton />
                  ) : (
                    <Author author={data.author} authorId={data.authorId} />
                  )}
                </div>
              </motion.div>

              {/* Description */}
              {isLoading ? (
                <Skeleton className="mt-8 h-24 w-full rounded-xl" />
              ) : description && description.length > 11 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="mt-8 rounded-xl border border-zinc-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/80">
                    <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
                      About this design
                    </h2>
                    <div
                      className="prose max-w-none dark:prose-invert prose-headings:text-zinc-900 prose-p:text-zinc-700 dark:prose-headings:text-white dark:prose-p:text-zinc-300"
                      dangerouslySetInnerHTML={{ __html: description || "" }}
                    />
                  </div>
                </motion.div>
              ) : null}

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  {isLoading ? <TagsSkeleton /> : <Tags tags={data.tags} />}
                </div>
              </motion.div>

              {/* Comments block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
                id="comments"
              >
                {isLoading ? (
                  <Skeleton className="h-48 w-full rounded-xl" />
                ) : (
                  <Comments data={data} refetch={refetch} />
                )}
              </motion.div>
            </div>

            {/* Right column - Sidebar */}
            <div className="lg:col-span-4">
              {/* Design title for desktop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 hidden lg:block"
              >
                <h1 className="text-pretty text-4xl font-bold text-zinc-900 dark:text-white">
                  {isLoading ? <Skeleton className="h-12 w-3/4" /> : designName}
                </h1>
                <div className="mt-4 flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{data?.viewCount} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isLiked && "fill-rose-500 text-rose-500",
                      )}
                    />
                    <span>{data?.likeCount || 0} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{data?.commentsCount || 0} comments</span>
                  </div>
                </div>
              </motion.div>

              {/* Design Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="sticky top-20 rounded-xl border border-zinc-200/60 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  <div className="space-y-8 p-6">
                    {isLoading ? (
                      <DesignDetailsSkeleton />
                    ) : (
                      <DesignDetails
                        data={data}
                        imageDimensions={imageDimensions}
                        params={params}
                        refetch={refetch}
                        isLiked={isLiked}
                        onLikeToggle={toggleLike}
                        toggleFullScreen={toggleFullscreen}
                      />
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Download Options */}
              {!isLoading && imageDimensions && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="mt-8 rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/80">
                    <h3 className="mb-6 text-xl font-medium text-zinc-900 dark:text-white">
                      Download Options
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          Small
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                          asChild
                        >
                          <a href={data.image} download>
                            <Download className="h-4 w-4" />
                            <span>500px</span>
                          </a>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          Medium
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                          asChild
                        >
                          <a href={data.image} download>
                            <Download className="h-4 w-4" />
                            <span>1000px</span>
                          </a>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          Large
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                          asChild
                        >
                          <a href={data.image} download>
                            <Download className="h-4 w-4" />
                            <span>1500px</span>
                          </a>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          Original
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                          asChild
                        >
                          <a href={data.image} download>
                            <Download className="h-4 w-4" />
                            <span>{imageDimensions.width}px</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Related Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16"
          >
            {isLoading ? (
              <Skeleton className="h-64 w-full rounded-xl" />
            ) : (
              <RelatedDesign postId={data.id} />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
