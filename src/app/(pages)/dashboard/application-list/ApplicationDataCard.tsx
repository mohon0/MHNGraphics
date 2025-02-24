"use client";

import axios from "axios";
import { format } from "date-fns";
import {
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  MoreVertical,
  Receipt,
  Settings,
  TrashIcon,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "react-toastify";

import { ApplicationListType } from "@/components/interface/ApplicationType";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExtendedApplicationListType extends ApplicationListType {
  refetch: () => void;
}

const statusConfig = {
  Approved: {
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  Pending: { icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-50" },
  Rejected: { icon: XCircle, color: "text-red-500", bgColor: "bg-red-50" },
  "At Office": {
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  Received: {
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  Fail: { icon: XCircle, color: "text-red-600", bgColor: "bg-red-50" },
  "Course Incomplete": {
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
} as const;

type StatusType = keyof typeof statusConfig;

export default function ApplicationDataCard(app: ExtendedApplicationListType) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  async function handleDelete() {
    try {
      const toastId = toast.loading("Deleting application...");
      const response = await axios.delete(
        `/api/best-computer/application?id=${app.id}`,
      );

      if (response.status === 200) {
        toast.update(toastId, {
          render: "Application deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        app.refetch();
      }
    } catch (error) {
      toast.error("Error deleting application");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  }

  async function updateApplicationData(updateFields: Record<string, string>) {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append("id", app.id);
      Object.entries(updateFields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.patch(
        "/api/best-computer/application",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.status === 200) {
        toast.success("Application updated successfully");
        app.refetch();
      }
    } catch (error) {
      toast.error("Error updating application");
    } finally {
      setIsUpdating(false);
    }
  }

  const StatusIcon = statusConfig[app.status as StatusType]?.icon || Clock;
  const CertificateIcon =
    statusConfig[app.certificate as StatusType]?.icon || Clock;

  const isStatusDisabled = (status: string) => status === app.status;
  const isCertificateDisabled = (status: string) => status === app.certificate;

  return (
    <TooltipProvider>
      <Card className="relative overflow-hidden">
        <div className="p-4">
          {/* Header with Image and Actions */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="relative h-12 w-12">
                <Avatar>
                  <AvatarImage src={app.image} />
                  <AvatarFallback>{app.studentName.slice(0, 3)}</AvatarFallback>
                </Avatar>
                {isUpdating && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  </div>
                )}
              </div>

              <h3 className="font-semibold">{app.studentName}</h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/dashboard/application-list/single-application?id=${app.id}`}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/dashboard/application-list/payment-report?id=${app.id}`}
                    >
                      <Receipt className="mr-2 h-4 w-4" />
                      Payment Report
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/dashboard/application-list/edit-application?id=${app.id}`}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Application
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <StatusIcon className="mr-2 h-4 w-4" />
                    Update Status
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {["Approved", "Pending", "Rejected"].map((status) => {
                        const StatusIcon =
                          statusConfig[status as StatusType].icon;
                        const disabled = isStatusDisabled(status);
                        return (
                          <DropdownMenuItem
                            key={status}
                            onClick={() =>
                              !disabled && updateApplicationData({ status })
                            }
                            disabled={disabled}
                            className={disabled ? "opacity-50" : ""}
                          >
                            <StatusIcon
                              className={`mr-2 h-4 w-4 ${statusConfig[status as StatusType].color}`}
                            />
                            {status}
                            {disabled && " (Current)"}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <CertificateIcon className="mr-2 h-4 w-4" />
                    Update Certificate
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {[
                        "At Office",
                        "Pending",
                        "Fail",
                        "Received",
                        "Course Incomplete",
                      ].map((status) => {
                        const StatusIcon =
                          statusConfig[status as StatusType].icon;
                        const disabled = isCertificateDisabled(status);
                        return (
                          <DropdownMenuItem
                            key={status}
                            onClick={() =>
                              !disabled &&
                              updateApplicationData({ certificate: status })
                            }
                            disabled={disabled}
                            className={disabled ? "opacity-50" : ""}
                          >
                            <StatusIcon
                              className={`mr-2 h-4 w-4 ${statusConfig[status as StatusType].color}`}
                            />
                            {status}
                            {disabled && " (Current)"}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:bg-red-50 focus:text-red-600"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete Application
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Status Information */}
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="h-6">
              {app.duration}
            </Badge>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="secondary"
                  className={`flex items-center gap-1 ${statusConfig[app.status as StatusType]?.bgColor} border-0`}
                >
                  <StatusIcon
                    className={`h-3 w-3 ${statusConfig[app.status as StatusType]?.color}`}
                  />
                  {app.status}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Application Status</TooltipContent>
            </Tooltip>
          </div>

          {/* Info Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Mobile:</div>
            <div>{app.mobileNumber}</div>
            <div className="text-muted-foreground">Applied:</div>
            <div>{format(new Date(app.createdAt), "PPP")}</div>
            <div className="text-muted-foreground">Certificate:</div>
            <div className="flex items-center gap-2">
              <CertificateIcon
                className={`h-4 w-4 ${statusConfig[app.certificate as StatusType]?.color}`}
              />
              <span>{app.certificate}</span>
            </div>
            <div className="text-muted-foreground">Course:</div>
            <div>{app.course}</div>
            <div className="text-muted-foreground">Editable:</div>
            <div>
              <Switch
                checked={app.editable || false}
                onCheckedChange={(value) =>
                  updateApplicationData({ editable: value.toString() })
                }
                disabled={isUpdating}
                className="origin-left scale-75"
              />
            </div>
          </div>
        </div>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {app.studentName}&apos;s application.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
