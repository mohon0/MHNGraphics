import { generateSlug } from "@/components/helper/slug/CreateSlug";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DesignType } from "@/utils/Interface";
import Link from "next/link";

export function Author({
  author,
  title,
  authorId,
}: {
  author: DesignType["author"];
  authorId: string;
  title: string;
}) {
  return (
    <>
      <h1 className="text-pretty text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Link
          href={`/profile?id=${authorId}`}
          className="group flex items-center space-x-4 transition-opacity hover:opacity-90"
        >
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src={author?.image} alt={author?.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {author?.name?.charAt(0) || "MHN"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold group-hover:underline">
              {author?.name}
            </p>
            <p className="text-sm text-muted-foreground">View Profile</p>
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
    <div className="space-y-3">
      <p className="font-medium text-foreground">Related Tags:</p>
      <div className="flex flex-wrap gap-2">
        {filteredTags.map((tag, index) => (
          <Link
            href={`/design?category=all&query=&page=1&tag=${generateSlug(tag)}`}
            key={index}
          >
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-muted/50 transition-colors hover:bg-muted"
            >
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
    <>
      <Skeleton className="h-12 w-3/4 md:w-1/2" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </>
  );
}

export function TagsSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-32" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}
