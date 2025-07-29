'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Calendar, Droplets, MapPin, Phone, Upload, User } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { bangladeshDistricts } from '@/constant/District';
import Header from './Header';
import MemberModel, { MemberModelData } from './MemberModel';

const fileSizeValidator = (maxSizeInKB: number) => (file: File) => {
  const fileSizeKB = file.size / 1024; // Convert file size to KB
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

    // Check for image error before proceeding
    if (imageError) {
      toast.error('Image size must be less than 100KB');
      return;
    }

    // Append image and form data
    if (image) {
      formData.append('image', image);
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Use toast.promise to handle promise states
    toast
      .promise(
        axios.post('/api/best-computer/blood-bank', formData), // The API request
        {
          loading: 'Please wait...', // Message for the loading state
          success: 'Form has been successfully submitted', // Message for success
          error: 'Failed to submit form', // Message for error
        },
      )
      .unwrap()
      .then(() => {
        // Reset the form and image upon success
        form.reset();
        setImage(null);
        location.reload();
      });
  }

  return (
    <div className='min-h-screen bg-linear-to-b from-red-50 to-white'>
      <Header />

      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-red-600 md:text-4xl'>
            Blood Donation Registration
          </h1>
          <p className='mt-2 text-gray-600'>
            Join our community of life-savers
          </p>
        </div>

        <Card className='mx-auto max-w-4xl border-red-100 shadow-md'>
          <CardHeader className='bg-linear-to-r from-red-500 to-red-600 text-white'>
            <CardTitle className='text-2xl'>Donor Information Form</CardTitle>
            <CardDescription className='text-red-100'>
              Please fill out all required fields
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <div className='grid gap-6 md:grid-cols-2'>
                  {/* Personal Information Section */}
                  <div className='space-y-4'>
                    <div className='mb-4'>
                      <h3 className='flex items-center text-lg font-medium text-gray-900'>
                        <User className='mr-2 h-5 w-5 text-red-500' />
                        Personal Information
                      </h3>
                      <Separator className='mt-2 bg-red-100' />
                    </div>

                    <FormField
                      control={form.control}
                      name='fullName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700'>
                            Full Name{' '}
                            <span className='text-xs text-gray-500'>
                              (রক্ত দাতার সম্পূর্ণ নাম)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Full Name'
                              {...field}
                              className='border-gray-300 focus:border-red-500 focus:ring-red-500'
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
                          <FormLabel className='text-gray-700'>
                            <span className='flex items-center'>
                              <Calendar className='mr-2 h-4 w-4 text-red-500' />
                              Date of Birth{' '}
                              <span className='text-xs text-gray-500'>
                                (জন্ম তারিখ)
                              </span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='DD/MM/YYYY'
                              {...field}
                              className='border-gray-300 focus:border-red-500 focus:ring-red-500'
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
                          <FormLabel className='text-gray-700'>
                            <span className='flex items-center'>
                              <Droplets className='mr-2 h-4 w-4 text-red-500' />
                              Blood Group{' '}
                              <span className='text-xs text-gray-500'>
                                (রক্তের গ্রুপ)
                              </span>
                            </span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className='border-gray-300 focus:border-red-500 focus:ring-red-500'>
                                <SelectValue placeholder='Select your blood group' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='A+'>A+</SelectItem>
                              <SelectItem value='A-'>A-</SelectItem>
                              <SelectItem value='B+'>B+</SelectItem>
                              <SelectItem value='B-'>B-</SelectItem>
                              <SelectItem value='AB+'>AB+</SelectItem>
                              <SelectItem value='AB-'>AB-</SelectItem>
                              <SelectItem value='O+'>O+</SelectItem>
                              <SelectItem value='O-'>O-</SelectItem>
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
                          <FormLabel className='text-gray-700'>
                            Occupation{' '}
                            <span className='text-xs text-gray-500'>(পেশা)</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Occupation'
                              {...field}
                              className='border-gray-300 focus:border-red-500 focus:ring-red-500'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Image Upload */}
                    <div className='mt-6'>
                      <Label
                        htmlFor='picture'
                        className='mb-2 block text-sm font-medium text-gray-700'
                      >
                        Profile Picture{' '}
                        <span className='text-xs text-gray-500'>
                          (Optional)
                        </span>
                      </Label>
                      <Label
                        htmlFor='picture'
                        className='flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-4 transition-all hover:border-red-300 hover:bg-gray-100'
                      >
                        {image ? (
                          <div className='text-center'>
                            <Upload className='mx-auto mb-2 h-8 w-8 text-red-500' />
                            <p className='text-sm text-gray-600'>
                              Image selected
                            </p>
                            <p className='text-xs text-gray-500'>
                              {image.name}
                            </p>
                          </div>
                        ) : (
                          <>
                            <Upload className='mb-2 h-8 w-8 text-red-400' />
                            <p className='text-sm text-gray-600'>
                              Upload Image
                            </p>
                            <p className='text-xs text-gray-500'>
                              Optional (Max 100KB)
                            </p>
                          </>
                        )}
                      </Label>
                      <input
                        type='file'
                        id='picture'
                        className='hidden'
                        onChange={handleFileChange}
                        accept='image/*'
                      />
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className='space-y-4'>
                    <div className='mb-4'>
                      <h3 className='flex items-center text-lg font-medium text-gray-900'>
                        <MapPin className='mr-2 h-5 w-5 text-red-500' />
                        Contact Information
                      </h3>
                      <Separator className='mt-2 bg-red-100' />
                    </div>

                    <FormField
                      control={form.control}
                      name='number'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700'>
                            <span className='flex items-center'>
                              <Phone className='mr-2 h-4 w-4 text-red-500' />
                              Mobile Number{' '}
                              <span className='text-xs text-gray-500'>
                                (মোবাইল নং)
                              </span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='01700000023'
                              {...field}
                              className='border-gray-300 focus:border-red-500 focus:ring-red-500'
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
                          <FormLabel className='text-gray-700'>
                            Mobile Number 2{' '}
                            <span className='text-xs text-gray-500'>
                              (মোবাইল নং ২)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Optional'
                              {...field}
                              className='border-gray-300 focus:border-red-500 focus:ring-red-500'
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
                        <FormItem>
                          <FormLabel className='text-gray-700'>
                            Full Address{' '}
                            <span className='text-xs text-gray-500'>
                              (সম্পূর্ণ ঠিকানা)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Full Address'
                              {...field}
                              className='border-gray-300 focus:border-red-500 focus:ring-red-500'
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
                        <FormItem>
                          <FormLabel className='text-gray-700'>
                            District{' '}
                            <span className='text-xs text-gray-500'>(জেলা)</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className='border-gray-300 focus:border-red-500 focus:ring-red-500'>
                                <SelectValue placeholder='Select your district' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='max-h-[200px]'>
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
                <div className='mt-8'>
                  <div className='mb-4'>
                    <h3 className='flex items-center text-lg font-medium text-gray-900'>
                      <Droplets className='mr-2 h-5 w-5 text-red-500' />
                      Medical Information
                    </h3>
                    <Separator className='mt-2 bg-red-100' />
                  </div>

                  <div className='grid gap-6 md:grid-cols-3'>
                    <FormField
                      control={form.control}
                      name='donatedBefore'
                      render={({ field }) => (
                        <FormItem className='space-y-3'>
                          <FormLabel className='text-gray-700'>
                            Ever donated blood before?{' '}
                            <span className='text-xs text-gray-500'>
                              (আগে রক্ত দিয়েছেন?)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className='flex flex-col space-y-1'
                            >
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='Yes' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Yes (হ্যাঁ)
                                </FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='No' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  No (না)
                                </FormLabel>
                              </FormItem>
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
                          <FormLabel className='text-gray-700'>
                            Suffer from any diseases?{' '}
                            <span className='text-xs text-gray-500'>
                              (কোন রোগে ভুগছেন?)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className='flex flex-col space-y-1'
                            >
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='Yes' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Yes (হ্যাঁ)
                                </FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='No' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  No (না)
                                </FormLabel>
                              </FormItem>
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
                          <FormLabel className='text-gray-700'>
                            Have allergies?{' '}
                            <span className='text-xs text-gray-500'>
                              (এলার্জি আছে?)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className='flex flex-col space-y-1'
                            >
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='Yes' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Yes (হ্যাঁ)
                                </FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='No' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  No (না)
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className='mt-8 flex justify-center'>
                  <Button
                    type='submit'
                    size='lg'
                    className='bg-linear-to-r from-red-500 to-red-600 px-10 py-6 text-lg font-semibold text-white transition-all hover:from-red-600 hover:to-red-700'
                  >
                    Submit Registration
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className='container mx-auto mt-16 space-y-10 px-4 pb-16'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-red-600'>
            জরুরী প্রয়োজনে যোগাযোগ করুন
          </h2>
          <Separator className='mx-auto mt-4 w-24 bg-red-200' />
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
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
        </div>
      </div>
    </div>
  );
}
