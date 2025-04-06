"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConversations } from "@/hooks/use-conversation";
import axios from "axios";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function StartConversation() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { createConversation, isCreating } = useConversations();

  const handleSearch = async () => {
    if (!search.trim()) return;

    setIsSearching(true);
    try {
      const response = await axios.get(
        `/api/users/search?query=${encodeURIComponent(search)}`,
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleStartConversation = (userId: string) => {
    createConversation(userId, {
      onSuccess: (conversation) => {
        router.push(`/messages/${conversation.id}`);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={isSearching || !search.trim()}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {isSearching ? (
        <div className="py-4 text-center">
          <p className="text-muted-foreground">Searching...</p>
        </div>
      ) : users.length > 0 ? (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.image || ""} alt={user.name || ""} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                onClick={() => handleStartConversation(user.id)}
                disabled={isCreating}
              >
                Message
              </Button>
            </div>
          ))}
        </div>
      ) : search ? (
        <div className="py-4 text-center">
          <p className="text-muted-foreground">No users found</p>
        </div>
      ) : null}
    </div>
  );
}
