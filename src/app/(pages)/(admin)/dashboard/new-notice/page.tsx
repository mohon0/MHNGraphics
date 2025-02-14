"use client";

import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { DashboardSidebar } from "@/components/layout/admin/DashboardSidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  pdf: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Max file size is 5MB")
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

export default function AddNoticePage() {
  const [isUploading, setIsUploading] = useState(false);
  // key for file input to force remount/reset
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("pdf", values.pdf);

    toast.loading("Uploading notice...");
    setIsUploading(true);

    try {
      const response = await fetch("/api/notice", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload notice");
      }

      toast.dismiss();
      toast.success("Notice uploaded successfully!");
      form.reset();
      // update fileInputKey to force file input remount
      setFileInputKey(Date.now());
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while uploading");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <main className="flex-1">
          <BreadCrumb />
          <div className="container mx-auto px-4 py-4">
            <h1 className="mb-6 text-center text-3xl font-bold">Add Notice</h1>
            <Card className="mx-auto w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Upload Notice</CardTitle>
                <CardDescription>
                  Add a new notice by providing a title and uploading a PDF
                  file.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
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
                            <Input
                              key={fileInputKey} // force remount on key change
                              type="file"
                              accept=".pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onChange(file);
                                }
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? "Uploading..." : "Upload Notice"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
