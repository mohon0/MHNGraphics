import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  ImageDimensions,
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
      <a href={downloadUrl} download className="cursor-pointer">
        {label} ({width} x {height})
      </a>
    </DropdownMenuItem>
  );
}
