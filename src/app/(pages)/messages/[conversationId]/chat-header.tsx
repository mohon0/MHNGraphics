"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePresence } from "@/hooks/use-presence";
import { ArrowLeft, MoreHorizontal, Phone, Search, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LastSeen } from "./last-seen";

interface ChatHeaderProps {
  user?: {
    id: string;
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
  isLoading?: boolean;
}

export function ChatHeader({ user, isLoading = false }: ChatHeaderProps) {
  const router = useRouter();
  const { getUserStatus } = usePresence();
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const isMobile = useIsMobile();

  // Fetch and subscribe to user's online status
  useEffect(() => {
    if (!user?.id) return;

    // Initial fetch
    const fetchStatus = async () => {
      const status = await getUserStatus(user.id);
      if (status) {
        setIsOnline(status.isOnline);
        setLastSeen(status.lastSeen || null);
      }
    };

    fetchStatus();

    // Set up interval to refresh status
    const intervalId = setInterval(fetchStatus, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [user?.id, getUserStatus]);

  if (isLoading) {
    return (
      <div className="flex h-16 items-center justify-between border-b px-4 shadow-xs">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-1 h-4 w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-16 items-center justify-between border-b px-4 shadow-xs">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/messages")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm text-muted-foreground">No user selected</div>
      </div>
    );
  }

  return (
    <div className="flex h-16 items-center justify-between border-b px-4 shadow-xs">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/messages")}
          className="md:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to messages</span>
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user.name}</div>
          <LastSeen isOnline={isOnline} lastSeen={lastSeen} />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="hidden rounded-full sm:flex"
        >
          <Phone className="h-5 w-5" />
          <span className="sr-only">Call</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden rounded-full sm:flex"
        >
          <Video className="h-5 w-5" />
          <span className="sr-only">Video</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
            {isMobile && (
              <>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Video className="mr-2 h-4 w-4" />
                  Video call
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Block user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
