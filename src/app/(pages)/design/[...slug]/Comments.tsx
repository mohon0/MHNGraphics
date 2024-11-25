import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, ThumbsUp } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  avatarUrl: string;
  content: string;
  date: string;
  likes: number;
}

const dummyComments: Comment[] = [
  {
    id: 1,
    author: "Jane Doe",
    avatarUrl: "https://github.com/shadcn.png",
    content:
      "This design is absolutely stunning! I love the color palette and the overall composition.",
    date: "2 days ago",
    likes: 15,
  },
  {
    id: 2,
    author: "John Smith",
    avatarUrl: "https://github.com/shadcn.png",
    content:
      "Impressive work! The attention to detail is remarkable. I'd love to see more designs like this.",
    date: "1 day ago",
    likes: 8,
  },
  {
    id: 3,
    author: "Alice Johnson",
    avatarUrl: "https://github.com/shadcn.png",
    content:
      "The concept is very creative. I'm curious about the inspiration behind this design.",
    date: "5 hours ago",
    likes: 3,
  },
  // Add more comments to test scrolling
];

export function Comments() {
  return (
    <Card className="w-full" id="comment">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Comments</CardTitle>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MessageCircle size={20} />
          <span>{dummyComments.length}</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          <div className="space-y-6 p-4">
            {dummyComments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                  <AvatarFallback>
                    {comment.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {comment.date}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/90">
                    {comment.content}
                  </p>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp size={16} className="mr-2" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="flex w-full items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="Add a comment..."
            className="min-h-[80px] flex-1"
          />
          <Button type="submit" size="icon">
            <Send size={16} />
            <span className="sr-only">Post comment</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
