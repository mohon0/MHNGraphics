'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { bangladeshDistricts } from '@/constant/District';
import { ApplicationSchema } from '@/lib/Schemas';
import { cn } from '@/lib/utils';
import { useFetchDuration } from '@/services/admin';
import { useSubmitApplication } from '@/services/application';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';
import Preview from './ApplicationPreview';

const currentYear = new Date().getFullYear();
const MAX_FILE_SIZE = 300000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const generateSessionOptions = (): string[] => {
  const currentYear = new Date().getFullYear();

  // Generate years from next year down to 2010
  return Array.from({ length: currentYear - 2009 + 2 }, (_, i) =>
    String(currentYear + 1 - i),
  );
};

export function StudentApplicationForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isLoading, data, isError } = useFetchDuration();
  const { submitApplication, isSubmitting } = useSubmitApplication();

  const form = useForm<z.infer<typeof ApplicationSchema>>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      studentName: '',
      fatherName: '',
      motherName: '',
      fatherOccupation: '',
      birthDay: undefined,
      mobileNumber: '',
      guardianNumber: '',
      gender: undefined,
      maritalStatus: undefined,
      bloodGroup: '',
      religion: '',
      nationality: 'Bangladeshi',
      nidBirthReg: '',
      email: undefined,
      fullAddress: '',
      district: '',
      education: '',
      educationBoard: '',
      rollNumber: '',
      regNumber: '',
      passingYear: currentYear,
      gpaCgpa: '',
      course: '',
      session: '',
      duration: '',
      pc: undefined,
      image: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof ApplicationSchema>) => {
    await submitApplication(values);
  };

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error('File size exceeds 500KB limit');
          e.target.value = '';
          return;
        }
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          toast.error(
            'Invalid file type. Only .jpg, .jpeg, .png and .webp are allowed.',
          );
          e.target.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  return (
    <div className='container mx-auto py-10'>
      <Card className='mx-auto w-full max-w-4xl'>
        <CardHeader className='flex items-center justify-center'>
          <CardTitle className='text-3xl font-bold'>
            Student Application Form
          </CardTitle>
          <CardDescription>
            Please fill out all the required information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='space-y-6'>
                <div>
                  <h2 className='mb-2 text-xl font-semibold'>
                    Personal Information
                  </h2>
                  <Separator className='mb-4' />
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div className='md:col-span-2'>
                      <FormField
                        control={form.control}
                        name='studentName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student full Name</FormLabel>
                            <FormControl>
                              <Input placeholder='Md Mohon' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='md:row-span-3'>
                      <FormField
                        control={form.control}
                        name='image'
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                              <div>
                                <Label htmlFor='image-upload'>
                                  <div className='h-40 w-40 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-200 hover:border-gray-400'>
                                    {imagePreview ? (
                                      <Image
                                        src={imagePreview}
                                        alt='Preview'
                                        width={128}
                                        height={128}
                                        objectFit='cover'
                                        layout='responsive'
                                      />
                                    ) : (
                                      <div className='flex h-full flex-col items-center justify-center text-gray-400'>
                                        <Upload className='mb-2 h-8 w-8' />
                                        <span>Upload</span>
                                      </div>
                                    )}
                                  </div>
                                </Label>
                                <Input
                                  id='image-upload'
                                  type='file'
                                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                  className='hidden'
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                      onChange(files);
                                      onImageChange(e);
                                    }
                                  }}
                                  {...rest}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload your profile picture (max 300KB, .jpg,
                              .jpeg, .png, .webp).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name='fatherName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father&#39;s Name</FormLabel>
                          <FormControl>
                            <Input placeholder='Father name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='motherName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother&#39;s Name</FormLabel>
                          <FormControl>
                            <Input placeholder='Mother name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='fatherOccupation'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father&#39;s Occupation</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Father's Occupation"
                              {...field}
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
                        <FormItem className='flex flex-col'>
                          <FormLabel>Date of birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-[240px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className='w-auto p-0'
                              align='start'
                            >
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                captionLayout='dropdown'
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='gender'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select your gender' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='male'>Male</SelectItem>
                              <SelectItem value='female'>Female</SelectItem>
                              <SelectItem value='other'>Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='maritalStatus'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marital Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Marital Status</SelectLabel>

                                <SelectItem value='Single'>Single</SelectItem>
                                <SelectItem value='Married'>Married</SelectItem>
                                <SelectItem value='Widowed'>Widowed</SelectItem>
                                <SelectItem value='Divorced'>
                                  Divorced
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='bloodGroup'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Group</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Your Blood Group' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='A+'>A+</SelectItem>
                              <SelectItem value='A-'>A-</SelectItem>
                              <SelectItem value='B+'>B+</SelectItem>
                              <SelectItem value='B-'>B-</SelectItem>
                              <SelectItem value='O+'>O+</SelectItem>
                              <SelectItem value='O-'>O-</SelectItem>
                              <SelectItem value='AB+'>AB+</SelectItem>
                              <SelectItem value='AB-'>AB-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='religion'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Religion</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Your Religion' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Islam'>Islam</SelectItem>
                              <SelectItem value='Hinduism'>Hinduism</SelectItem>
                              <SelectItem value='Christianity'>
                                Christianity
                              </SelectItem>
                              <SelectItem value='Buddhism'>Buddhism</SelectItem>
                              <SelectItem value='Judaism'>Judaism</SelectItem>
                              <SelectItem value='Sikhism'>Sikhism</SelectItem>
                              <SelectItem value='Jainism'>Jainism</SelectItem>
                              <SelectItem value="Bahá'í Faith">
                                Bahá&#39;í Faith
                              </SelectItem>
                              <SelectItem value='Shinto'>Shinto</SelectItem>
                              <SelectItem value='Others'>Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='nationality'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input placeholder='Bangladeshi' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='nidBirthReg'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NID/Birth Reg.</FormLabel>
                          <FormControl>
                            <Input placeholder='NID/Birth Reg.' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className='mb-2 text-xl font-semibold'>
                    Contact Information
                  </h2>
                  <Separator className='mb-4' />
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='mobileNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder='Mobile Number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='guardianNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guardian Number</FormLabel>
                          <FormControl>
                            <Input placeholder='Guardian Number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='your.email@example.com'
                              type='email'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='fullAddress'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Input placeholder='Full Address' {...field} />
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
                          <FormLabel>District</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Your District' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bangladeshDistricts.map((District) => (
                                <SelectItem key={District} value={District}>
                                  {District}
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

                <div>
                  <h2 className='mb-2 text-xl font-semibold'>
                    Educational Information
                  </h2>
                  <Separator className='mb-4' />
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='education'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Your Education' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='jsc'>JSC</SelectItem>
                              <SelectItem value='ssc'>SSC</SelectItem>
                              <SelectItem value='hsc'>HSC</SelectItem>
                              <SelectItem value='bachelor'>Bachelor</SelectItem>
                              <SelectItem value='masters'>Masters</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='educationBoard'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education Board</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Your Education Board' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Dhaka'>Dhaka</SelectItem>
                              <SelectItem value='Chittagong'>
                                Chittagong
                              </SelectItem>
                              <SelectItem value='Rajshahi'>Rajshahi</SelectItem>
                              <SelectItem value='Jessore'>Jessore</SelectItem>
                              <SelectItem value='Comilla'>Comilla</SelectItem>
                              <SelectItem value='Sylhet'>Sylhet</SelectItem>
                              <SelectItem value='Dinajpur'>Dinajpur</SelectItem>
                              <SelectItem value='Barishal'>Barishal</SelectItem>
                              <SelectItem value='Madrasah'>Madrasah</SelectItem>
                              <SelectItem value='Technical'>
                                Technical
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='rollNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roll Number</FormLabel>
                          <FormControl>
                            <Input placeholder='Roll Number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='regNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reg. Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Registration Number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='passingYear'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passing Year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Passing Year'
                              type='number'
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  parseInt(e.target.value, 10) || '',
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='gpaCgpa'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GPA/CGPA</FormLabel>
                          <FormControl>
                            <Input placeholder='GPA/CGPA' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className='mb-2 text-xl font-semibold'>
                    Course Information
                  </h2>
                  <Separator className='mb-4' />
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='course'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Your Course' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Course</SelectLabel>
                                <SelectItem value='office application'>
                                  Office Application
                                </SelectItem>
                                <SelectItem value='database programming'>
                                  Database Programming
                                </SelectItem>
                                <SelectItem value='digital marketing'>
                                  Digital Marketing
                                </SelectItem>
                                <SelectItem value='graphics design'>
                                  Graphics Design
                                </SelectItem>
                                <SelectItem value='web development'>
                                  Web Design & Development
                                </SelectItem>
                                <SelectItem value='video editing'>
                                  Video Editing
                                </SelectItem>
                                <SelectItem value='ethical hacking'>
                                  Ethical Hacking
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='session'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select your session' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Session</SelectLabel>
                                {generateSessionOptions().map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='duration'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          {isLoading ? (
                            <div className='text-sm text-gray-500'>
                              Loading options...
                            </div>
                          ) : isError ? (
                            <div className='text-sm text-red-500'>
                              Failed to load options
                            </div>
                          ) : (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Course Duration' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Course Duration</SelectLabel>

                                  {data.button === 'On' && (
                                    <SelectItem value='free'>
                                      Free (conditions apply)
                                    </SelectItem>
                                  )}
                                  <SelectItem value='1 month'>
                                    1 Month
                                  </SelectItem>
                                  <SelectItem value='3 month'>
                                    3 Month
                                  </SelectItem>
                                  <SelectItem value='6 month'>
                                    6 Month
                                  </SelectItem>
                                  <SelectItem value='1 year'>1 Year</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='pc'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you have computer?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='laptop'>Laptop</SelectItem>
                              <SelectItem value='pc'>pc</SelectItem>
                              <SelectItem value='no'>No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h2 className='mb-2 text-xl font-semibold'>
                    Payment Information
                  </h2>
                  <Separator className='mb-4' />
                </div>
              </div>
              <div className='border-primary rounded-sm border p-2'>
                <p className='text-muted-foreground text-sm'>
                  <span className='text-primary font-semibold'>Note:</span> You
                  will be redirected to the payment gateway to complete your
                  payment of{' '}
                  <span className='text-foreground font-semibold'>৳100</span>.{' '}
                  <br />
                  <span className='font-medium text-red-600'>
                    Application fees are non-refundable.
                  </span>
                </p>
              </div>

              <div className='flex flex-col gap-4 md:flex-row md:gap-10'>
                <Preview />
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
