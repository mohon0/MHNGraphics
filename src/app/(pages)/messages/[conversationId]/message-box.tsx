"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { FullMessageType } from "@/types";
import { format } from "date-fns";
import { Copy, MoreHorizontal, Reply, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

export default function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isOwn = session.data?.user?.email === data?.sender?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  // Function to copy message text to clipboard
  const copyToClipboard = () => {
    if (data.body) {
      navigator.clipboard.writeText(data.body);
      toast("Message copied to clipboard");
    }
  };

  return (
    <div
      className={cn(
        "animate-fadeIn group flex gap-3 py-2 transition-opacity",
        isOwn ? "justify-end" : "justify-start",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isOwn && (
        <div className="flex-shrink-0 pt-1">
          <Avatar className="h-8 w-8 border border-primary/10">
            <AvatarImage src={data.sender.image || "/placeholder.svg"} />
            <AvatarFallback>
              {data.sender.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1",
          isOwn ? "items-end" : "items-start",
        )}
      >
        {!isOwn && (
          <div className="text-xs font-medium text-muted-foreground">
            {data.sender.name}
          </div>
        )}

        <div className="group relative">
          <div
            className={cn(
              "overflow-hidden rounded-2xl shadow-sm transition-all",
              isOwn
                ? "bg-primary text-primary-foreground"
                : "bg-muted/70 text-foreground",
              data.image ? "p-0" : "px-4 py-2",
            )}
          >
            {data.image ? (
              <div
                onClick={() => setImageModalOpen(true)}
                className="cursor-pointer overflow-hidden rounded-2xl transition-transform hover:scale-[1.02]"
              >
                <Image
                  alt="Image"
                  height={288}
                  width={288}
                  src={data.image || "/placeholder.svg"}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="text-sm">{data.body}</div>
            )}
          </div>

          <div
            className={cn(
              "absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 opacity-0 transition-opacity",
              isHovered && "opacity-100",
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-7 w-7 rounded-full shadow-md"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isOwn ? "end" : "start"}
                className="w-40"
              >
                <DropdownMenuItem onClick={() => {}}>
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </DropdownMenuItem>
                {data.body && (
                  <DropdownMenuItem onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy text
                  </DropdownMenuItem>
                )}
                {isOwn && (
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="text-[10px] text-muted-foreground">
            {format(new Date(data.createdAt), "p")}
          </div>

          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-[10px] font-light text-primary">{`• Seen by ${seenList}`}</div>
          )}
        </div>
      </div>

      {isOwn && (
        <div className="flex-shrink-0 pt-1">
          <Avatar className="h-8 w-8 border border-primary/10">
            <AvatarImage src={data.sender.image || "/placeholder.svg"} />
            <AvatarFallback>
              {data.sender.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}
