"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useConversation from "@/hooks/use-conversation";
import { useUserConversationsSocket } from "@/hooks/use-conversation-socket";
import type { FullConversationType } from "@/types";
import type { User } from "@prisma/client";
import { MessageSquare, Plus, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConversationBox from "./conversation-box";
import NewConversationDialog from "./new-conversation-dialog";

interface ConversationListProps {
  initialItems?: FullConversationType[];
  currentUser?: User | null;
}

export default function ConversationList({
  initialItems = [],
  currentUser,
}: ConversationListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredItems, setFilteredItems] = useState<FullConversationType[]>(
    [],
  );

  const router = useRouter();
  const { conversationId } = useConversation();
  const { conversations } = useUserConversationsSocket(
    currentUser?.id || "",
    initialItems,
  );

  useEffect(() => {
    let result = conversations;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (item) =>
          (item.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          item.users.some((user) =>
            (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Filter by tab
    if (activeTab === "direct") {
      result = result.filter((item) => !item.isGroup);
    } else if (activeTab === "groups") {
      result = result.filter((item) => item.isGroup);
    }

    setFilteredItems(result);
  }, [conversations, searchTerm, activeTab]);

  return (
    <>
      <NewConversationDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside className="fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-200 pb-20 lg:block lg:w-80 lg:pb-0">
        <div className="px-5 pt-4">
          <div className="mb-4 flex justify-between">
            <div className="text-2xl font-bold text-primary">Messages</div>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="rounded-full pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="all"
            className="mb-4"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="direct" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Direct</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Groups</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[calc(100vh-200px)]">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))
            ) : (
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  {searchTerm
                    ? "No conversations found"
                    : "No conversations yet. Start a new one!"}
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}
