"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversations } from "@/hooks/use-conversation";
import { cn } from "@/lib/utils";
import { ArrowLeft, MessageSquarePlus, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ConversationItem } from "./conversation-item";
import { EmptyState } from "./empty-state";

export default function Sidebar({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const params = useParams();

  const currentConversationId = params?.conversationId as string;
  const { conversations, isLoading } = useConversations();

  const handleConversationClick = (conversationId: string) => {
    router.push(`/messages/${conversationId}`);
  };

  const filteredConversations = searchQuery
    ? conversations.filter(
        (conversation: any) =>
          conversation.otherUser.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          conversation.otherUser.email
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          conversation.lastMessage?.content
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : conversations;

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="border-b p-4">
        <div className="mb-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to home</span>
          </Button>
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations"
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={() => router.push("/messages/new")}
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="space-y-2 p-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : filteredConversations.length === 0 ? (
          searchQuery ? (
            <div className="p-4 text-center text-muted-foreground">
              No conversations match your search
            </div>
          ) : (
            <EmptyState
              title="No conversations yet"
              description="Start a new conversation to chat with someone."
            />
          )
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation: any) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={currentConversationId === conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
