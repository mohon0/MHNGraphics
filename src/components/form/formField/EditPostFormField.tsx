import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { CgAsterisk } from "react-icons/cg";
import { toast } from "react-toastify";

interface PostImageProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  error: string;
  setImageBlob: Dispatch<SetStateAction<File | null>>; // New prop to set image as Blob
}

export const PostImage: React.FC<PostImageProps> = ({
  image,
  setImage,
  error,
  setImageBlob,
}) => {
  const MAX_IMAGE_SIZE_KB = 300;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
          setImageBlob(file); // Set image as Blob here
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    setImageBlob(null); // Clear image Blob state
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Product Image</span>
          <CgAsterisk color="red" className="ml-1" />
        </CardTitle>
        <CardDescription>
          Upload a product image. Maximum file size is {MAX_IMAGE_SIZE_KB} KB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {image ? (
            <div className="relative w-full">
              <Image
                alt="Product image"
                className="aspect-square h-60 w-full rounded-md object-cover"
                height={300}
                src={image}
                width={300}
                onError={() => toast.error("Failed to load image")}
              />
              <Button
                variant="destructive"
                className="absolute right-1 top-1 scale-75 rounded-full"
                size="icon"
                type="button"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed bg-secondary">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="sr-only">Upload</span>
            </label>
          )}
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </CardContent>
    </Card>
  );
};
