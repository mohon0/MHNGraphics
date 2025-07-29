'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdHome, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { SiPolkadot } from 'react-icons/si';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignUpSchema } from '@/lib/Schemas';
import { useRegisterMutation, useVerifyCodeMutation } from '@/services/auth';

export default function Registration() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [userId, setUserId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      code: '',
    },
  });

  const registerMutation = useRegisterMutation();
  const verifyCodeMutation = useVerifyCodeMutation();

  // Handle successful registration
  // biome-ignore lint: error
  const handleRegisterSuccess = (response: any) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.getValues().email);

    if (isEmail) {
      setUserId(response.data.userId);
      setShowPopUp(true);
      setReadOnly(true);
    } else {
      setTimeout(() => {
        router.push('/sign-in');
      }, 1000);
    }
  };

  // Handle successful verification
  const handleVerifySuccess = () => {
    setTimeout(() => {
      router.push('/sign-in');
    }, 1000);
  };

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    if (showPopUp && values.code) {
      // Verify code
      verifyCodeMutation.mutate(
        {
          userId,
          code: values.code,
        },
        {
          onSuccess: handleVerifySuccess,
        },
      );
    } else {
      // Register user
      registerMutation.mutate(values, {
        onSuccess: handleRegisterSuccess,
      });
    }
  }

  const isSubmitting =
    registerMutation.isPending || verifyCodeMutation.isPending;

  return (
    <>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'authenticated' ? (
        <div className='flex h-60 flex-col items-center justify-center gap-8'>
          <p>You are already logged in</p>
          <Link href='/'>
            <Button className='flex items-center gap-2' size='lg'>
              <MdHome size={20} />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='my-10 flex items-center justify-center'
          >
            <div className='grid w-11/12 grid-cols-1 justify-around rounded-2xl border shadow-lg md:grid-cols-5 lg:w-8/12'>
              <div className='col-span-3 bg-muted p-4 md:rounded-l-2xl'>
                <section className='flex flex-col items-center justify-center md:my-8'>
                  <h1 className='text-center text-xl font-bold underline md:text-3xl'>
                    Create New Account
                  </h1>
                  <span className='flex h-1 w-20 rounded-full'></span>

                  <div className='my-6 flex w-full flex-col gap-3 md:w-2/3'>
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Name'
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
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email / Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Email or Phone Number'
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
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
                                {...field}
                                disabled={readOnly}
                              />
                              <button
                                type='button'
                                className='absolute inset-y-0 right-3 flex cursor-pointer items-center'
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <MdVisibilityOff size={20} />
                                ) : (
                                  <MdVisibility size={20} />
                                )}
                              </button>
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
                        name='code'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                              <Input placeholder='Code' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Submit Button */}
                    <Button type='submit' disabled={isSubmitting}>
                      {showPopUp ? 'Verify Code' : 'Sign Up'}
                    </Button>
                  </div>
                </section>

                {/* Additional Links */}
                <div className='space-x-1 text-center md:hidden'>
                  <span>Already have an account?</span>
                  <Link href={'/sign-in'} className='font-bold text-primary'>
                    Sign In
                  </Link>
                </div>
                <div className='mt-10 flex items-center justify-center gap-4 text-muted-foreground'>
                  <Link href={'/policy'}>Privacy Policy</Link>
                  <SiPolkadot />
                  <Link href={'/terms'}>Terms & Conditions</Link>
                </div>
              </div>

              {/* Right Panel */}
              <div className='col-span-2 hidden flex-col items-center justify-center gap-4 p-2 text-center md:flex md:rounded-r-2xl lg:p-16'>
                <span className='text-lightgray-100 text-3xl font-bold'>
                  Hi, There!
                </span>
                <span className='bg-lightgray-100 flex h-1 w-20 rounded-full'></span>
                <span className='text-darkgray-100 my-4'>
                  Already have an account?
                </span>
                <Link href='/sign-in'>
                  <Button className='px-10'>Sign In</Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
