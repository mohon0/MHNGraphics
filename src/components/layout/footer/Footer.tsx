"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Zap,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Logo from "../Header/logo";

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
    <footer className="relative mt-10 overflow-hidden bg-black">
      {/* Neon Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        {/* Neon Glow Effects */}
        <div className="absolute top-20 left-20 h-64 w-64 animate-pulse rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute right-20 bottom-20 h-64 w-64 animate-pulse rounded-full bg-pink-500/10 blur-3xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-cyan-500/20 shadow-[0_1px_0_0_rgba(6,182,212,0.1)]">
          <div className="container px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Zap className="mr-2 h-4 w-4" />
                Newsletter
              </Badge>

              <h2 className="mb-3 text-xl font-medium text-white [text-shadow:0_0_20px_rgba(6,182,212,0.5)] sm:text-2xl">
                Stay <span className="text-cyan-400">Inspired</span>
              </h2>

              <p className="mt-3 mb-6 text-gray-400">
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
                              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-cyan-400/70" />
                              <Input
                                placeholder="Your email address"
                                className="h-11 border-cyan-500/30 bg-gray-900/50 pl-10 text-white placeholder:text-gray-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg">
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                <div className="text-white [filter:drop-shadow(0_0_10px_rgba(6,182,212,0.3))]">
                  <Logo fixed />
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Transforming ideas into visual masterpieces. Your vision, our
                  expertise.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group w-full border-purple-500/30 bg-gray-900/50 text-purple-400 transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] sm:w-auto"
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
                <h3 className="mb-6 text-sm font-medium tracking-wider text-cyan-400 uppercase [text-shadow:0_0_10px_rgba(6,182,212,0.5)]">
                  Services
                </h3>
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
                        className="group flex items-center text-sm text-gray-400 transition-all duration-300 hover:text-cyan-400 hover:[text-shadow:0_0_10px_rgba(6,182,212,0.5)]"
                      >
                        <ChevronRight className="mr-2 h-3 w-3 text-gray-600 transition-colors group-hover:text-cyan-400" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="mb-6 text-sm font-medium tracking-wider text-pink-400 uppercase [text-shadow:0_0_10px_rgba(236,72,153,0.5)]">
                  Company
                </h3>
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
                        className="group flex items-center text-sm text-gray-400 transition-all duration-300 hover:text-pink-400 hover:[text-shadow:0_0_10px_rgba(236,72,153,0.5)]"
                      >
                        <ChevronRight className="mr-2 h-3 w-3 text-gray-600 transition-colors group-hover:text-pink-400" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Links Column */}
            <div>
              <h3 className="mb-6 text-sm font-medium tracking-wider text-purple-400 uppercase [text-shadow:0_0_10px_rgba(168,85,247,0.5)]">
                Connect
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/www.md.mohon",
                    label: "Facebook",
                    color:
                      "hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
                  },
                  {
                    icon: Twitter,
                    href: "https://www.twitter.com/mohongraphics",
                    label: "Twitter",
                    color:
                      "hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/mohongraphics",
                    label: "Instagram",
                    color:
                      "hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/mohongraphics",
                    label: "LinkedIn",
                    color:
                      "hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
                  },
                  {
                    icon: Github,
                    href: "https://www.github.com/mohon01",
                    label: "GitHub",
                    color:
                      "hover:text-gray-300 hover:shadow-[0_0_20px_rgba(156,163,175,0.5)]",
                  },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-md border border-gray-700 bg-gray-900/50 text-gray-400 transition-all duration-300 hover:scale-110 hover:border-gray-500 ${social.color}`}
                    aria-label={`${social.label} profile`}
                  >
                    <social.icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12">
            <Separator className="mb-8 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Oylkka Graphics. All rights
                reserved.
              </p>
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-xs text-gray-500 transition-all duration-300 hover:text-cyan-400 hover:[text-shadow:0_0_10px_rgba(6,182,212,0.5)]"
                    >
                      {item}
                    </Link>
                  ),
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
