"use client";
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
import { useState } from "react";
import { CgAsterisk } from "react-icons/cg";
import { toast } from "react-toastify";

interface ProductImageProps {
  images: string[];
  newImages: File[];
  newImagesUrl: string[];
  deletedImages: string[];
  handleAddNewImage: (file: File, url: string) => void;
  handleDeleteImage: (url: string) => void;
}

const MAX_IMAGE_SIZE_KB = 300;

export const ProductImage: React.FC<ProductImageProps> = ({
  images,
  newImagesUrl,
  deletedImages,
  handleAddNewImage,
  handleDeleteImage,
}) => {
  const [imageError, setImageError] = useState("");

  const handleFile = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
      setImageError("File size exceeds the maximum allowed size");
      toast.error(
        `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`
      );
    } else {
      const imageUrl = URL.createObjectURL(file);
      handleAddNewImage(file, imageUrl);
      setImageError("");
    }
  };

  const handleClick = (imgUrl: string) => {
    handleDeleteImage(imgUrl);
  };

  const allImages = [...images, ...newImagesUrl];
  const filteredImages = allImages.filter(
    (img) => !deletedImages.includes(img)
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Product Image</span>
          <CgAsterisk color="red" className="ml-1" />
        </CardTitle>
        <CardDescription>
          Upload product images. Maximum file size is {MAX_IMAGE_SIZE_KB} KB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {filteredImages.length > 0 ? (
            <div className="relative w-full">
              <Image
                alt="Product image"
                className="aspect-square h-60 w-full rounded-md object-cover"
                height={300}
                src={filteredImages[0]}
                width={300}
              />
              <Button
                variant="destructive"
                className="absolute right-1 top-1 scale-75 rounded-full"
                size="icon"
                type="button"
                onClick={() => handleClick(filteredImages[0])}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            "No image found"
          )}
          <div className="grid grid-cols-3 gap-2">
            {filteredImages.slice(1).map((file, index) => (
              <div key={index} className="relative aspect-square w-full">
                <Image
                  alt={`Product image ${index + 1}`}
                  className="rounded-md object-cover"
                  height={300}
                  src={file}
                  width={300}
                />
                <Button
                  variant="destructive"
                  className="absolute -right-2 -top-2 scale-50 rounded-full"
                  size="icon"
                  type="button"
                  onClick={() => handleClick(file)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {filteredImages.length < 4 && (
              <label className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed bg-secondary">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      Array.from(files).forEach((file) => handleFile(file));
                    }
                  }}
                />
                <span className="sr-only">Upload</span>{" "}
              </label>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
