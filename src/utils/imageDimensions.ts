export interface ImageDimensions {
  width: number;
  height: number;
}

export function getDynamicDimensions(
  originalWidth: number,
  originalHeight: number,
  targetHeight: number,
): ImageDimensions {
  const aspectRatio = originalWidth / originalHeight;
  const width = Math.round(targetHeight * aspectRatio);
  return { width, height: targetHeight };
}

export function getTransformedImageUrl(
  originalUrl: string,
  originalWidth: number,
  originalHeight: number,
  targetHeight: number,
): string {
  const { width, height } = getDynamicDimensions(
    originalWidth,
    originalHeight,
    targetHeight,
  );
  return originalUrl.replace(
    "/upload/",
    `/upload/h_${height},w_${width},f_jpg,c_fill,fl_attachment/w_180,o_40,l_watermark,g_south_east,x_20,y_20/`,
  );
}

export function getAspectRatio(width: number, height: number): number {
  return width / height;
}
