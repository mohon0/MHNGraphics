import type { Metadata } from "next";
import Chat from "./chat";

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
      <Chat conversationId={conversationId} />
    </div>
  );
}
