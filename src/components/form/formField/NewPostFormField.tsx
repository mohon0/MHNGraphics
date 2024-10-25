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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { toast } from "react-toastify";
import { NewPostFormSchemaType } from "../formSchema/FormSchema";

export const SlugField: React.FC = () => {
  const { control, setValue } = useFormContext<NewPostFormSchemaType>();
  const slugManualEdit = useRef(false);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    slugManualEdit.current = true;
    setValue("slug", e.target.value);
  };

  return (
    <FormField
      control={control}
      name="slug"
      render={({ field }) => (
        <Card>
          <CardHeader>
            <CardTitle>Slug</CardTitle>
            <CardDescription>
              Customize the URL slug for your post. A good slug is short,
              descriptive, and contains relevant keywords.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormItem>
              <FormControl>
                <Input
                  placeholder="gamer-gear-pro-controller"
                  {...field}
                  onChange={handleSlugChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>
      )}
    />
  );
};

export const ExcerptField: React.FC = () => {
  const { control, setValue } = useFormContext<NewPostFormSchemaType>();
  const excerptManualEdit = useRef(false);

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    excerptManualEdit.current = true;
    setValue("excerpt", e.target.value);
  };

  return (
    <FormField
      control={control}
      name="excerpt"
      render={({ field }) => (
        <Card>
          <CardHeader>
            <CardTitle>Excerpt</CardTitle>
            <CardDescription>
              Provide a brief summary of your post. This will be displayed on
              the blog&#39;s main page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="A short summary of the post"
                  {...field}
                  onChange={handleExcerptChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>
      )}
    />
  );
};

export const MetaDescriptionField: React.FC = () => {
  const { control, setValue } = useFormContext<NewPostFormSchemaType>();
  const metaManualEdit = useRef(false);

  const handleMetaDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    metaManualEdit.current = true;
    setValue("metaDescription", e.target.value);
  };

  return (
    <FormField
      control={control}
      name="metaDescription"
      render={({ field }) => (
        <Card>
          <CardHeader>
            <CardTitle>Meta Description</CardTitle>
            <CardDescription>
              The meta description appears in search engine results. Write a
              concise and appealing description to encourage clicks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="A meta description for the post"
                  {...field}
                  onChange={handleMetaDescriptionChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>
      )}
    />
  );
};

export const TagsField: React.FC = () => {
  const { control, setValue, getValues } =
    useFormContext<NewPostFormSchemaType>();
  const [tagInput, setTagInput] = useState("");

  const addTag = (tag: string) => {
    const currentTags = getValues("tags") || [];
    if (!currentTags.includes(tag)) {
      setValue("tags", [...currentTags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    const currentTags = getValues("tags") || [];
    setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || (e.key === "Enter" && tagInput.trim())) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>
              Press Enter or comma(,) to add tags,
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormItem>
              <FormControl>
                <Input
                  value={tagInput}
                  placeholder="Add a tag"
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className="mt-2 flex flex-wrap gap-2">
              {field.value?.map((tag: string) => (
                <div
                  key={tag}
                  className="flex items-center space-x-2 rounded border px-2 py-1"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
};

interface ProductImageProps {
  image: File | null;
  error: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const MAX_IMAGE_SIZE_KB = 300;

export const PostImage: React.FC<ProductImageProps> = ({
  image,
  setImage,
  error,
}) => {
  const [imageError, setImageError] = useState("");

  const handleFile = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
      setImageError("File size exceeds the maximum allowed size");
      toast.error(
        `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`
      );
    } else {
      setImage(file);
      setImageError("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex">
          <span>Product Image</span>
          <CgAsterisk color="red" />
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
                className="h-60 w-full rounded-md object-cover"
                height={300}
                src={URL.createObjectURL(image)}
                width={300}
              />
              <button
                onClick={removeImage}
                className="absolute right-1 top-1 flex items-center justify-center rounded-full bg-red-600 p-1 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Image
                alt="Placeholder image"
                className="h-40 w-full rounded-md object-cover"
                height={300}
                src="/placeholder.svg"
                width={300}
              />
            </label>
          )}
        </div>
        {imageError && (
          <p className="mt-2 text-sm text-red-600">{imageError}</p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </CardContent>
    </Card>
  );
};

export const PostStatus: React.FC = () => {
  const { control } = useFormContext<NewPostFormSchemaType>();
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Post Status</CardTitle>
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
                    <span>Post Status</span>
                    <CgAsterisk color="red" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Post Status" />
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
