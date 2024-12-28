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
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFileAlt, FaMoneyBillWave, FaRegEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface ExtendedApplicationListType extends ApplicationListType {
  refetch: () => void;
}

export default function ApplicationDataCard(app: ExtendedApplicationListType) {
  const [action, setAction] = useState(app.status);
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

  async function updateApplication(status: string) {
    try {
      toast.loading("Updating application...");
      const formData = new FormData();
      formData.append("status", status);
      formData.append("id", app.id);
      const response = await axios.patch(
        `/api/best-computer/application`,
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
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred");
    }
  }

  async function updateCertificate(status: string) {
    try {
      toast.loading("Updating certificate status...");
      const formData = new FormData();
      formData.append("id", app.id);
      formData.append("certificate", status);
      const response = await axios.patch(
        "/api/best-computer/application",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      toast.dismiss();
      if (response.status === 200) {
        toast.success("Certificate status updated successfully");
        app.refetch();
      } else {
        toast.error("Error updating certificate status");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred");
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href={`/dashboard/application-list/edit-application?id=${app.id}`}
            >
              <Button size="icon">
                <FaRegEdit className="h-4 w-4" />
              </Button>
            </Link>
            <div className="relative h-20 w-20">
              <Image
                src={app.image}
                alt={app.studentName}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive">
                  <FaTrash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Application?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The application data will be
                    permanently deleted from the database.
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
          </div>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold text-primary">
              {app.studentName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {app.course} - {app.duration}
            </p>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Date:</div>
            <div className="font-medium">{formatDate(app.createdAt)}</div>
            <div className="text-muted-foreground">Number:</div>
            <div className="font-medium">{app.mobileNumber}</div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <StatusBadge label="Status" value={app.status} />
            <StatusBadge label="Certificate" value={app.certificate} />
          </div>
          <div className="mt-4 space-y-2">
            <Select
              value={action}
              onValueChange={(value) => {
                setAction(value);
                updateApplication(value);
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
            <Select
              value={certificate}
              onValueChange={(value) => {
                setCertificate(value);
                updateCertificate(value);
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
        </CardContent>
        <CardFooter className="flex justify-center gap-2 bg-muted/50 p-4">
          <Link
            href={`/dashboard/application-list/payment-report?id=${app.id}`}
          >
            <Button size="sm" variant="outline">
              <FaMoneyBillWave className="mr-2 h-4 w-4" />
              Payment
            </Button>
          </Link>
          <Link
            href={`/dashboard/application-list/single-application?id=${app.id}`}
          >
            <Button size="sm" variant="default">
              <FaFileAlt className="mr-2 h-4 w-4" />
              Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function StatusBadge({ label, value }: { label: string; value: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "received":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20";
      case "rejected":
      case "fail":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "at office":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      default:
        return "bg-secondary hover:bg-secondary/80";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`${getStatusColor(value)} transition-colors`}
    >
      {label}: {value}
    </Badge>
  );
}
