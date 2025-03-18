import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  type ImageDimensions,
  getDynamicDimensions,
  getTransformedImageUrl,
} from "@/utils/imageDimensions";

interface DownloadMenuItemProps {
  imageDimensions: ImageDimensions;
  originalImage: string;
  targetHeight?: number;
  label: string;
}

export default function DownloadMenuItem({
  imageDimensions,
  originalImage,
  targetHeight,
  label,
}: DownloadMenuItemProps) {
  const { width, height } = targetHeight
    ? getDynamicDimensions(
        imageDimensions.width,
        imageDimensions.height,
        targetHeight,
      )
    : imageDimensions;

  const downloadUrl = targetHeight
    ? getTransformedImageUrl(
        originalImage,
        imageDimensions.width,
        imageDimensions.height,
        targetHeight,
      )
    : originalImage.replace("/upload/", "/upload/fl_attachment/");

  return (
    <DropdownMenuItem asChild>
      <a
        href={downloadUrl}
        download
        className="flex cursor-pointer items-center justify-between text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white"
      >
        <span>{label}</span>
        <span className="ml-4 text-xs text-zinc-500 dark:text-zinc-400">
          {width} × {height}
        </span>
      </a>
    </DropdownMenuItem>
  );
}
