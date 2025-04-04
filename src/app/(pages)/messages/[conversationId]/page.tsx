import getConversationById from "@/actions/get-conversation-by-id";
import getMessages from "@/actions/get-messages";
import { notFound } from "next/navigation";
import ConversationHeader from "./conversation-header";
import MessageInput from "./message-input";
import MessageList from "./message-list";

interface IParams {
  conversationId: string;
}

interface Props {
  params: Promise<IParams>; // Type params as a Promise
}

export default async function ConversationPage({ params }: Props) {
  const resolvedParams = await params; // Await the params Promise
  const { conversationId } = resolvedParams; // Destructure after awaiting
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return notFound();
  }

  return (
    <div className="h-full">
      <div className="flex h-full flex-col">
        <ConversationHeader conversation={conversation} />
        <MessageList
          initialMessages={messages}
          conversationId={conversation.id}
        />
        <MessageInput conversationId={conversation.id} />
      </div>
    </div>
  );
}
