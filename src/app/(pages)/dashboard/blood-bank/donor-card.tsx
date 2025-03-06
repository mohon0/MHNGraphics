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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Donor } from "@/utils/Interface";
import {
  CalendarIcon,
  EditIcon,
  MapPinIcon,
  PhoneIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { BloodGroupBadge } from "./blood-group-badge";

interface DonorCardProps {
  donor: Donor;
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

export function DonorCard({
  donor,
  onDelete,
  isDeleting = false,
}: DonorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={donor.image} alt={donor.name} />
              <AvatarFallback className="bg-primary/10">
                {donor.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{donor.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPinIcon className="h-3 w-3" />
                {donor.district}
              </div>
            </div>
          </div>
          <BloodGroupBadge group={donor.bloodGroup} />
        </div>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{donor.number}</span>
          </div>
          {donor.number2 && (
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{donor.number2}</span>
            </div>
          )}
          {donor.birthDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{donor.birthDate}</span>
            </div>
          )}
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            <div className="rounded-md bg-muted p-1.5">
              <span className="font-medium">Donated Before:</span>{" "}
              {donor.donatedBefore}
            </div>
            <div className="rounded-md bg-muted p-1.5">
              <span className="font-medium">Diseases:</span> {donor.diseases}
            </div>
          </div>
          <div className="mt-1 rounded-md bg-muted p-1.5 text-xs">
            <span className="font-medium">Address:</span> {donor.address}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/30 p-2">
        <Link href={`/dashboard/blood-bank/edit-blood-bank?id=${donor.id}`}>
          <Button size="sm" variant="ghost" className="h-8 gap-1">
            <EditIcon className="h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={isDeleting}
            >
              <TrashIcon className="h-3.5 w-3.5" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                donor&#39;s information from the database.
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
      </CardFooter>
    </Card>
  );
}
