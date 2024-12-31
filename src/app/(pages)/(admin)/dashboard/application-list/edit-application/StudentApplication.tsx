"use client";

import Preview from "@/app/(pages)/best-computer-training-center/application/ApplicationPreview";
import { bangladeshDistricts } from "@/components/data/District";
import EditApplicationImage from "@/components/form/formField/EditApplicationFormField";
import { SingleApplicationUserType } from "@/components/interface/ApplicationType";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import bkash from "@/images/tools/bkash.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const currentYear = new Date().getFullYear();

export const formSchema = z.object({
  id: z.string(),
  studentName: z
    .string()
    .trim()
    .min(1, "Student name is required")
    .max(40, "Must be 40 characters or less"),

  fatherName: z
    .string()
    .trim()
    .min(1, "Father's name is required")
    .max(40, "Must be 40 characters or less"),

  motherName: z
    .string()
    .trim()
    .min(1, "Mother's name is required")
    .max(40, "Must be 40 characters or less"),

  fatherOccupation: z
    .string()
    .trim()
    .min(1, "Father's occupation is required")
    .max(40, "Must be 40 characters or less"),

  birthDay: z
    .string()
    .trim()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Date must be in the format dd/mm/yyyy",
    ),

  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Mobile number must be between 10-15 digits"),

  guardianNumber: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Guardian number must be between 10-15 digits"),

  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender is required and must be valid" }),
  }),

  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"], {
    errorMap: () => ({ message: "Marital status is required" }),
  }),

  bloodGroup: z
    .string()
    .trim()
    .regex(/^(A|B|AB|O)[+-]$/, "Blood group must be valid (e.g., A+, B-, O+)"),

  religion: z.string().trim().min(1, "Religion is required"),

  nationality: z.string().trim().min(1, "Nationality is required"),

  nid: z.string().trim().min(1, "NID/Birth registration is required"),

  email: z.string().trim().email("Invalid email address").optional(),

  fullAddress: z.string().trim().min(5, "Full address is required"),

  district: z.string().trim().min(1, "District is required"),

  education: z.string().trim().min(1, "Education is required"),

  transactionId: z.string().trim().min(1, "Transaction ID is required"),

  board: z.string().trim().min(1, "Education board is required"),

  rollNumber: z.string().trim().min(1, "Roll number is required"),

  regNumber: z.string().trim().min(1, "Registration number is required"),

  passingYear: z
    .number({
      required_error: "Passing year is required",
      invalid_type_error: "Passing year must be a number",
    })
    .min(1990, "Passing year must be 1990 or later")
    .max(currentYear, `Passing year cannot be later than ${currentYear}`),

  gpa: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "GPA/CGPA must be a valid number (e.g., 4.00)")
    .min(1, "GPA/CGPA is required"),

  course: z.string().trim().min(1, "Course is required"),

  session: z
    .string()
    .regex(/^\d{4}$/, "Session must be a valid year") // Ensures it's a 4-digit year
    .refine(
      (value) => {
        const year = parseInt(value, 10);
        const currentYear = new Date().getFullYear();
        return year >= 2010 && year <= currentYear + 1;
      },
      { message: "Session must be between 2010 and next year" },
    ),

  duration: z.string().trim().min(1, "Duration is required"),

  pc: z.enum(["laptop", "pc", "no"], {
    errorMap: () => ({ message: "Specify if you have a computer (Yes/No)" }),
  }),
});

const generateSessionOptions = (): string[] => {
  const currentYear = new Date().getFullYear();

  // Generate years from next year down to 2010
  return Array.from({ length: currentYear - 2009 + 2 }, (_, i) =>
    String(currentYear + 1 - i),
  );
};

export function StudentApplicationForm({
  application,
}: SingleApplicationUserType) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [deletedImage, setDeletedImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: application.id,
      studentName: application.studentName,
      fatherName: application.fatherName,
      motherName: application.motherName,
      fatherOccupation: application.fatherOccupation,
      birthDay: application.birthDay,
      mobileNumber: application.mobileNumber,
      guardianNumber: application.guardianNumber,
      gender: application.gender,
      maritalStatus: application.maritalStatus,
      bloodGroup: application.bloodGroup,
      transactionId: application.transactionId,
      religion: application.religion,
      nationality: application.nationality,
      nid: application.nid,
      email: application.email,
      fullAddress: application.fullAddress,
      district: application.district,
      education: application.education,
      board: application.board,
      rollNumber: application.rollNumber,
      regNumber: application.regNumber,
      passingYear: Number(application.passingYear),
      gpa: application.gpa,
      course: application.course,
      session: String(application.session),
      duration: application.duration,
      pc: application.pc,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const totalImages = application.image ? 1 : newImage ? 1 : 0;

    if (totalImages === 0) {
      toast.error("Please upload an image");
      return;
    }
    setIsSubmitting(true);

    const submissionData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        submissionData.append(key, value.toString());
      }
    });

    if (newImage) {
      submissionData.append("image", newImage);
    }

    if (deletedImage) {
      submissionData.append("deletedImage", deletedImage);
    }
    toast.loading("Please wait...");

    try {
      const response = await axios.patch(
        "/api/best-computer/application",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status !== 200) {
        toast.dismiss();
        toast.error("Failed to update design");
      } else {
        toast.dismiss();
        toast.success("Design successfully updated");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update the form");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAddNewImage = (file: File) => {
    setNewImage(file);
  };

  const handleDeleteImage = () => {
    setDeletedImage(application.image);
    setNewImage(null);
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-3xl font-bold">
            Student Application Form
          </CardTitle>
          <CardDescription>
            Please fill out all the required information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Personal Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="studentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Md Mohon" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:row-span-3">
                      <EditApplicationImage
                        image={application.image}
                        newImage={newImage}
                        deletedImage={deletedImage}
                        handleAddNewImage={handleAddNewImage}
                        handleDeleteImage={handleDeleteImage}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father&#39;s Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Father name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother&#39;s Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Mother name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fatherOccupation"
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
                      name="birthDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Date</FormLabel>
                          <FormControl>
                            <Input placeholder="13/01/2000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marital Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Marital Status</SelectLabel>

                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                                <SelectItem value="Divorced">
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
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Group</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Blood Group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="religion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Religion</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Religion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="islam">Islam</SelectItem>
                              <SelectItem value="hinduism">Hinduism</SelectItem>
                              <SelectItem value="christianity">
                                Christianity
                              </SelectItem>
                              <SelectItem value="buddhism">Buddhism</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input placeholder="Bangladeshi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NID/Birth Reg.</FormLabel>
                          <FormControl>
                            <Input placeholder="NID/Birth Reg." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Contact Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Mobile Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guardianNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guardian Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Guardian Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fullAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your District" />
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
                  <h2 className="mb-2 text-xl font-semibold">
                    Educational Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Education" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="jsc">JSC</SelectItem>
                              <SelectItem value="ssc">SSC</SelectItem>
                              <SelectItem value="hsc">HSC</SelectItem>
                              <SelectItem value="bachelor">Bachelor</SelectItem>
                              <SelectItem value="masters">Masters</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="board"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education Board</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Education Board" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dhaka">Dhaka</SelectItem>
                              <SelectItem value="chittagong">
                                Chittagong
                              </SelectItem>
                              <SelectItem value="rajshahi">Rajshahi</SelectItem>
                              <SelectItem value="jessore">Jessore</SelectItem>
                              <SelectItem value="comilla">Comilla</SelectItem>
                              <SelectItem value="sylhet">Sylhet</SelectItem>
                              <SelectItem value="dinajpur">Dinajpur</SelectItem>
                              <SelectItem value="barishal">Barishal</SelectItem>
                              <SelectItem value="madrasah">Madrasah</SelectItem>
                              <SelectItem value="technical">
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
                      name="rollNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roll Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Roll Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="regNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reg. Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Registration Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passingYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passing Year</FormLabel>
                          <FormControl>
                            <Input placeholder="Passing Year" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GPA/CGPA</FormLabel>
                          <FormControl>
                            <Input placeholder="GPA/CGPA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Course Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Course</SelectLabel>
                                <SelectItem value="office application">
                                  Office Application
                                </SelectItem>
                                <SelectItem value="database programming">
                                  Database Programming
                                </SelectItem>
                                <SelectItem value="digital marketing">
                                  Digital Marketing
                                </SelectItem>
                                <SelectItem value="graphics design">
                                  Graphics Design
                                </SelectItem>
                                <SelectItem value="web development">
                                  Web Design & Development
                                </SelectItem>
                                <SelectItem value="video editing">
                                  Video Editing
                                </SelectItem>
                                <SelectItem value="ethical hacking">
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
                      name="session"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={String(field.value)}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your session" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Session</SelectLabel>
                                {generateSessionOptions().map(
                                  (option, index) => (
                                    <SelectItem key={index} value={option}>
                                      {option}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Course Duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Course Duration</SelectLabel>

                                <SelectItem value="free">
                                  Free (conditions apply)
                                </SelectItem>
                                <SelectItem value="1 month">1 Month</SelectItem>
                                <SelectItem value="3 month">3 Month</SelectItem>
                                <SelectItem value="6 month">6 Month</SelectItem>
                                <SelectItem value="1 year">1 Year</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you have computer?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="laptop">Laptop</SelectItem>
                              <SelectItem value="pc">pc</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Payment Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://shop.bkash.com/mia-store01779120023/pay/bdt100/ZHHBE3"
                      className="relative mt-2 flex w-fit items-center gap-2 rounded-lg border bg-secondary px-2 shadow-lg"
                    >
                      <Image src={bkash} alt="bkash" className="w-20" />
                      <span>Pay with bkash</span>
                      <div className="absolute -right-6 top-0 h-3 w-3 animate-ping rounded-full bg-pink-600"></div>
                    </Link>
                    <FormField
                      control={form.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TransactionID</FormLabel>
                          <FormControl>
                            <Input placeholder="TransactionID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-sm border border-primary p-2">
                <p>
                  ১০০/= টাকা আবেদন ফি সহ- কোর্স ফি বিকাশ পেমেন্ট করে,
                  Transaction ID লিখুন। তারপর Submit করুন। অবশ্যই পেমেন্ট রিসিট
                  মূল ফরম এর সাথে সংযুক্ত করতে হবে
                </p>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:gap-10">
                <Preview />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
