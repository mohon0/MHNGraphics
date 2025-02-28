import { convertDateString } from "@/components/helper/date/convertDateString";
import type { UserType } from "@/components/interface/UserType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";

type UserCardProps = {
  item: UserType;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
};

export function UserCard({ item, onDelete, onStatusChange }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-4">
          <Link href={`/profile?id=${item.id}`}>
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={item.image} alt={item.name} />
              <AvatarFallback className="bg-primary/10 text-xl font-medium text-primary">
                {item.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Link
                href={`/profile?id=${item.id}`}
                className="font-medium hover:text-primary"
              >
                {item.name}
              </Link>
              {item.status === "ADMIN" && (
                <Badge variant="secondary" className="ml-2">
                  Admin
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">{item.email}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Joined {convertDateString(item.createdAt.toString())}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t bg-muted/30 p-3">
          {item.status === "ADMIN" ? (
            <Badge>Admin</Badge>
          ) : (
            <Select
              defaultValue={item.status}
              onValueChange={(value) => onStatusChange(item.id, value)}
            >
              <SelectTrigger className="h-8 w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="AUTHOR">Author</SelectItem>
              </SelectContent>
            </Select>
          )}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/profile?id=${item.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. It will delete
                          everything related to this user.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => onDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>Delete User</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
