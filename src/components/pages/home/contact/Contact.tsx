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
import { Textarea } from "@/components/ui/textarea";
import img from "@/images/contact1.png";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.loading("Please wait...");

    try {
      const response = await axios.post("/api/email/contact", data);

      toast.dismiss();
      if (response.status === 200) {
        toast.success("Design successfully added");
        // form.reset();
      } else {
        toast.error("Failed to create design");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to submit the form");
    }
  }

  return (
    <div className="mx-2 my-10 md:mx-10 lg:mx-32">
      <header className="text-center">
        <h2 className="my-4 text-2xl font-bold md:text-4xl">Contact With Us</h2>
      </header>

      <div className="grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-12 md:gap-10">
        <article className="col-span-1 rounded-lg bg-secondary p-2 md:col-span-5 md:p-6">
          <Image
            src={img}
            alt="MHN Graphics"
            className="h-40 w-full rounded object-cover md:h-56"
          />
          <p className="mb-2 mt-4 text-xl font-bold md:text-3xl">
            MHN Graphics
          </p>
          <p className="mb-4 text-muted-foreground">
            Feel free to get in touch with use for any inquiries, feedback, or
            assistance. We are dedicated to providing excellent service and am
            eager to hear from you.
          </p>
          <p>
            Address: Rofi Tower 4th Floor, Paira Chattra, Jhenaidah, Dhaka,
            Bangladesh
          </p>
          <p>Phone: +8801989-491248</p>
          <p>Email: contact@freelancermohon.com</p>
        </article>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="col-span-1 flex flex-col rounded-lg bg-secondary p-2 md:col-span-7 md:p-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-40"
                      placeholder="Your Message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-10">
              SEND MESSAGE
            </Button>
          </form>
        </Form>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
