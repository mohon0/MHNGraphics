import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="relative h-96 md:h-[29.5rem]">
      <Skeleton className="h-full w-full bg-gray-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-4 md:space-y-8 lg:space-y-10">
        <div className="w-full max-w-2xl text-center">
          <Skeleton className="mb-4 h-12 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <Skeleton className="h-12 w-full max-w-xl rounded-full sm:max-w-2xl md:max-w-3xl" />
      </div>
    </div>
  );
}
