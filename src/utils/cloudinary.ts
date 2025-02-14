import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function UploadPDF(
  pdf: Blob,
  folder: string,
): Promise<{ secure_url: string; public_id: string }> {
  const filename = `${Date.now()}_${(pdf as File).name.replaceAll(" ", "_")}`;
  const buffer = Buffer.from(await pdf.arrayBuffer());

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, public_id: filename, resource_type: "raw" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              secure_url: result?.secure_url || "",
              public_id: result?.public_id || "",
            });
          }
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    },
  );

  return result;
}
