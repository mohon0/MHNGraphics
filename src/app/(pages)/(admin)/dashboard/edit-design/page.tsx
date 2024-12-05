"use client";
import EditDesignSkeleton from "@/components/common/skeleton/EditDesignSkeleton";
import { productCategories } from "@/components/data/ProductCategory";
import { FetchSingleDesignById } from "@/components/fetch/design/FetchSingleDesign";
import EditDesignImage from "@/components/form/formField/EditDesignFormField";
import { NewProductName } from "@/components/form/formField/NewDesignFormField";
import {
  NewDesignFormSchema,
  NewProductFormSchemaType,
} from "@/components/form/formSchema/FormSchema";
import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { DashboardSidebar } from "@/components/layout/admin/DashboardSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
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
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeft, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { toast } from "react-toastify";

export default function EditDesign() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            {" "}
            <div className="space-y-4 p-4">
              <Skeleton className="h-8 w-1/3" /> {/* Title placeholder */}
              <Skeleton className="h-4 w-full" /> {/* First paragraph line */}
              <Skeleton className="h-4 w-2/3" /> {/* Second paragraph line */}
              <Skeleton className="h-64 w-full rounded-md" />{" "}
              {/* Main content area placeholder */}
            </div>
          </div>
        }
      >
        <DesignPage />
      </Suspense>
    </div>
  );
}

function DesignPage() {
  const [input, setInput] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [deletedImage, setDeletedImage] = useState<string | null>(null);
  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const { isLoading, data, isError } = FetchSingleDesignById(id);
  const router = useRouter();

  const form = useForm<NewProductFormSchemaType>({
    resolver: zodResolver(NewDesignFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const { control, setValue } = form;

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
        category: data.category || "",
        tags: data.tags || [],
      });
      setInitialImage(data.image || "");
    }
  }, [data, form]);

  const tags = useWatch({ control, name: "tags" });

  const handleAddNewImage = (file: File) => {
    setNewImage(file);
  };

  const handleDeleteImage = () => {
    setDeletedImage(initialImage);
    setNewImage(null);
  };

  const addTag = useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        setValue("tags", [...tags, trimmedTag]);
        setInput("");
      }
    },
    [tags, setValue],
  );

  const removeTag = useCallback(
    (indexToRemove: number) => {
      setValue(
        "tags",
        tags.filter((tag, index) => {
          // Skip empty strings and keep the tag if it's not the one to be removed
          return tag.trim() !== "" && index !== indexToRemove;
        }),
      );
    },
    [tags, setValue],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(input);
      } else if (e.key === "Backspace" && !input && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    },
    [input, tags, addTag, removeTag],
  );

  async function onSubmit(formData: NewProductFormSchemaType) {
    const totalImages = initialImage ? 1 : newImage ? 1 : 0;

    if (totalImages === 0) {
      toast.error("Please upload an image");
      return;
    }

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        submissionData.append(key, value.toString());
      }
    });

    submissionData.append("productId", data.id);

    if (newImage) {
      submissionData.append("image", newImage);
    }

    if (deletedImage) {
      submissionData.append("deletedImage", deletedImage);
    }

    toast.loading("Please wait...");
    try {
      const response = await axios.patch(
        "/api/design/edit-design",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status !== 200) {
        toast.dismiss();
        toast.error("Failed to update design");
      } else {
        toast.dismiss();
        toast.success("Design successfully updated");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update the form");
    }
  }

  if (isLoading) {
    return (
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <BreadCrumb />
          <div>
            <EditDesignSkeleton />;
          </div>
        </main>
      </SidebarProvider>
    );
  }

  if (isError) {
    return <div>Error loading product data</div>;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <BreadCrumb />
        <div className="flex">
          <main className="w-full">
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex min-h-screen w-full flex-col">
                    <div className="flex flex-col sm:gap-4">
                      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
                        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              type="button"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => router.back()}
                            >
                              <ChevronLeft className="h-4 w-4" />
                              <span className="sr-only">Back</span>
                            </Button>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                              Edit Design
                            </h1>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                              <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                  form.reset();
                                  setNewImage(null);

                                  setDeletedImage(null);
                                }}
                              >
                                Discard
                              </Button>
                              <Button type="submit">Edit Design</Button>
                            </div>
                          </div>
                          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                              <NewProductName
                                description={data.description}
                                setDescription={setDescription}
                              />

                              <Card x-chunk="dashboard-07-chunk-2">
                                <CardHeader>
                                  <CardTitle>Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid items-baseline gap-6">
                                    <div className="grid gap-3">
                                      <div>
                                        <FormField
                                          name="category"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel className="flex">
                                                <span>Category</span>
                                                <CgAsterisk color="red" />
                                              </FormLabel>
                                              <Select
                                                onValueChange={field.onChange}
                                                defaultValue={
                                                  data.category || ""
                                                }
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  {productCategories.map(
                                                    (category) => (
                                                      <SelectItem
                                                        key={category.value}
                                                        value={category.value}
                                                      >
                                                        {category.label}
                                                      </SelectItem>
                                                    ),
                                                  )}
                                                </SelectContent>
                                              </Select>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <FormLabel>Tags</FormLabel>
                                    <div className="mb-2 flex flex-wrap gap-2">
                                      {tags
                                        .filter((tag) => tag.trim() !== "")
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
                                              <span className="sr-only">
                                                Remove {tag} tag
                                              </span>
                                            </Button>
                                          </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                      <Input
                                        type="text"
                                        value={input}
                                        onChange={(e) =>
                                          setInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        placeholder="Add a tag..."
                                        className="flex-grow"
                                      />
                                      <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => input && addTag(input)}
                                      >
                                        Add
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                              <EditDesignImage
                                image={initialImage}
                                newImage={newImage}
                                deletedImage={deletedImage}
                                handleAddNewImage={handleAddNewImage}
                                handleDeleteImage={handleDeleteImage}
                              />
                            </div>
                          </div>
                        </div>
                      </main>
                    </div>
                  </div>
                </form>
              </Form>
            </>
          </main>
        </div>
      </main>
    </SidebarProvider>
  );
}
