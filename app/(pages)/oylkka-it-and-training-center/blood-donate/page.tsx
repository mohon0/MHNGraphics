'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Droplets, Phone, Upload, User } from 'lucide-react';
import type React from 'react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bangladeshDistricts } from '@/constant/District';
import Header from './Header';
import MemberModel, { MemberModelData } from './MemberModel';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: custom },
  }),
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fileSizeValidator = (maxSizeInKB: number) => (file: File) => {
  const fileSizeKB = file.size / 1024;
  if (fileSizeKB > maxSizeInKB) {
    return `File size must be less than ${maxSizeInKB} KB`;
  }
  return true;
};

const FormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' }),
  allergies: z.enum(['Yes', 'No']),
  donatedBefore: z.enum(['Yes', 'No']),
  diseases: z.enum(['Yes', 'No']),
  district: z.string().min(1),
  birthDay: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      'Date must be in the format DD/MM/YYYY',
    ),
  bloodGroup: z.string().min(1),
  address: z.string().min(2),
  Occupation: z.string().min(1),
  number: z.string().regex(/^(?:\+?88)?01[0-9]{9}$/, {
    message: 'Must be a valid 11-digit phone number',
  }),
  number2: z.string().optional(),
});

export default function BloodDonation() {
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-60px' });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      district: '',
      birthDay: '',
      bloodGroup: '',
      Occupation: '',
      address: '',
      number: '',
      number2: '',
    },
  });

  const MAX_IMAGE_SIZE_KB = 100;
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isFileSizeValid = fileSizeValidator(MAX_IMAGE_SIZE_KB)(file);
      if (isFileSizeValid === true) {
        setImage(file);
        setImageError(false);
      } else {
        setImage(null);
        setImageError(true);
        toast.error(`Image size must be less than 100KB`);
      }
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();

    if (imageError) {
      toast.error('Image size must be less than 100KB');
      return;
    }

    if (image) {
      formData.append('image', image);
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    toast
      .promise(axios.post('/api/best-computer/blood-bank', formData), {
        loading: 'Please wait...',
        success: 'Form has been successfully submitted',
        error: 'Failed to submit form',
      })
      .unwrap()
      .then(() => {
        form.reset();
        setImage(null);
        location.reload();
      });
  }

  return (
    <div className='bg-background'>
      <Header />

      {/* Registration Form Section */}
      <section
        ref={formRef}
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-b border-border'
      >
        {/* Eyebrow */}
        <motion.div
          initial='hidden'
          animate={formInView ? 'show' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className='flex items-center gap-3 mb-5'
        >
          <div className='h-px w-10 bg-primary' />
          <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
            Registration
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial='hidden'
          animate={formInView ? 'show' : 'hidden'}
          variants={fadeUp}
          custom={0.1}
          className='text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6'
        >
          Donor{' '}
          <span className='italic font-light text-muted-foreground'>
            Information
          </span>
          <span className='text-primary'>.</span>
        </motion.h2>

        {/* Body text */}
        <motion.p
          initial='hidden'
          animate={formInView ? 'show' : 'hidden'}
          variants={fadeUp}
          custom={0.15}
          className='text-base text-muted-foreground leading-relaxed max-w-2xl mb-10'
        >
          Please fill out all required fields accurately to register as a blood
          donor.
        </motion.p>

        {/* Form Card */}
        <motion.div
          initial='hidden'
          animate={formInView ? 'show' : 'hidden'}
          variants={fadeUp}
          custom={0.2}
        >
          <Card className='rounded-2xl border border-border overflow-hidden'>
            <CardContent className='p-8 md:p-10'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  {/* Personal Information Section */}
                  <div className='space-y-5'>
                    <div className='flex items-center gap-3 pb-5 border-b border-border'>
                      <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                        <User className='w-5 h-5 text-primary' />
                      </div>
                      <span className='text-sm font-semibold tracking-wide uppercase text-foreground'>
                        Personal Information
                      </span>
                    </div>

                    <div className='grid gap-5 md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='fullName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your full name'
                                {...field}
                                className='rounded-xl border-border focus:border-primary focus:ring-primary'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='birthDay'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Date of Birth (DD/MM/YYYY)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='01/01/1990'
                                {...field}
                                className='rounded-xl border-border focus:border-primary focus:ring-primary'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='bloodGroup'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Blood Group
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className='rounded-xl border-border focus:border-primary focus:ring-primary'>
                                  <SelectValue placeholder='Select your blood group' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[
                                  'A+',
                                  'A-',
                                  'B+',
                                  'B-',
                                  'AB+',
                                  'AB-',
                                  'O+',
                                  'O-',
                                ].map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='Occupation'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Occupation
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your occupation'
                                {...field}
                                className='rounded-xl border-border focus:border-primary focus:ring-primary'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className='space-y-5 pt-4 border-t border-border'>
                    <div className='flex items-center gap-3 pb-5 border-b border-border'>
                      <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                        <Phone className='w-5 h-5 text-primary' />
                      </div>
                      <span className='text-sm font-semibold tracking-wide uppercase text-foreground'>
                        Contact Information
                      </span>
                    </div>

                    <div className='grid gap-5 md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='number'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Mobile Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='01700000023'
                                {...field}
                                className='rounded-xl border-border focus:border-primary focus:ring-primary'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='number2'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Mobile Number 2 (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Optional'
                                {...field}
                                className='rounded-xl border-border focus:border-primary focus:ring-primary'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                          <FormItem className='md:col-span-2'>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Full Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your full address'
                                {...field}
                                className='rounded-xl border-border focus:border-primary focus:ring-primary'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='district'
                        render={({ field }) => (
                          <FormItem className='md:col-span-2'>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              District
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className='rounded-xl border-border focus:border-primary focus:ring-primary'>
                                  <SelectValue placeholder='Select your district' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='max-h-50'>
                                {bangladeshDistricts.map((district) => (
                                  <SelectItem key={district} value={district}>
                                    {district}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Medical Information Section */}
                  <div className='space-y-5 pt-4 border-t border-border'>
                    <div className='flex items-center gap-3 pb-5 border-b border-border'>
                      <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
                        <Droplets className='w-5 h-5 text-primary' />
                      </div>
                      <span className='text-sm font-semibold tracking-wide uppercase text-foreground'>
                        Medical Information
                      </span>
                    </div>

                    <div className='grid gap-6 md:grid-cols-3'>
                      <FormField
                        control={form.control}
                        name='donatedBefore'
                        render={({ field }) => (
                          <FormItem className='space-y-3'>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Donated Before?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem
                                    value='Yes'
                                    id='donated-yes'
                                  />
                                  <Label
                                    htmlFor='donated-yes'
                                    className='text-sm text-muted-foreground cursor-pointer'
                                  >
                                    Yes
                                  </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem value='No' id='donated-no' />
                                  <Label
                                    htmlFor='donated-no'
                                    className='text-sm text-muted-foreground cursor-pointer'
                                  >
                                    No
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='allergies'
                        render={({ field }) => (
                          <FormItem className='space-y-3'>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Have Allergies?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem
                                    value='Yes'
                                    id='allergies-yes'
                                  />
                                  <Label
                                    htmlFor='allergies-yes'
                                    className='text-sm text-muted-foreground cursor-pointer'
                                  >
                                    Yes
                                  </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem
                                    value='No'
                                    id='allergies-no'
                                  />
                                  <Label
                                    htmlFor='allergies-no'
                                    className='text-sm text-muted-foreground cursor-pointer'
                                  >
                                    No
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='diseases'
                        render={({ field }) => (
                          <FormItem className='space-y-3'>
                            <FormLabel className='text-sm font-medium text-foreground'>
                              Have Diseases?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem
                                    value='Yes'
                                    id='diseases-yes'
                                  />
                                  <Label
                                    htmlFor='diseases-yes'
                                    className='text-sm text-muted-foreground cursor-pointer'
                                  >
                                    Yes
                                  </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem value='No' id='diseases-no' />
                                  <Label
                                    htmlFor='diseases-no'
                                    className='text-sm text-muted-foreground cursor-pointer'
                                  >
                                    No
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className='space-y-4 pt-4 border-t border-border'>
                    <Label
                      htmlFor='picture'
                      className='text-sm font-medium text-foreground flex items-center gap-2'
                    >
                      <Upload className='w-4 h-4 text-muted-foreground' />
                      Profile Picture (Optional)
                    </Label>
                    <Label
                      htmlFor='picture'
                      className='flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 transition-all hover:border-primary hover:bg-muted/50'
                    >
                      {image ? (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className='text-center'
                        >
                          <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3'>
                            <CheckCircle2 className='w-5 h-5 text-primary' />
                          </div>
                          <p className='text-sm font-medium text-foreground'>
                            Image selected
                          </p>
                          <p className='text-xs text-muted-foreground mt-1'>
                            {image.name}
                          </p>
                        </motion.div>
                      ) : (
                        <>
                          <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3'>
                            <Upload className='w-5 h-5 text-primary' />
                          </div>
                          <p className='text-sm font-medium text-foreground'>
                            Upload Image
                          </p>
                          <p className='text-xs text-muted-foreground mt-1'>
                            Max 100KB
                          </p>
                        </>
                      )}
                    </Label>
                    <input
                      id='picture'
                      type='file'
                      onChange={handleFileChange}
                      className='hidden'
                      accept='image/*'
                    />
                  </div>

                  {/* Submit Button */}
                  <div className='pt-6 border-t border-border flex justify-center'>
                    <Button size='lg' asChild className='h-12 px-8 gap-2'>
                      <button type='submit'>Submit Registration</button>
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Team Section */}
      <section
        ref={teamRef}
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28'
      >
        {/* Eyebrow */}
        <motion.div
          initial='hidden'
          animate={teamInView ? 'show' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className='flex items-center gap-3 mb-5'
        >
          <div className='h-px w-10 bg-primary' />
          <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
            Emergency
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial='hidden'
          animate={teamInView ? 'show' : 'hidden'}
          variants={fadeUp}
          custom={0.1}
          className='text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6'
        >
          Our{' '}
          <span className='italic font-light text-muted-foreground'>Team</span>
          <span className='text-primary'>.</span>
        </motion.h2>

        {/* Body text */}
        <motion.p
          initial='hidden'
          animate={teamInView ? 'show' : 'hidden'}
          variants={fadeUp}
          custom={0.15}
          className='text-base text-muted-foreground leading-relaxed max-w-2xl mb-10'
        >
          Contact our leadership team for any inquiries or support.
        </motion.p>

        {/* Team Grid */}
        <motion.div
          initial='hidden'
          animate={teamInView ? 'show' : 'hidden'}
          variants={gridVariants}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
        >
          {MemberModelData.map((member) => (
            <MemberModel
              key={member.id}
              name={member.name}
              title={member.title}
              img={member.img}
              number={member.number}
              number2={member.number2}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
