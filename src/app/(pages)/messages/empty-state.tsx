"use client";

import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const EmptyState = () => {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-muted/20 to-white px-4 py-10 text-center sm:px-6 lg:px-8">
      <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-primary/10">
        <MessageSquarePlus className="h-12 w-12 text-primary" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-foreground">
        Your messages
      </h3>
      <p className="mt-2 max-w-md text-muted-foreground">
        Select a conversation from the sidebar or start a new one to begin
        messaging with your contacts.
      </p>
      <div className="mt-6">
        <Button
          variant="outline"
          className="rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          onClick={() => router.push("/conversations")}
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Start a new conversation
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
