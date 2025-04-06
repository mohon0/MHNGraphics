"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MoreVertical, Paperclip, Search, Send, Smile } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { conversations, getMessages } from "../data";

type Message = {
  id: string;
  content: string;
  timestamp: string;
  sender: "self" | "other";
  avatar?: string;
  senderName?: string;
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
};

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.conversationId as string;

  const [message, setMessage] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log("Fetching conversation for ID:", conversationId);

    const foundConversation = conversations.find(
      (c) => c.id === conversationId,
    );
    if (!foundConversation) {
      console.warn("Conversation not found.");
    }
    setConversation(foundConversation || null);

    const conversationMessages = getMessages(conversationId) as Message[];
    setMessages(conversationMessages);
    console.log("Loaded messages:", conversationMessages);
  }, [conversationId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "self",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("Sending message:", newMessage);
    setMessage("");
  };

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.avatar} alt={conversation.name} />
            <AvatarFallback>
              {conversation.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{conversation.name}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {conversation.online ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Online
                </>
              ) : (
                "Offline"
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[80%] gap-2",
                msg.sender === "self"
                  ? "flex-row-reverse self-end"
                  : "self-start",
              )}
            >
              {msg.sender !== "self" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatar} alt={msg.senderName || ""} />
                  <AvatarFallback>
                    {msg.senderName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg p-3",
                  msg.sender === "self"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                <p>{msg.content}</p>
                <div
                  className={cn(
                    "mt-1 text-xs",
                    msg.sender === "self"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message input area */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Emoji</span>
          </Button>
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
