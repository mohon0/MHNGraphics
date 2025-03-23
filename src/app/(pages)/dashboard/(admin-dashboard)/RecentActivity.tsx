"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FetchRecentApplication } from "@/services/admin"
import { formatDistanceToNow } from "date-fns"
import { ChevronRight, Clock, User } from "lucide-react"
import Link from "next/link"

/**
 * Interface for application data
 */
interface ApplicationData {
  id: string
  studentName: string
  image: string
  course: string
  createdAt: string
}

/**
 * RecentActivity Component
 *
 * Displays a list of recent applications with student information,
 * course details, and timestamps. Includes a link to view all applications.
 */
export default function RecentActivity() {
  const { isLoading, data, isError } = FetchRecentApplication()

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Recent Applications</CardTitle>
        <Link href="/dashboard/application-list?filter=All&page=1&sort=newest&certificate=All&name=&type=all">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <RecentActivitySkeleton />
        ) : isError ? (
          <div className="p-6 text-center text-destructive">Error loading recent applications.</div>
        ) : data && data.length > 0 ? (
          <div className="divide-y divide-border">
            {data.map((app: ApplicationData) => (
              <Link key={app.id} href={`/dashboard/application-list/single-application?id=${app.id}`} className="block">
                <div className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
                  <Avatar>
                    <AvatarImage src={app.image} alt={app.studentName} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{app.studentName}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {app.course}
                      </Badge>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDistanceToNow(new Date(app.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-muted-foreground">No recent applications found.</div>
        )}
      </CardContent>
    </Card>
  )
}

function RecentActivitySkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center gap-4 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        ))}
    </div>
  )
}

