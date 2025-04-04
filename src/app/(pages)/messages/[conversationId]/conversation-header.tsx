"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useOtherUser from "@/hooks/use-other-user";
import type { Conversation, User } from "@prisma/client";
import {
  ArrowLeft,
  Info,
  MoreHorizontal,
  Phone,
  Trash,
  UserPlus,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface ConversationHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
}) => {
  const otherUser = useOtherUser(conversation);
  const router = useRouter();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active now";
  }, [conversation]);

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur-sm transition-all sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => router.push("/conversations")}
          variant="ghost"
          size="icon"
          className="block rounded-full lg:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src={otherUser?.image || "/placeholder.svg"} />
            <AvatarFallback>{otherUser?.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>

          {conversation.isGroup && (
            <Badge
              variant="outline"
              className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary p-0 text-[10px] text-primary-foreground"
            >
              {conversation.users.length}
            </Badge>
          )}
        </div>

        <div className="flex flex-col">
          <div className="font-semibold">
            {conversation.name || otherUser?.name}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </div>
            <div className="text-xs font-light text-muted-foreground">
              {statusText}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voice call</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Video call</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setShowUserInfo(!showUserInfo)}
              >
                <Info className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Conversation info</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {conversation.isGroup && (
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Add members
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              View profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ConversationHeader;
