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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineDashboard } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .max(15, "Password can not be more than 15 characters"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { status } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setSubmitting(true);
      toast.loading("Please wait...");
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      toast.dismiss();
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Successful sign-in");
        setTimeout(() => {
          router.back();
        }, 2000);
        return;
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {status === "loading" ? (
        "Loading..."
      ) : status === "authenticated" ? (
        <div className="flex h-60 flex-col items-center justify-center gap-8">
          <p>You are already logged in</p>
          <Link href="/">
            <Button className="flex items-center gap-2" size="lg">
              <MdOutlineDashboard size={20} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="my-10 flex items-center justify-center">
          <div className="grid w-11/12 grid-cols-1 justify-around rounded-2xl border shadow-2xl md:w-10/12 md:grid-cols-5 lg:w-8/12">
            <div className="col-span-3 bg-secondary md:rounded-l-2xl">
              <section className="my-8 flex flex-col items-center justify-center gap-4">
                <p className="text-3xl font-bold">Sign In</p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-10/12 space-y-3 lg:w-8/12"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <Button
                        type="submit"
                        className="mt-4 w-full"
                        disabled={submitting}
                      >
                        Sign In
                      </Button>
                    </div>
                    {/* Google Sign-In Button */}
                    <div className="mt-4">
                      <Button
                        className="w-full"
                        variant="outline"
                        type="button"
                        onClick={() => signIn("google")}
                      >
                        Sign in with Google
                      </Button>
                    </div>
                  </form>
                </Form>

                <div className="text-center md:hidden">
                  <p>Don&#39;t have an account?</p>
                  <Link href="/sign-up" className="font-semibold text-primary">
                    Sign Up
                  </Link>
                </div>
              </section>
            </div>
            <div className="col-span-2 hidden flex-col items-center justify-center gap-4 p-3 text-center md:flex md:rounded-r-2xl lg:p-16">
              <span className="text-lightgray-100 text-3xl font-bold">
                Hi, There!
              </span>
              <span className="flex h-1 w-20 rounded-full"></span>
              <span className="my-4">
                New to MHN Graphics? Let&#39;s create a free account to start
                your journey with us.
              </span>
              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
