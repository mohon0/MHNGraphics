import { DesignType } from "@/components/interface/DesignType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Author({
  author,
  title,
  authorId,
}: {
  author: DesignType["author"];
  authorId: string;
  title: string
}) {
  return (
    <>
      <p className="text-2xl md:text-3xl font-bold text-primary text-pretty">{title}</p>
      <div className="flex flex-col space-y-4 text-gray-700 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Link
          href={`/profile?id=${authorId}`}
          className="flex items-center space-x-4"
        >
          <Avatar>
            <AvatarImage src={author?.image} alt={author?.name} />
            <AvatarFallback>{author?.name?.charAt(0) || "MHN"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{author?.name}</p>
            <p className="text-sm text-gray-500">View Profile</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  const filteredTags = tags.filter((tag) => tag.trim() !== "");

  if (filteredTags.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium">Related Tags:</p>
      <div className="flex flex-wrap gap-2">
        {filteredTags.map((tag, index) => (
          <Link
            href={`/design?category=all&query=&page=1&tag=${slugify(tag)}`}
            key={index}
          >
            <Button variant="outline" size="sm" className="rounded-full">
              {tag}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { slugify } from "@/components/helper/slug/CreateSlug";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthorSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}
