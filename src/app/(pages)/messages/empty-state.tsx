"use client";

import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showNewChatButton?: boolean;
}

export function EmptyState({
  title = "No conversation selected",
  description = "Choose a conversation from the sidebar or start a new one.",
  showNewChatButton = true,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <MessageSquarePlus className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-muted-foreground">{description}</p>
      {showNewChatButton && (
        <Button className="mt-6" onClick={() => router.push("/messages/new")}>
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Start a new chat
        </Button>
      )}
    </div>
  );
}
