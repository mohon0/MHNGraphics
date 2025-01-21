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
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdHome, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { SiPolkadot } from "react-icons/si";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10,15}$/.test(value),
      {
        message: "Must be a valid email or phone number.",
      },
    ),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .max(15, "Password can not be more than 15 characters"),
  code: z.string().optional(),
});

export default function Registration() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [userId, setUserId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setSubmitting(true);

    try {
      if (showPopUp) {
        // If the pop-up is shown, verify the code entered by the user
        const response = await toast.promise(
          axios.put("/api/signup", {
            userId,
            code: values.code,
          }),
          {
            pending: "Verifying the code",
            success: "Code verified successfully 👍",
            error: "Invalid code. Please try again 🤯",
          },
        );

        if (response.status === 200) {
          setTimeout(() => {
            router.push("/sign-in");
          }, 1000);
        }
      } else {
        // Check if the input is an email
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);

        if (isEmail) {
          // If email is valid, send the email verification request
          const response = await toast
            .promise(
              axios.post("/api/signup", values), // This sends the email for verification
              {
                pending: "Sending the verification code",
                success: "Email sent successfully 👌",
                error: "An error occurred",
              },
            )
            .catch((error) => {
              toast.error(error.response.data);
            });

          if (response && response.status === 200) {
            setUserId(response.data.userId);
            setShowPopUp(true);
            setReadOnly(true); // Disable input until the code is verified
          }
        } else {
          // If it's not a valid email, handle as a normal registration process
          const response = await toast
            .promise(axios.post("/api/signup", values), {
              pending: "Processing registration",
              success: "Registration successful 👌",
              error: "An error occurred",
            })
            .catch((error) => {
              toast.error(error.response.data);
            });

          if (response && response.status === 200) {
            toast.success("User registered successfully! Redirecting...");
            setTimeout(() => {
              router.push("/sign-in");
            }, 1000);
          }
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    }

    setSubmitting(false);
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
              <MdHome size={20} />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-10 flex items-center justify-center"
          >
            <div className="grid w-11/12 grid-cols-1 justify-around rounded-2xl border shadow-lg md:grid-cols-5 lg:w-8/12">
              <div className="col-span-3 bg-muted p-4 md:rounded-l-2xl">
                <section className="flex flex-col items-center justify-center md:my-8">
                  <h1 className="text-center text-xl font-bold underline md:text-3xl">
                    Create New Account
                  </h1>
                  <span className="flex h-1 w-20 rounded-full"></span>

                  <div className="my-6 flex w-full flex-col gap-3 md:w-2/3">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Name"
                              {...field}
                              disabled={readOnly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email / Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email or Phone Number"
                              {...field}
                              disabled={readOnly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Field with Toggle */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                {...field}
                                disabled={readOnly}
                              />
                              <span
                                className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <MdVisibilityOff size={20} />
                                ) : (
                                  <MdVisibility size={20} />
                                )}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Verification Code Field */}
                    {showPopUp && (
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Submit Button */}
                    <Button type="submit" disabled={submitting}>
                      {showPopUp ? "Verify Code" : "Sign Up"}
                    </Button>
                  </div>
                </section>

                {/* Additional Links */}
                <div className="space-x-1 text-center md:hidden">
                  <span>Already have an account?</span>
                  <Link href={"/sign-in"} className="font-bold text-primary">
                    Sign In
                  </Link>
                </div>
                <div className="mt-10 flex items-center justify-center gap-4 text-muted-foreground">
                  <Link href={"/policy"}>Privacy Policy</Link>
                  <SiPolkadot />
                  <Link href={"/terms"}>Terms & Conditions</Link>
                </div>
              </div>

              {/* Right Panel */}
              <div className="col-span-2 hidden flex-col items-center justify-center gap-4 p-2 text-center md:flex md:rounded-r-2xl lg:p-16">
                <span className="text-lightgray-100 text-3xl font-bold">
                  Hi, There!
                </span>
                <span className="bg-lightgray-100 flex h-1 w-20 rounded-full"></span>
                <span className="text-darkgray-100 my-4">
                  Already have an account?
                </span>
                <Link href="/sign-in">
                  <Button className="px-10">Sign In</Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
