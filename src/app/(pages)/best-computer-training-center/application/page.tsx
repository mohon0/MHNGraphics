"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserApplication } from "@/services/application";
import {
  CalendarIcon,
  ClockIcon,
  GraduationCapIcon,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";
import { toast } from "sonner";
import ScrollNotice from "../(home)/ScrollNotice";
import ApplicationHeader from "./ApplicationHeader";
import { StudentApplicationForm } from "./StudentApplication";

export default function Application() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ApplicationContent />
    </Suspense>
  );
}

function ApplicationContent() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "unauthenticated") {
    return <VisitorView />;
  }

  if (status === "authenticated" && session.user) {
    return (
      <>
        <Content />
      </>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        An unexpected error occurred. Please try again later.
      </AlertDescription>
    </Alert>
  );
}

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto mt-10 px-4">
      <Skeleton className="mb-4 h-8 w-64" />
      <Card>
        <CardHeader>
          <Skeleton className="mb-2 h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="mt-6 h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VisitorView() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Welcome to the Application Page</CardTitle>
          <CardDescription>
            Please log in to access the application form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This page is restricted to authenticated users. If you have an
            account, please log in to continue. If you don&#39;e an account,
            please register first.
          </p>
          <Link href="/sign-in">
            <Button className="w-full">Log In</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function Content() {
  const { isLoading, data, isError } = useUserApplication();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An unexpected error occurred. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (data === "No Application Found") {
    return (
      <div className="container mx-auto px-4 py-8">
        <ScrollNotice />
        <ApplicationHeader />
        <StudentApplicationForm />
      </div>
    );
  }

  return <UserApplicationCard application={data} />;
}

interface UserApplication {
  id: string;
  studentName: string;
  duration: string;
  image: string;
  status: string;
  course: string;
  createdAt: string;
  certificate: string;
  editable: boolean | null;
}

interface UserApplicationCardProps {
  application: UserApplication;
}

function UserApplicationCard({ application }: UserApplicationCardProps) {
  const {
    studentName,
    duration,
    image,
    status,
    course,
    createdAt,
    certificate,
    id,
    editable,
  } = application;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto my-10 w-full max-w-2xl overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="flex flex-col items-center gap-4 bg-white p-6 dark:bg-gray-800 sm:flex-row">
          <Avatar className="h-24 w-24 border-4 border-blue-200 dark:border-blue-700">
            <AvatarImage src={image} alt={studentName} />
            <AvatarFallback className="text-2xl">
              {studentName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold text-blue-800 dark:text-blue-300">
              {studentName}
            </CardTitle>
            <Badge className={`mt-2 ${getStatusColor(status)}`}>
              <span className="flex items-center gap-1">
                {getStatusIcon(status)}
                {status}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GraduationCapIcon className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-medium">{course}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ClockIcon className="h-6 w-6 text-green-500" />
            <span className="font-medium">{duration}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CalendarIcon className="h-6 w-6 text-purple-500" />
            <span>{formatDate(createdAt)}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div>Certificate Status:</div>
            <Badge variant="outline" className="border-2 px-3 py-1 text-lg">
              {certificate}
            </Badge>
          </motion.div>
        </CardContent>
        <CardFooter className="flex w-full flex-col space-y-4">
          <div className="flex w-full justify-end gap-4">
            {/* View Button with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/dashboard/application-list/single-application?id=${id}`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                    >
                      View
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View full application details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Edit Button or Disabled Edit */}
            {editable === true ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/dashboard/application-list/edit-application?id=${id}`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                      >
                        Edit
                      </Button>
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Contact Admin to edit application")}
              >
                Edit
              </Button>
            )}
          </div>

          {/* Message if not editable */}
          {editable !== true && (
            <div className="mt-4 rounded-lg bg-gray-100 p-4 shadow-md">
              <p className="text-sm text-gray-700">
                You don&#39;t have permission to edit or delete this
                application. Please contact the admin for assistance.
              </p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Contact Admin:</span>
                <a
                  href="tel:01989491248"
                  className="font-medium text-blue-600 hover:underline"
                >
                  01989491248
                </a>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
