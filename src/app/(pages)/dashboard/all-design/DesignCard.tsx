import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteDesign, useUpdateDesignStatus } from "@/services/design";
import { Design } from "@/utils/Interface";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DesignCard({
  design,
}: {
  design: Design;
  refetch: () => void;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const deleteMutation = useDeleteDesign();
  const updateStatusMutation = useUpdateDesignStatus();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/edit-design?id=${id}`);
  };

  const handleDelete = (id: string) => {
    setSelectedDesign(id);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    if (selectedDesign) {
      deleteMutation.mutate(selectedDesign, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedDesign(null);
        },
      });
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  return (
    <>
      <Card
        key={design.id}
        className="group overflow-hidden bg-card transition-all duration-300 hover:shadow-lg"
      >
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={design.image || "/placeholder.svg"}
              alt={design.name}
              height={400}
              width={400}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <Link
              href={createSlug({ id: design.id, name: design.name })}
              className="absolute inset-0 z-0 bg-linear-to-t from-black/60 via-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" onClick={() => handleEdit(design.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit design</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(design.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete design</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="flex items-start justify-between space-x-4">
            <div className="min-w-0 flex-1">
              <Link href={createSlug({ id: design.id, name: design.name })}>
                <h3 className="mb-1 truncate text-lg font-semibold leading-tight">
                  {design.name}
                </h3>
              </Link>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="text-sm">{design.category}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(design.status)}`}
                >
                  {design.status}
                </div>
              </div>
            </div>
            {session?.user?.role === "ADMIN" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mt-1 h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(design.id, "PUBLISHED")}
                    disabled={design.status === "PUBLISHED" ? true : false}
                  >
                    Set as Published
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(design.id, "PENDING")}
                    disabled={design.status === "PENDING" ? true : false}
                  >
                    Set as Pending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar>
              <AvatarImage src={design.author.image} alt={design.author.name} />
              <AvatarFallback>{design.author.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {design.author.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(design.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Design</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this design? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "published":
      return "text-green-700 bg-green-50 ring-1 ring-green-300/50";
    case "pending":
      return "text-yellow-700 bg-yellow-50 ring-1 ring-yellow-300/50";
    default:
      return "text-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/50 ring-1 ring-gray-300/50";
  }
};
