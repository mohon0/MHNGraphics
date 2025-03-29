"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadNotice } from "@/services/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileIcon, UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  pdf: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Max file size is 5MB")
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

export default function AddNoticePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutateAsync: uploadNoticeAsync, isPending } = useUploadNotice({
    onSuccess: () => {
      form.reset();
      // Reset file input by clearing the value
      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("pdf", values.pdf);

    toast.promise(uploadNoticeAsync(formData), {
      loading: "Uploading notice...",
      success: "Notice uploaded successfully!",
      error: (err) => `${err.message || "An error occurred while uploading"}`,
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Add Notice</h1>
      <Card className="mx-auto w-full max-w-2xl shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Upload Notice</CardTitle>
          <CardDescription>
            Add a new notice by providing a title and uploading a PDF file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter notice title"
                        {...field}
                        className="focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pdf"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>PDF File</FormLabel>
                    <FormControl>
                      <div className="grid w-full gap-1.5">
                        <label
                          htmlFor="pdf-upload"
                          className="group flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/25 px-6 py-8 text-center transition-colors hover:border-primary"
                        >
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                            <FileIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="mb-2 text-sm font-medium">
                            {form.watch("pdf")?.name ||
                              "Drag & drop or click to upload PDF"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            PDF up to 5MB
                          </div>
                          <Input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            {...field}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload Notice
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-muted/50 px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Uploaded notices will be immediately available to all users
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
