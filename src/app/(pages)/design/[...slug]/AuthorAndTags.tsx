import { DesignType } from "@/components/interface/DesignType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function AuthorAndTagsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <Skeleton className="h-8 w-3/4" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AuthorAndTags({ data }: { data: DesignType }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 text-gray-700 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Link
          href={`/profile?id=${data.authorId}`}
          className="flex items-center space-x-4"
        >
          <Avatar>
            <AvatarImage src={data.author?.image} alt={data.author?.name} />
            <AvatarFallback>
              {data.author?.name?.charAt(0) || "MHN"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{data.author?.name}</p>
            <p className="text-sm text-gray-500">View Profile</p>
          </div>
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
        {data.name}
      </h1>

      {data.tags && data.tags.filter((tag) => tag.trim() !== "").length > 0 && (
        <div className="space-y-2">
          <p className="font-medium">Related Tags:</p>
          <div className="flex flex-wrap gap-2">
            {data.tags
              .filter((tag) => tag.trim() !== "")
              .map((tag: string, index: number) => (
                <Button
                  variant="outline"
                  size="sm"
                  key={index}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
