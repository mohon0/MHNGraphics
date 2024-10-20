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
import Image from "next/image";
import { useForm } from "react-hook-form";
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="mx-3 my-10 md:mx-10 lg:mx-32">
      <header className="text-center">
        <h2 className="my-4 text-4xl font-bold">Contact With Me</h2>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
        <article className="white-bg dark:dark-bg col-span-1 rounded-lg p-4 md:col-span-5 md:p-6">
          <Image
            src={img}
            alt="Sejar Parvez"
            className="h-40 w-full rounded object-cover md:h-56"
          />
          <p className="mb-2 mt-4 text-3xl font-bold">Md. Mohon</p>
          <p className="mb-4 text-muted-foreground">
            Feel free to get in touch with me for any inquiries, feedback, or
            assistance. I am dedicated to providing excellent service and am
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
            className="dark:dark-bg col-span-1 flex flex-col rounded-lg bg-slate-50 p-4 md:col-span-7 md:p-6"
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

            <Button
              type="submit"
              aria-label="send message"
              title="send message"
              className="mt-10"
            >
              SEND MESSAGE
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
