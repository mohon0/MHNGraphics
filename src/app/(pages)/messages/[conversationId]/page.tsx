import type { Metadata } from "next";
import MessageList from "./message-list";

interface MessagePageProps {
  params: {
    conversationId: string;
  };
}

export const metadata: Metadata = {
  title: "Conversation",
  description: "Chat with a user",
};

export default function MessagePage({ params }: MessagePageProps) {
  const { conversationId } = params;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <MessageList conversationId={conversationId} />
    </div>
  );
}
