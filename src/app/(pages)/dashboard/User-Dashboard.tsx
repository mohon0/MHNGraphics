"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchUserDashboard } from "@/services/admin";
import type { ApplicationSummary, Comment } from "@/utils/Interface";
import { Design } from "@/utils/Interface";
import { format } from "date-fns";
import {
  CalendarDays,
  Edit,
  Eye,
  GraduationCap,
  MessageSquare,
  Palette,
  Phone,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function UserDashboard() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  const { isLoading, isError, data: userData } = useFetchUserDashboard();
  if (status === "loading") return <DashboardSkeleton />;
  if (status === "unauthenticated") return null;

  const userId = session?.user?.id;

  if (!userId) {
    return <ErrorMessage message="No user ID available" />;
  }

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <ErrorMessage message="Error fetching user data" />;

  const userImage = userData?.image || userData?.applications?.[0]?.image;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
          <Avatar className="h-32 w-32 border-4 border-white">
            <AvatarImage src={userImage} alt={userData?.name || "User"} />
            <AvatarFallback className="text-2xl">
              {userData?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold">{userData?.name || "User"}</h2>
              <p className="text-blue-100">{userData?.email}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{userData?.phoneNumber || "N/A"}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{userData?.status || "Inactive"}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Joined:{" "}
                  {userData?.createdAt
                    ? format(new Date(userData.createdAt), "do MMMM yyyy")
                    : "N/A"}
                </span>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="designs">Designs</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="applications">
          {userData?.applications && userData.applications.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <GraduationCap className="mr-2" />
                  Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {userData.applications.map((app: ApplicationSummary) => (
                    <Card
                      key={app.id}
                      className="mb-4 transition-shadow last:mb-0 hover:shadow-lg"
                    >
                      <CardContent className="p-4">
                        <h3 className="mb-2 text-xl font-semibold">
                          {app.studentName}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" /> {app.course}
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge
                              variant={
                                app.status === "Approved"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {app.status}
                            </Badge>
                          </div>
                          <div>Duration: {app.duration}</div>
                          {app.certificate && (
                            <div>Certificate: {app.certificate}</div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted p-2">
                        <div className="flex w-full justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={`/dashboard/application-list/single-application?id=${app.id}`}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                  >
                                    <Eye className="mr-1 h-4 w-4" /> View
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View full application details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {app.editable ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    href={`/dashboard/application-list/edit-application?id=${app.id}`}
                                  >
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-green-500 text-white hover:bg-green-600"
                                    >
                                      <Edit className="mr-1 h-4 w-4" /> Edit
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit application details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                toast.info("Contact Admin to edit application")
                              }
                              className="bg-gray-300 text-gray-600"
                            >
                              <Edit className="mr-1 h-4 w-4" /> Edit
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                      {app.editable !== true && (
                        <div className="mt-4 rounded-lg bg-gray-100 p-4 shadow-md">
                          <p className="text-sm text-gray-700">
                            You don&#39;t have permission to edit or delete this
                            application. Please contact the admin for
                            assistance.
                          </p>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              Contact Admin:
                            </span>
                            <a
                              href="tel:01989491248"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              01989491248
                            </a>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No applications found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="designs">
          {userData?.design && userData.design.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Palette className="mr-2" />
                  Latest Designs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid gap-4">
                    {userData.design.map((design: Design) => (
                      <Card
                        key={design.id}
                        className="transition-shadow hover:shadow-md"
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-2">
                            <Palette className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">
                              Design ID: {design.id}
                            </span>
                          </div>
                          <Badge variant="outline">
                            {new Date(design.createdAt).toLocaleDateString()}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No designs found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="comments">
          {userData?.comments && userData.comments.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageSquare className="mr-2" />
                  Latest Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {userData.comments.map((comment: Comment) => (
                      <Card
                        key={comment.id}
                        className="transition-shadow hover:shadow-md"
                      >
                        <CardContent className="p-4">
                          <p className="mb-2 text-sm">{comment.content}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                            <Badge variant="outline">
                              Comment ID: {comment.id}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No comments found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-4">
      <Card>
        <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Skeleton className="h-10 w-full" />
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="container mx-auto p-4">
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{message}</p>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
