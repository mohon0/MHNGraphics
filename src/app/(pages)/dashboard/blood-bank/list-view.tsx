import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Donor } from "@/utils/Interface";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { BloodGroupBadge } from "./blood-group-badge";

interface ListViewProps {
  donors: Donor[];
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

export function ListView({
  donors,
  onDelete,
  isDeleting = false,
}: ListViewProps) {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
        <div className="col-span-4">Donor</div>
        <div className="col-span-2">Blood Group</div>
        <div className="col-span-2">District</div>
        <div className="col-span-2">Contact</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {donors.map((donor) => (
        <div
          key={donor.id}
          className="grid grid-cols-12 gap-4 border-b p-4 last:border-0"
        >
          <div className="col-span-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={donor.image} alt={donor.name} />
              <AvatarFallback>{donor.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{donor.name}</div>
              <div className="text-xs text-muted-foreground">
                {donor.address}
              </div>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <BloodGroupBadge group={donor.bloodGroup} />
          </div>
          <div className="col-span-2 flex items-center">{donor.district}</div>
          <div className="col-span-2 flex items-center">{donor.phone}</div>
          <div className="col-span-2 flex items-center justify-end gap-2">
            <Link href={`/dashboard/blood-bank/edit-blood-bank?id=${donor.id}`}>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <EditIcon className="h-4 w-4" />
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  disabled={isDeleting}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the donor&#39;s information from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(donor.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
