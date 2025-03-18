import { generateSlug } from "@/components/helper/slug/CreateSlug";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { DesignType } from "@/utils/Interface";
import Link from "next/link";

export function Author({
  author,
  authorId,
}: {
  author: DesignType["author"];
  authorId: string;
}) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <Link
        href={`/profile?id=${authorId}`}
        className="group flex items-center space-x-4"
      >
        <Avatar>
          <AvatarImage src={author?.image} alt={author?.name} />
          <AvatarFallback>{author?.name?.charAt(0) || "MHN"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
            {author?.name}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            View Profile
          </p>
        </div>
      </Link>
      <Badge className="w-fit">{author.status}</Badge>
    </div>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  const filteredTags = tags.filter((tag) => tag.trim() !== "");

  if (filteredTags.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-zinc-900 dark:text-white">
        Related Tags:
      </p>
      <div className="flex flex-wrap gap-2">
        {filteredTags.map((tag, index) => (
          <Link
            key={index}
            href={`/design?category=all&query=&page=1&tag=${generateSlug(tag)}`}
          >
            <Button variant="outline" size="sm">
              {tag}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AuthorSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <Skeleton className="h-9 w-20" />
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}
