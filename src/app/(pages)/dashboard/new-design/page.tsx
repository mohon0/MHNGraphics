"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TiptapEditor, { TiptapEditorRef } from "@/editor";
import { NewDesignSchema, NewDesignSchemaType } from "@/lib/Schemas";
import { useCreateDesign } from "@/services/design";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategoryAndTags } from "./CategoryAndTags";
import { DesignImage } from "./DesignImage";
import { DesignSkeleton } from "./skeleton";

export default function NewDesign() {
  const { status } = useSession();
  const router = useRouter();

  // Handle loading and unauthenticated states
  if (status === "loading") return <DesignSkeleton />;
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="mx-2 md:mx-4">
      <NewArticleForm />
    </div>
  );
}

function NewArticleForm() {
  const editorRef = useRef<TiptapEditorRef>(null);
  const [image, setImage] = useState<File | null>(null);
  const [warning, setWarning] = useState<string>("");

  const form = useForm<z.infer<typeof NewDesignSchema>>({
    resolver: zodResolver(NewDesignSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  // Create the mutation hook instance and pass the reset function

  const resetForm = () => {
    form.reset({ name: "", description: "", category: "", tags: [] });
    setImage(null);
    setWarning("");

    // Clear the Tiptap editor content manually
    const editor = editorRef.current?.getInstance();
    if (editor) {
      editor.commands.setContent("");
    }
  };
  const createDesign = useCreateDesign(resetForm);

  function onSubmit(data: NewDesignSchemaType) {
    if (!image) {
      setWarning("Please upload an image.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    formData.append("image", image);

    // Use the mutation hook's mutate method
    createDesign.mutate(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/dashboard/">
            <Button
              variant="outline"
              type="button"
              size="icon"
              className="h-9 w-9"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold sm:text-xl">New Design</h1>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" type="button" onClick={resetForm}>
              Discard
            </Button>
            <Button type="submit">Save Article</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-12">
          <div className="space-y-6 md:col-span-2 lg:col-span-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title of the design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Content</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      ref={editorRef}
                      ssr
                      output="html"
                      placeholder={{ paragraph: "Type your content here..." }}
                      onContentChange={field.onChange}
                      initialContent={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <DesignImage image={image} setImage={setImage} error={warning} />
            <CategoryAndTags />
          </div>
        </div>
      </form>
    </Form>
  );
}
