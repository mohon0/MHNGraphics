import { productCategories } from "@/components/data/ProductCategory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { toast } from "react-toastify";
import { NewProductFormSchemaType } from "../formSchema/FormSchema";

export const NewProductName: React.FC = () => {
  const { control } = useFormContext<NewProductFormSchemaType>();
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Design Details</CardTitle>
        <CardDescription>Add all the details of the design</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  <span>Design Name</span>
                  <CgAsterisk color="red" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Provide a meaningful name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  <span>Description</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="SEO description"
                    className="min-h-40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductStatus: React.FC = () => {
  const { control } = useFormContext<NewProductFormSchemaType>();
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Design Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    <span>Design Status</span>
                    <CgAsterisk color="red" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Design Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Publish</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProductImageProps {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  error?: string;
}

const MAX_IMAGE_SIZE_KB = 900;

export function ProductImage({ image, setImage, error }: ProductImageProps) {
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
        setImageError(
          `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`,
        );
        toast.error(
          `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`,
        );
      } else {
        setImage(file);
        setImageError(null);
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          Design Image
          <CgAsterisk className="h-3 w-3 text-destructive" aria-hidden="true" />
        </CardTitle>
        <CardDescription>
          Upload an image. Maximum file size is {MAX_IMAGE_SIZE_KB} KB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {image ? (
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-md">
              <Image
                src={URL.createObjectURL(image)}
                alt="Product image"
                fill
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ) : (
            <div className="aspect-square w-full max-w-sm">
              <Label
                htmlFor="image-upload"
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground bg-muted"
              >
                <Upload
                  className="h-8 w-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="mt-2 text-sm text-muted-foreground">
                  Click to upload
                </span>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </Label>
            </div>
          )}
          {(imageError || error) && (
            <p className="text-sm text-destructive" role="alert">
              {imageError || error}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export const RequiredLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <FormLabel className="flex items-center gap-1">
    {children}
    <CgAsterisk className="h-3 w-3 text-destructive" aria-hidden="true" />
  </FormLabel>
);

export const ProductCategoryAndTags: React.FC = () => {
  const { control, setValue, watch } =
    useFormContext<NewProductFormSchemaType>();
  const selectedCategory = watch("category");
  const tags = watch("tags") || [];

  const subcategories =
    productCategories.find((category) => category.value === selectedCategory)
      ?.subcategories || [];

  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim(); // Trim whitespace from the input
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const currentTags = watch("tags") || [];
      setValue("tags", [...currentTags, trimmedTag]); // Set the new tags array directly
      setInput(""); // Clear the input field after adding the tag
    } else if (!trimmedTag) {
      console.warn("Cannot add an empty tag."); // Optional: Add a warning for empty tags
    }
  };

  const removeTag = (indexToRemove: number) => {
    setValue(
      "tags",
      tags.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design Category and Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>Design Category</RequiredLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value
                            .toLowerCase()
                            .replace(/\s+/g, "_")}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>Sub Category</RequiredLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Subcategory</SelectLabel>
                          {subcategories.map((subcategory) => (
                            <SelectItem
                              key={subcategory.value}
                              value={subcategory.value
                                .toLowerCase()
                                .replace(/\s+/g, "_")}
                            >
                              {subcategory.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormLabel>Tags</FormLabel>
            <div className="mb-2 flex flex-wrap gap-2">
              {tags
                .filter((tag) => tag.trim() !== "") // Filter out empty string tags
                .map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-2 py-1 text-sm"
                  >
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="ml-1 h-auto p-0"
                      onClick={() => removeTag(index)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {tag} tag</span>
                    </Button>
                  </Badge>
                ))}
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag..."
                className="flex-grow"
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => addTag(input)}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
