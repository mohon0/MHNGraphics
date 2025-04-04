import type { Metadata } from "next";
import ConversationList from "./conversation-list";
import EmptyState from "./empty-state";

export const metadata: Metadata = {
  title: "Conversations",
  description: "Your conversations with other users",
};

export default async function ConversationsPage() {
  return (
    <div className="h-full">
      <div className="hidden h-full lg:block">
        <EmptyState />
      </div>
      <ConversationList />
    </div>
  );
}
