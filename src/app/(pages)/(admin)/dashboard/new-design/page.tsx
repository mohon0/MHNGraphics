"use client";
import EditDesignSkeleton from "@/components/common/skeleton/EditDesignSkeleton";
import {
  NewProductName,
  ProductCategoryAndTags,
  ProductImage,
} from "@/components/form/formField/NewDesignFormField";
import {
  NewDesignFormSchema,
  NewProductFormSchemaType,
} from "@/components/form/formSchema/FormSchema";
import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { DashboardSidebar } from "@/components/layout/admin/DashboardSidebar";
import Footer from "@/components/layout/footer/Footer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SidebarProvider } from "@/components/ui/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export default function NewDesign() {
  const [image, setImage] = useState<File | null>(null);
  const [warning, setWarning] = useState<string>("");

  const form = useForm<NewProductFormSchemaType>({
    resolver: zodResolver(NewDesignFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const { status } = useSession();
  const router = useRouter();

  // Enhanced form reset function
  const resetForm = () => {
    form.reset();
    if (image) setImage(null);
    if (warning) setWarning("");
  };

  async function onSubmit(data: NewProductFormSchemaType) {
    if (!image) {
      setWarning("Please upload an image.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    formData.append("image", image);

    toast.loading("Uploading, please wait...");
    try {
      const response = await axios.post("/api/design/single-design", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Design successfully added");
        resetForm();
      } else {
        toast.error("Failed to add design");
        throw new Error("Failed to create design");
      }
    } catch (error: unknown) {
      toast.dismiss();
      toast.error("Failed to add design");
    }
  }

  // Handle loading and unauthenticated states
  if (status === "loading") return <EditDesignSkeleton />;
  if (status === "unauthenticated") {
    router.push("/sign-in");
    return null;
  }

  return (
    <>
      <SidebarProvider>
        <Suspense fallback={<EditDesignSkeleton />}>
          <DashboardSidebar />
        </Suspense>
        <main className="w-full">
          <BreadCrumb />
          <div className="flex">
            <main className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex min-h-screen w-full flex-col">
                    <div className="flex flex-col sm:gap-4">
                      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
                        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                          <div className="flex items-center gap-4">
                            <Link href="/admin-dashboard/">
                              <Button
                                variant="outline"
                                type="button"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                              </Button>
                            </Link>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                              New Design
                            </h1>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                              <Button
                                variant="outline"
                                type="button"
                                onClick={resetForm}
                              >
                                Discard
                              </Button>
                              <Button size="sm" type="submit">
                                Save Design
                              </Button>
                            </div>
                          </div>
                          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                              <NewProductName />
                              <ProductCategoryAndTags />
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                              <ProductImage
                                image={image}
                                setImage={setImage}
                                error={warning}
                              />
                            </div>
                          </div>
                        </div>
                      </main>
                      <div className="mt-10 flex items-center justify-center gap-8 md:hidden">
                        <Button
                          variant="outline"
                          type="button"
                          size="sm"
                          onClick={resetForm}
                        >
                          Discard
                        </Button>
                        <Button size="sm" type="submit">
                          Save Design
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                <ToastContainer autoClose={3000} />
              </Form>
            </main>
          </div>
          <Suspense fallback={<div>Loading footer...</div>}>
            <Footer />
          </Suspense>
        </main>
      </SidebarProvider>
    </>
  );
}
