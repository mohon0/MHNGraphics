"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function Footer() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await toast.promise(
      axios.post("/api/dashboard/subscribe", { email: data.email }),
      {
        loading: "Subscribing...",
        success: () => {
          form.reset();
          return "Successfully subscribed!";
        },
        error: (error) => {
          if (error.response?.status === 409) {
            return "Email already subscribed";
          }
          return error.response?.data?.message || "Something went wrong";
        },
      },
    );
  }

  return (
    <footer className="mt-10 bg-background">
      {/* Newsletter Section */}
      <div className="border-y bg-muted/20">
        <div className="container px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-medium sm:text-2xl">Stay Inspired</h2>
            <p className="mt-3 text-muted-foreground">
              Join our newsletter for the latest design trends and exclusive
              offers.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-sm">
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder="Your email address"
                              className="h-11 pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Subscribe
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-primary">
                MHN Graphics
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Transforming ideas into visual masterpieces. Your vision, our
                expertise.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2"
              >
                <Briefcase className="h-4 w-4" />
                <span>Hire Me</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Services and Company Columns - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {/* Services Column */}
            <div>
              <h3 className="mb-6 text-sm font-medium">Services</h3>
              <ul className="space-y-3">
                {[
                  { name: "Branding", href: "/services/branding" },
                  { name: "Web Design", href: "/services/web-design" },
                  { name: "Print Design", href: "/services/print-design" },
                  {
                    name: "Motion Graphics",
                    href: "/services/motion-graphics",
                  },
                  { name: "UI/UX", href: "/services/ui-ux" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronRight className="mr-2 h-3 w-3 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="mb-6 text-sm font-medium">Company</h3>
              <ul className="space-y-3">
                {[
                  { name: "About", href: "/about" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "Careers", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronRight className="mr-2 h-3 w-3 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links Column */}
          <div>
            <h3 className="mb-6 text-sm font-medium">Connect</h3>
            <div className="grid grid-cols-5 gap-3">
              {[
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/www.md.mohon",
                  label: "Facebook",
                },
                {
                  icon: Twitter,
                  href: "https://www.twitter.com/mohongraphics",
                  label: "Twitter",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/mohongraphics",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/mohongraphics",
                  label: "LinkedIn",
                },
                {
                  icon: Github,
                  href: "https://www.github.com/mohon01",
                  label: "GitHub",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label={`${social.label} profile`}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MHN Graphics. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
