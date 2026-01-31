'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  ChevronRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Send,
  Twitter,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Logo from '../Header/logo';
import { ThemeToggle } from './theme-toggle';

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function Footer() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await toast.promise(
      axios.post('/api/dashboard/subscribe', { email: data.email }),
      {
        loading: 'Subscribing...',
        success: () => {
          form.reset();
          return 'Successfully subscribed!';
        },
        error: (error) => {
          if (error.response?.status === 409) {
            return 'Email already subscribed';
          }
          return error.response?.data?.message || 'Something went wrong';
        },
      },
    );
  }

  return (
    <footer className='relative mt-10 overflow-hidden border-t bg-background'>
      {/* Subtle Grid Background */}
      <div className='absolute inset-0 opacity-50' aria-hidden='true'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem]'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background'></div>
      </div>

      <div className='relative z-10'>
        {/* Newsletter Section */}
        <div className='border-b border-border'>
          <div className='container px-4 py-12 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl text-center'>
              <Badge className='mb-4 border-primary bg-primary/10 text-primary'>
                <Zap className='mr-2 h-4 w-4' />
                Newsletter
              </Badge>

              <h2 className='mb-3 text-xl font-medium text-foreground sm:text-2xl'>
                Stay <span className='text-primary'>Inspired</span>
              </h2>

              <p className='mt-3 mb-6 text-muted-foreground'>
                Join our newsletter for the latest design trends and exclusive
                offers.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6'>
                  <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem className='w-full max-w-sm'>
                          <FormControl>
                            <div className='relative'>
                              <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                              <Input
                                placeholder='Your email address'
                                className='h-11 border-border bg-card pl-10'
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' size='lg'>
                      <Send className='mr-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                      Subscribe
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className='px-4 py-12 sm:px-6 lg:px-8 bg-accent/50'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12'>
            {/* Brand Column */}
            <div className='space-y-6'>
              <div>
                <Logo />
                <p className='mt-4 text-sm text-muted-foreground'>
                  Transforming ideas into visual masterpieces. Your vision, our
                  expertise. Let&apos;s create something extraordinary together.
                  Contact us to get started.
                </p>
              </div>
            </div>

            {/* Services and Company Columns */}
            <div className='grid grid-cols-2 gap-8 lg:col-span-2'>
              <div>
                <h3 className='mb-6 text-sm font-medium tracking-wider text-primary uppercase'>
                  Services
                </h3>
                <ul className='space-y-3'>
                  {[
                    { name: 'Branding', href: '/services/branding' },
                    { name: 'Web Design', href: '/services/web-design' },
                    { name: 'Print Design', href: '/services/print-design' },
                    {
                      name: 'Motion Graphics',
                      href: '/services/motion-graphics',
                    },
                    { name: 'UI/UX', href: '/services/ui-ux' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='group flex items-center text-sm text-muted-foreground hover:tracking-wider transition-all duration-300 hover:text-primary'
                      >
                        <ChevronRight className='mr-2 h-3 w-3 text-border transition-colors group-hover:text-primary' />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='mb-6 text-sm font-medium tracking-wider text-primary uppercase'>
                  Company
                </h3>
                <ul className='space-y-3'>
                  {[
                    { name: 'About', href: '/about' },
                    { name: 'Portfolio', href: '/portfolio' },
                    { name: 'Careers', href: '/careers' },
                    { name: 'Blog', href: '/blog' },
                    { name: 'Contact', href: '/contact' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='group flex items-center text-sm text-muted-foreground hover:tracking-wider transition-all duration-300 hover:text-primary'
                      >
                        <ChevronRight className='mr-2 h-3 w-3 text-border transition-colors group-hover:text-primary' />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Links Column */}
            <div>
              <h3 className='mb-6 text-sm font-medium tracking-wider text-primary uppercase'>
                Connect
              </h3>
              <div className='grid grid-cols-5 gap-3'>
                {[
                  {
                    icon: Facebook,
                    href: 'https://www.facebook.com/www.md.mohon',
                    label: 'Facebook',
                  },
                  {
                    icon: Twitter,
                    href: 'https://www.twitter.com/mohongraphics',
                    label: 'Twitter',
                  },
                  {
                    icon: Instagram,
                    href: 'https://www.instagram.com/mohongraphics',
                    label: 'Instagram',
                  },
                  {
                    icon: Linkedin,
                    href: 'https://linkedin.com/in/mohongraphics',
                    label: 'LinkedIn',
                  },
                  {
                    icon: Github,
                    href: 'https://www.github.com/mohon01',
                    label: 'GitHub',
                  },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary'
                    aria-label={`${social.label} profile`}
                  >
                    <social.icon className='h-5 w-5' aria-hidden='true' />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className='mt-12'>
            <Separator className='mb-8' />

            <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
              <div className='flex flex-col items-center gap-4 md:flex-row'>
                <p className='text-xs text-muted-foreground'>
                  © {new Date().getFullYear()} Oylkka IT. All rights reserved.
                </p>
                <div className='hidden h-4 w-[1px] bg-border md:block' />
                {/* Theme Switch Integration */}
                <ThemeToggle />
              </div>

              <nav className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className='text-xs text-muted-foreground transition-all duration-300 hover:text-primary'
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
