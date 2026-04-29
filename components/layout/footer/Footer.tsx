'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-react';
import axios from 'axios';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Logo from '../Header/logo';
import { ThemeToggle } from './theme-toggle';

// ── Data ──────────────────────────────────────────────────────────────────────

const nav = [
  {
    label: 'Services',
    links: [
      { label: 'Branding', href: '/services/branding' },
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Print Design', href: '/services/print-design' },
      { label: 'Motion Graphics', href: '/services/motion-graphics' },
      { label: 'UI/UX', href: '/services/ui-ux' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
];

const social = [
  {
    icon: IconBrandFacebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/www.md.mohon',
  },
  {
    icon: IconBrandTwitter,
    label: 'Twitter / X',
    href: 'https://www.twitter.com/mohongraphics',
  },
  {
    icon: IconBrandInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/mohongraphics',
  },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/mohongraphics',
  },
  {
    icon: IconBrandGithub,
    label: 'GitHub',
    href: 'https://www.github.com/mohon01',
  },
];

// ── Newsletter schema ─────────────────────────────────────────────────────────

const schema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

// ── Newsletter strip ──────────────────────────────────────────────────────────

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: FormData) => {
    await toast.promise(
      axios.post('/api/dashboard/subscribe', { email: data.email }),
      {
        loading: 'Subscribing…',
        success: () => {
          setSubscribed(true);
          reset();
          return 'Successfully subscribed!';
        },
        error: (err) => {
          const msg =
            err?.response?.status === 409
              ? 'Email already subscribed'
              : (err?.response?.data?.message ?? 'Something went wrong');
          setError('email', { message: msg });
          return msg;
        },
      },
    );
  };

  return (
    <div className='border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          {/* Left — eyebrow + heading + subtext */}
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <div className='h-px w-8 bg-primary' />
              <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
                Newsletter
              </span>
            </div>
            <h3 className='text-2xl md:text-3xl font-bold tracking-tight leading-tight'>
              Stay{' '}
              <span className='italic font-bold text-primary'>Inspired</span>
              <span className='text-primary'>.</span>
            </h3>
            <p className='text-sm text-muted-foreground leading-relaxed max-w-sm'>
              Join our newsletter for the latest design trends and exclusive
              offers.
            </p>
          </div>

          {/* Right — form or success */}
          {subscribed ? (
            <div className='flex items-center gap-3 rounded-2xl border border-border px-5 py-4'>
              <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                <CheckCircle2 className='w-4 h-4 text-primary' />
              </div>
              <div>
                <p className='text-sm font-semibold'>You&apos;re subscribed!</p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  We&apos;ll be in touch soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col sm:flex-row gap-3'>
                <Field className='flex-1' data-invalid={!!errors.email}>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    className='h-11 rounded-xl'
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
                <Button
                  type='submit'
                  className='h-11 px-6 gap-2 whitespace-nowrap self-start'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Send className='w-4 h-4' />
                  )}
                  {isSubmitting ? 'Subscribing…' : 'Subscribe'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className='bg-background border-t border-border'>
      {/* Newsletter strip */}
      <Newsletter />

      {/* Main content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12'>
          {/* ── Brand column (col-span-2) ── */}
          <div className='col-span-2 space-y-6'>
            {/* Logo — keep existing Logo component */}
            <Logo />

            {/* Tagline */}
            <p className='text-sm text-muted-foreground leading-relaxed max-w-xs'>
              Transforming ideas into visual masterpieces. Your vision, our
              expertise. Let&apos;s create something extraordinary together.
            </p>

            {/* Social icons */}
            <div className='flex items-center gap-2'>
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='w-9 h-9 rounded-xl border border-border flex items-center justify-center
                    text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5
                    transition-all duration-200'
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {nav.map((col) => (
            <div key={col.label}>
              {/* Column header — eyebrow rule (w-5 in footer) */}
              <div className='flex items-center gap-2.5 mb-5'>
                <div className='h-px w-5 bg-primary' />
                <span className='text-[10px] font-semibold tracking-[0.2em] uppercase text-primary'>
                  {col.label}
                </span>
              </div>
              <ul className='space-y-3'>
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className='text-sm text-muted-foreground hover:text-primary transition-colors duration-200'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className='border-t border-border pt-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <p className='text-xs text-muted-foreground'>
              © {new Date().getFullYear()} Oylkka IT. All rights reserved.
            </p>
            <ThemeToggle />

            {/* Trust badges — dot separator pattern */}
            <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
              <span className='w-1 h-1 rounded-full bg-primary/50' />
              <span>Quality Design</span>
              <span className='w-1 h-1 rounded-full bg-primary/50 ml-1' />
              <span>Trusted by Clients</span>
              <span className='w-1 h-1 rounded-full bg-primary/50 ml-1' />
              <span>5★ Rated</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
