"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import logo from "@/images/hero/logo3.png";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  AtSign,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    await toast.promise(axios.post("/api/email/contact", data), {
      loading: "Sending your message...",
      success: () => {
        form.reset();
        return "Your message was successfully sent";
      },
      error: "Failed to send your message",
    });
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            <Sparkles className="mr-2 h-4 w-4" />
            Let&#39;s Connect
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Get in Touch with Our Creative Team
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Have a project in mind or just want to say hello? We&#39;d love to
            hear from you. Our team is ready to answer your questions and
            discuss your needs.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Info Card */}
          <div className="rounded-lg border p-4 md:col-span-2 md:p-8">
            <div className="h-full space-y-8">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center">
                  <Image
                    src={logo}
                    alt="Oylkka Graphics Logo"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">Oylkka Graphics</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Transforming ideas into visual masterpieces. Your vision, our
                  expertise.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Our Location</p>
                    <p className="text-sm text-muted-foreground">
                      Rofi Tower 4th Floor, Paira Chattra, Jhenaidah, Dhaka,
                      Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Phone Number</p>
                    <p className="text-sm text-muted-foreground">
                      +8801989-491248
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email Address</p>
                    <p className="text-sm text-muted-foreground">
                      contact@freelancermohon.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-sm font-medium">Working Hours</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Saturday - Thursday: 9:00 AM - 5:00 PM
                  <br />
                  Friday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3">
            <CardContent className="p-6 sm:p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="John Doe"
                                {...field}
                              />
                            </div>
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
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="+1 (555) 000-0000"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="you@example.com"
                              {...field}
                            />
                          </div>
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
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                              className="min-h-[150px] resize-none pl-10"
                              placeholder="How can we help you?"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="group w-full sm:w-auto"
                    size="lg"
                  >
                    <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
