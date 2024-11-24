import { convertToReadableDate } from "@/components/helper/date/convertDateString";
import { DesignType } from "@/components/interface/DesignType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageDimensions } from "@/utils/imageDimensions";
import {
  CircleCheckBig,
  Download,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { SiCanva } from "react-icons/si";
import DownloadMenuItem from "./DownloadMenuItem";
import { Skeleton } from "@/components/ui/skeleton";

interface DesignDetailsProps {
  data: DesignType;
  imageDimensions: ImageDimensions | null;
}

export function DesignDetails({ data, imageDimensions }: DesignDetailsProps) {
  return (
    <>
      <p className="inline-flex items-center gap-2 text-wrap text-sm">
        <CircleCheckBig className="h-4 w-4" />
        Free for use under the MHN{" "}
        <Link className="text-primary underline" href="/content-license">
          Content License
        </Link>
      </p>
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button className="w-full sm:w-auto">
            <SiCanva className="mr-2" />
            <span>Edit Image</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <p className="p-2 text-sm text-muted-foreground">File Size</p>
              {imageDimensions && (
                <>
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={500}
                    label="Small"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={1000}
                    label="Medium"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    targetHeight={1500}
                    label="Large"
                  />
                  <DownloadMenuItem
                    imageDimensions={imageDimensions}
                    originalImage={data.image}
                    label="Original"
                  />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <Heart className="mr-2 h-5 w-5" /> Love
          </Button>
          <Button variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-5 w-5" /> Comment
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-5 w-5" /> Share
          </Button>
        </div>
      </div>
      <div className="w-full pt-4">
        <p className="flex items-center justify-between">
          <span className="text-muted-foreground">View:</span>
          <span>1000</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="text-muted-foreground">Download:</span>
          <span>100</span>
        </p>

        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="details">
            <AccordionTrigger>Show details</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Love:</span> 20
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Resolution:</span>{" "}
                {imageDimensions
                  ? `${imageDimensions.width} x ${imageDimensions.height}`
                  : "Loading..."}
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Media type:</span> JPG
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Published date:</span>
                {convertToReadableDate(data.createdAt)}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}


export function DesignDetailsSkeleton() {
  return (
    <>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-8 w-full" />
      <div>
        <div className="flex justify-between gap-5">
          <Skeleton className="h-10 w-full flex-grow" />
          <Skeleton className="h-10 w-full flex-grow" />
        </div>
        <div className="mt-6 flex w-full gap-4">
          <Skeleton className="h-10 w-full flex-grow" />
          <Skeleton className="h-10 w-full flex-grow" />
          <Skeleton className="h-10 w-full flex-grow" />
        </div>
      </div>
      <div className="w-full pt-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="mt-2 h-4 w-1/3" />
        <div className="mt-4">
          <Skeleton className="h-4 w-1/4" />
          <div className="mt-2 space-y-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    </>
  );
}