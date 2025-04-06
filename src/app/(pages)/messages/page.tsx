import { ConversationList } from "./conversation-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
  description: "View your conversations",
};

export default function MessagesPage() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>
      <ConversationList />
    </div>
  );
}
