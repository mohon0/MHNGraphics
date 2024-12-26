"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";

const MAX_FILE_SIZE = 500000; // 100KB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required.")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 100KB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
    },
  });

  const handleImageClick = useCallback(() => {
    document.getElementById("image-upload")?.click();
  }, []);

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error("File size exceeds 100KB limit", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          e.target.value = "";
          return;
        }
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          toast.error(
            "Invalid file type. Only .jpg, .jpeg, .png and .webp are allowed.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          );
          e.target.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  function onSubmit(values: FormValues) {
    toast.success("Form submitted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Profile Information
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Software Engineer"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription>
                    Your role in the organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <>
                      <Label htmlFor="image-upload">
                        <div
                          className="h-32 w-32 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-200 hover:border-gray-400"
                          onClick={handleImageClick}
                        >
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center text-gray-400">
                              <Upload className="mb-2 h-8 w-8" />
                              <span>Upload</span>
                            </div>
                          )}
                        </div>
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            onChange(files);
                            onImageChange(e);
                          }
                        }}
                        {...rest}
                      />
                    </>
                  </FormControl>
                  <FormDescription>
                    Upload your profile picture (max 100KB, .jpg, .jpeg, .png,
                    .webp).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}
