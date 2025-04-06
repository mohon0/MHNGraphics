import type { Metadata } from "next";
import { MessageInput } from "./message-input";
import { MessageList } from "./message-list";

interface MessagePageProps {
  params: Promise<{
    conversationId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Conversation",
  description: "Chat with a user",
};

export default async function MessagePage({ params }: MessagePageProps) {
  const { conversationId } = await params;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">Conversation</h1>
      </div>
      <MessageList conversationId={conversationId} />
      <MessageInput conversationId={conversationId} />
    </div>
  );
}
