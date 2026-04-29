'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  AtSign,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// ── Schema ────────────────────────────────────────────────────────────────────

const FormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormData = z.infer<typeof FormSchema>;

// ── Contact info data ─────────────────────────────────────────────────────────

const contactItems = [
  {
    icon: MapPin,
    label: 'Our Location',
    value: 'Rofi Tower 5th Floor, Paira Chattra, Jhenaidah, Dhaka, Bangladesh',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone Number',
    value: '+8801989-491248',
    href: 'tel:+8801989491248',
  },
  {
    icon: Mail,
    label: 'Email Address',
    value: 'contact@oylkka.com',
    href: 'mailto:contact@oylkka.com',
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: '', phoneNumber: '', email: '', message: '' },
  });

  async function onSubmit(data: FormData) {
    toast.promise(axios.post('/api/email/contact', data), {
      loading: 'Sending your message…',
      success: () => {
        reset();
        setSent(true);
        return 'Message sent successfully!';
      },
      error: 'Failed to send your message.',
    });
  }

  return (
    <section className='min-h-screen bg-background max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16'>
      {/* ── Hero header ──────────────────────────────────────────────────── */}
      <div>
        {/* Eyebrow */}
        <div className='flex items-center gap-3 mb-6'>
          <div className='h-px w-10 bg-primary' />
          <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
            Contact
          </span>
        </div>

        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-2xl'>
          Let&apos;s{' '}
          <span className='italic font-bold text-primary'>create</span>{' '}
          something great
          <span className='text-primary'>.</span>
        </h1>

        <p className='mt-6 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl'>
          Have a project in mind or just want to say hello? Our team is ready to
          answer your questions and discuss your needs.
        </p>
      </div>

      {/* ── Main grid ────────────────────────────────────────────────────── */}

      <div className='grid lg:grid-cols-5 gap-12 lg:gap-20 items-start'>
        {/* ── Info column (2 cols) ──────────────────────────────────────── */}
        <div className='lg:col-span-2 space-y-10'>
          {/* Brand block */}
          <div className='space-y-4'>
            <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center'>
              <Image
                src={logo}
                alt='Oylkka IT'
                width={24}
                height={24}
                className='rounded'
              />
            </div>
            <div>
              <h2 className='text-base font-bold leading-snug'>Oylkka IT</h2>
              <div className='flex items-center gap-2 mt-2'>
                <div className='h-px w-5 bg-primary/40' />
                <span className='text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60'>
                  Design Studio
                </span>
              </div>
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed max-w-xs'>
              Transforming ideas into visual masterpieces. Your vision, our
              expertise.
            </p>
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-border' />

          {/* Contact items */}
          <div className='space-y-6'>
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className='flex items-start gap-4'>
                {/* Icon container — same as feature card */}
                <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                  <Icon className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-1'>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className='text-sm text-foreground hover:text-primary transition-colors duration-200 leading-relaxed'
                    >
                      {value}
                    </a>
                  ) : (
                    <p className='text-sm text-foreground leading-relaxed'>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-border' />

          {/* Working hours */}
          <div>
            <div className='flex items-center gap-2.5 mb-4'>
              <div className='h-px w-5 bg-primary' />
              <span className='text-[10px] font-semibold tracking-[0.2em] uppercase text-primary'>
                Working Hours
              </span>
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Saturday – Thursday: 9:00 AM – 5:00 PM
              <br />
              Friday: Closed
            </p>
          </div>
        </div>

        {/* ── Form column (3 cols) ──────────────────────────────────────── */}
        <div className='lg:col-span-3'>
          <div className='rounded-2xl border border-border p-6 sm:p-8'>
            {/* Form header */}
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-px w-8 bg-primary' />
                <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
                  Send a Message
                </span>
              </div>
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight leading-tight'>
                We&apos;d love to{' '}
                <span className='italic font-light text-muted-foreground'>
                  hear
                </span>{' '}
                from you
                <span className='text-primary'>.</span>
              </h2>
            </div>

            {sent ? (
              /* ── Success state ── */
              <div className='flex items-start gap-4 rounded-2xl border border-border px-6 py-5'>
                <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                  <Send className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-base font-bold leading-snug'>
                    Message sent!
                  </p>
                  <p className='text-sm text-muted-foreground mt-1 leading-relaxed'>
                    Thanks for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSent(false)}
                    className='mt-4 text-xs font-semibold tracking-[0.15em] uppercase text-primary hover:opacity-70 transition-opacity duration-200'
                  >
                    Send another →
                  </Button>
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                {/* Name + Phone row */}
                <div className='grid sm:grid-cols-2 gap-5'>
                  <Field data-invalid={!!errors.username}>
                    <Label
                      htmlFor='username'
                      className='text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5 block'
                    >
                      Full Name
                    </Label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                      <Input
                        id='username'
                        placeholder='Your Full Name'
                        className='h-11 rounded-xl pl-10'
                        disabled={isSubmitting}
                        {...register('username')}
                      />
                    </div>
                    {errors.username && (
                      <FieldError>{errors.username.message}</FieldError>
                    )}
                  </Field>

                  <Field data-invalid={!!errors.phoneNumber}>
                    <Label
                      htmlFor='phoneNumber'
                      className='text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5 block'
                    >
                      Phone Number
                    </Label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                      <Input
                        id='phoneNumber'
                        placeholder='+8801XXXXXXXXX'
                        className='h-11 rounded-xl pl-10'
                        disabled={isSubmitting}
                        {...register('phoneNumber')}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <FieldError>{errors.phoneNumber.message}</FieldError>
                    )}
                  </Field>
                </div>

                {/* Email */}
                <Field data-invalid={!!errors.email}>
                  <Label
                    htmlFor='email'
                    className='text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5 block'
                  >
                    Email Address
                  </Label>
                  <div className='relative'>
                    <AtSign className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    <Input
                      id='email'
                      type='email'
                      placeholder='you@example.com'
                      className='h-11 rounded-xl pl-10'
                      disabled={isSubmitting}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                {/* Message */}
                <Field data-invalid={!!errors.message}>
                  <Label
                    htmlFor='message'
                    className='text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5 block'
                  >
                    Your Message
                  </Label>
                  <div className='relative'>
                    <MessageSquare className='absolute left-3 top-3.5 w-4 h-4 text-muted-foreground' />
                    <Textarea
                      id='message'
                      placeholder='How can we help you?'
                      className='min-h-37.5 resize-none rounded-xl pl-10'
                      disabled={isSubmitting}
                      {...register('message')}
                    />
                  </div>
                  {errors.message && (
                    <FieldError>{errors.message.message}</FieldError>
                  )}
                </Field>

                {/* Submit */}
                <div className='pt-1'>
                  <Button
                    type='submit'
                    size='lg'
                    className='h-12 px-8 gap-2'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      <Send className='w-4 h-4' />
                    )}
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
