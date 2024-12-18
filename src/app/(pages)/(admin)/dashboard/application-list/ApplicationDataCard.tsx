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
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

interface ExtendedApplicationListType extends ApplicationListType {
  refetch: () => void;
}

export default function ApplicationDataCard(app: ExtendedApplicationListType) {
  const [action, setAction] = useState("");
  const [certificate, setCertificate] = useState("");
  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(
        `/api/application/application-list?id=${id}`,
      );
      if (response.status === 200) {
        toast.success("Successfully deleted");
        app.refetch();
      } else {
        toast.error("Error deleting application");
      }
    } catch (error) {
      toast.error("Error deleting application");
    }
  }

  async function UpdateApplication({
    status,
    id,
  }: {
    status: string;
    id: string;
  }) {
    const data = new FormData();
    data.set("status", status);
    if (id) data.set("id", id);

    try {
      toast.loading("Please wait...");
      const response = await axios.put(`/api/application?id=${id}`, data);

      toast.dismiss();
      if (response.status === 200) {
        toast.success("Application Updated successfully");
        app.refetch();
      } else {
        toast.error("Application Updating failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  const handleActionChange = (value: string) => {
    if (!value.trim()) {
      toast.error("Action cannot be empty");
    } else {
      setAction(value);
    }
  };

  function handleCertificateChange(value: string) {
    if (!value.trim()) {
      toast.error("Action cannot be empty");
    } else {
      setCertificate(value);
    }
  }

  function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  async function UpdateCertificate({
    id,
    status,
  }: {
    id: string;
    status: string;
  }) {
    toast.loading("Please wait...");
    const response = await axios.put("/api/application/application-list", {
      certificate: status,
      id: id,
    });

    toast.dismiss();
    if (response.status === 200) {
      toast.success("Updated certificate successfully");
      app.refetch();
    } else {
      toast.error("Error updating certificate");
    }
  }

  return (
    <div
      key={app.id}
      className="flex w-full flex-col justify-between rounded-lg border p-4"
    >
      <div className="flex justify-between">
        <Link
          href={`/application-list/editapplication/${app.id}`}
          className="h-fit w-fit"
        >
          <Button size="icon" variant="secondary">
            <FaRegEdit size="16" />
          </Button>
        </Link>
        <Image
          src={app.image}
          alt=""
          height={200}
          width={200}
          className="mx-auto mb-4 h-20 w-20 rounded-full"
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <FaTrash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Application data will be deleted from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete(app.id);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col">
        <p className="mb-2 text-lg font-bold text-primary">{app.studentName}</p>
        <p>
          <span className="font-semibold text-secondary-foreground">
            Course:{" "}
          </span>
          {app.course}
        </p>
        <p>
          <span className="font-semibold text-secondary-foreground">
            Type:{" "}
          </span>
          {app.duration}
        </p>
        <p>
          <span className="font-semibold text-secondary-foreground">
            Date:{" "}
          </span>
          {formatDate(app.createdAt)}
        </p>
        <p>
          <span className="font-semibold text-secondary-foreground">
            Number:{" "}
          </span>
          {app.mobileNumber}
        </p>
        <p>
          <span className="font-semibold text-secondary-foreground">
            Status:{" "}
          </span>
          <span
            className={
              app.status === "Approved"
                ? "font-bold text-primary-100"
                : app.status === "Pending"
                  ? "font-bold text-yellow-500"
                  : app.status === "Rejected"
                    ? "font-bold text-destructive"
                    : ""
            }
          >
            {app.status}
          </span>
        </p>
        <p>
          <span className="font-bold text-secondary-foreground">
            Certificate:{" "}
          </span>
          <span
            className={
              app.certificate === "At Office"
                ? "font-bold text-cyan-500"
                : app.certificate === "Pending"
                  ? "font-bold text-yellow-500"
                  : app.certificate === "Fail"
                    ? "font-bold text-destructive"
                    : app.certificate === "Received"
                      ? "font-bold text-primary"
                      : ""
            }
          >
            {app.certificate}
          </span>
        </p>
        {/* <div className="mt-3 flex items-center gap-0.5">
          <p className="text-sm font-bold">Status:</p>
          <ActionSelect Value={app.status} onValueChange={handleActionChange} />

          <Button
            size="sm"
            variant="secondary"
            onClick={() => UpdateApplication({ status: action, id: app.id })}
          >
            OK
          </Button>
        </div> */}
        {/* <div className="mt-2 flex items-center gap-0.5">
          <p className="text-sm font-bold">Certificate:</p>
          <CertificateSelect
            Value={app.certificate}
            onValueChange={handleCertificateChange}
          />

          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              UpdateCertificate({
                status: certificate,
                id: app.id,
              })
            }
          >
            OK
          </Button>
        </div> */}
      </div>
      <Link
        href={`/application-list/payment-report/${app.id}`}
        className="mt-6 flex w-full"
      >
        <Button variant="outline" className="w-full">
          Payment Report
        </Button>
      </Link>
      <Link
        href={`/application-list/singleapplication/${app.id}`}
        className="mt-2 flex w-full"
      >
        <Button variant="secondary" className="w-full text-primary">
          Application Details
        </Button>
      </Link>
    </div>
  );
}
