import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted p-6">
          <MessageSquare className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Your Messages</h2>
        <p className="mb-4 text-muted-foreground">
          Select a conversation from the sidebar to view your messages or start
          a new conversation.
        </p>
      </div>
    </div>
  );
}
