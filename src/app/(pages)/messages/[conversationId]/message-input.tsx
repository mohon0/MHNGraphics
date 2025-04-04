"use client";

import type React from "react";

import { sendMessage } from "@/actions/messages";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface MessageInputProps {
  conversationId: string;
}

const formSchema = z.object({
  message: z.string().min(1),
});

export default function MessageInput({ conversationId }: MessageInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const result = await sendMessage(
        conversationId,
        values.message,
        imageUrl || undefined,
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to send message");
      }

      form.reset();
      setImageUrl(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would implement your file upload logic
    // For example, using Cloudinary, AWS S3, or another service
    setIsUploading(true);

    try {
      // Mock upload for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real implementation, you would get the URL from your upload service
      setImageUrl("/placeholder.svg");
      toast.success("Image uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="sticky bottom-0 z-10 flex w-full items-center gap-2 border-t bg-white/80 p-4 backdrop-blur-sm lg:gap-4">
      {imageUrl && (
        <div className="absolute -top-16 left-4 flex items-center gap-2 rounded-md bg-white p-2 shadow-md">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Upload"
            className="h-12 w-12 rounded object-cover"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setImageUrl(null)}
            className="h-6 w-6 rounded-full p-0"
          >
            ×
          </Button>
        </div>
      )}

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full transition-colors hover:bg-muted"
                  disabled={isUploading}
                  type="button"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-center gap-2 lg:gap-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Type a message..."
                    {...field}
                    className="rounded-full border-muted-foreground/20 bg-muted/30 px-4 py-6 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full transition-colors hover:bg-muted"
                  >
                    <Smile className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Emoji</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !form.formState.isValid}
              className={cn(
                "rounded-full transition-all",
                form.formState.isValid
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
