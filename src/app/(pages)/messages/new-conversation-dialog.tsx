"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/use-debounce";
import { useUserList } from "@/services/admin";
import type { User } from "@prisma/client";
import axios from "axios";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NewConversationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewConversationDialog: React.FC<NewConversationDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { isLoading, data, isError } = useUserList({
    page: 1,
    searchQuery: debouncedSearchTerm,
  });

  const toggleUserSelection = (user: User) => {
    setSelectedUsers((current) => {
      if (current.find((selectedUser) => selectedUser.id === user.id)) {
        return current.filter((selectedUser) => selectedUser.id !== user.id);
      } else {
        return [...current, user];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedUsers.length === 0) return;

    try {
      const response = await axios.post("/api/conversations", {
        userIds: selectedUsers.map((user) => user.id),
        isGroup,
        name: isGroup ? groupName : undefined,
      });

      router.push(`/conversations/${response.data.id}`);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
          <DialogDescription>
            Start a conversation with other users
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="isGroup"
              checked={isGroup}
              onCheckedChange={(checked) => setIsGroup(!!checked)}
            />
            <label htmlFor="isGroup" className="text-sm font-medium">
              Create a group chat
            </label>
          </div>

          {isGroup && (
            <Input
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              disabled={isLoading}
            />
          )}

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {selectedUsers.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium">Selected users:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs"
                    onClick={() => toggleUserSelection(user)}
                  >
                    {user.name}
                    <span className="cursor-pointer">×</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ScrollArea className="h-60">
            {data.user?.map((user: User) => (
              <div
                key={user.id}
                className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent"
                onClick={() => toggleUserSelection(user)}
              >
                <Avatar>
                  <AvatarImage src={user.image || "/placeholder.svg"} />
                  <AvatarFallback>{user.name?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Checkbox
                  checked={
                    !!selectedUsers.find(
                      (selectedUser) => selectedUser.id === user.id,
                    )
                  }
                  className="pointer-events-none"
                />
              </div>
            ))}
            {data?.length === 0 && debouncedSearchTerm && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No users found
              </p>
            )}
          </ScrollArea>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedUsers.length === 0 || isLoading}
            >
              {isGroup ? "Create Group" : "Start Chat"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewConversationDialog;
