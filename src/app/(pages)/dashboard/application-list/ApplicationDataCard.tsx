"use client";

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaFileAlt, FaMoneyBillWave, FaRegEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface ExtendedApplicationListType extends ApplicationListType {
  refetch: () => void;
}

export default function ApplicationDataCard(app: ExtendedApplicationListType) {
  const [action, setAction] = useState(app.status);
  const [checked, setChecked] = useState(app.editable || false);
  const [certificate, setCertificate] = useState(app.certificate);

  async function handleDelete(id: string) {
    try {
      toast.loading("Deleting application...");
      const response = await axios.delete(
        `/api/best-computer/application?id=${id}`,
      );
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Application deleted successfully");
        app.refetch();
      } else {
        toast.dismiss();
        toast.error("Error deleting application");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error deleting application");
    }
  }

  function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  async function updateApplicationData(updateFields: Record<string, string>) {
    try {
      toast.loading("Updating application...");
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

      toast.dismiss();
      if (response.status === 200) {
        toast.success("Application updated successfully");
        app.refetch();
      } else {
        toast.error("Error updating application");
        setChecked(app.editable || false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred");
      setChecked(app.editable || false);
    }
  }

  return (
    <div>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6">
          <div className="relative mx-auto mb-4 h-20 w-20">
            <Image
              src={app.image}
              alt={app.studentName}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>

          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold text-primary">
              {app.studentName}
            </h3>
            <p className="text-sm text-muted-foreground">{app.course}</p>
            <Badge>{app.duration}</Badge>
            <div className="mt-4 flex items-center justify-center gap-6">
              <Label>Editable:</Label>
              <Switch
                checked={checked}
                onCheckedChange={(value) => {
                  setChecked(value);
                  updateApplicationData({ editable: value ? "true" : "false" });
                }}
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Date:</div>
            <div className="font-medium">{formatDate(app.createdAt)}</div>
            <div className="text-muted-foreground">Number:</div>
            <div className="font-medium">{app.mobileNumber}</div>
            <div className="text-muted-foreground">Status:</div>
            <StatusBadge value={app.status} />
            <div className="text-muted-foreground">Certificate:</div>
            <StatusBadge value={app.certificate} />
          </div>

          <div className="mt-4 space-y-2">
            <div>
              <Label>Update Status:</Label>
              <Select
                value={action}
                onValueChange={(value) => {
                  setAction(value);
                  updateApplicationData({ status: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Update Status</SelectLabel>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Update Certificate:</Label>
              <Select
                value={certificate}
                onValueChange={(value) => {
                  setCertificate(value);
                  updateApplicationData({ certificate: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Update Certificate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Update Certificate</SelectLabel>
                    <SelectItem value="At Office">At Office</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Fail">Fail</SelectItem>
                    <SelectItem value="Received">Received</SelectItem>
                    <SelectItem value="Course Incomplete">
                      Course Incomplete
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between gap-2 bg-muted/50 p-2">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <a href={`/dashboard/application-list/payment-report?id=${app.id}`}>
              <FaMoneyBillWave className="mr-2 h-3 w-3" />
              Payment
            </a>
          </Button>
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <a
              href={`/dashboard/application-list/single-application?id=${app.id}`}
            >
              <FaFileAlt className="mr-2 h-3 w-3" />
              Details
            </a>
          </Button>
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <a
              href={`/dashboard/application-list/edit-application?id=${app.id}`}
            >
              <FaRegEdit className="mr-2 h-3 w-3" />
              Edit
            </a>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive" className="flex-1">
                <FaTrash className="mr-2 h-3 w-3" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Application?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The application data will be
                  permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(app.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
function StatusBadge({ value }: { value: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-primary-100";
      case "received":
        return "text-primary-200";
      case "pending":
        return "text-yellow-600";
      case "rejected":
      case "fail":
        return " text-destructive";
      case "at office":
        return " text-blue-700";
      default:
        return "text-primary";
    }
  };

  return <p className={`${getStatusColor(value)} font-bold`}>{value}</p>;
}
