"use client";

import BloodDonateNotice from "@/app/(pages)/best-computer-training-center/blood-donate/BloodDonateNotice";
import MemberModel, {
  MemberModelData,
} from "@/app/(pages)/best-computer-training-center/blood-donate/MemberModel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { bangladeshDistricts } from "@/constant/District";
import img from "@/images/best-computer/logo.png";
import { useSingleDonar } from "@/services/blood-bank";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

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
    .min(2, { message: "Username must be at least 2 characters." }),
  allergies: z.enum(["Yes", "No"]),
  donatedBefore: z.enum(["Yes", "No"]),
  diseases: z.enum(["Yes", "No"]),
  district: z.string().min(1),
  birthDay: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Date must be in the format DD/MM/YYYY",
    ),
  bloodGroup: z.string().min(1),
  address: z.string().min(2),
  Occupation: z.string().min(1),
  number: z.string().regex(/^(?:\+?88)?01[0-9]{9}$/, {
    message: "Must be a valid 11-digit phone number",
  }),
  number2: z.string().optional(),
  id: z.string().optional(),
});
function BloodDonation() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const MAX_IMAGE_SIZE_KB = 100;
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const { isLoading, data, isError } = useSingleDonar(id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      district: "",
      birthDay: "",
      bloodGroup: "",
      Occupation: "",
      address: "",
      number: "",
      number2: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        fullName: data.name,
        district: data.district,
        birthDay: data.birthDate,
        bloodGroup: data.bloodGroup,
        Occupation: data.occupation,
        address: data.address,
        number: data.number,
        number2: data.number2,
        donatedBefore: data.donatedBefore,
        allergies: data.allergies,
        diseases: data.diseases,
        id: data.id,
      });
    }
  }, [data, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
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
    if (image) {
      formData.append("image", image);
    }
    if (imageError) {
      toast.error("Image size must be less than 100KB");
      return;
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      toast.loading("Please wait...");
      const response = await axios.put(
        "/api/best-computer/blood-bank",
        formData,
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Form has been successfully submitted");
        setImage(null);
        setTimeout(() => {
          route.back();
        }, 2000);
      } else {
        toast.dismiss();
        toast.error("Form failed to be submitted");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to submit form");
    }
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        "Error fetching data"
      ) : data ? (
        <div className="my-10">
          <div className="mx-2 md:mx-10">
            <BloodDonateNotice />
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-6">
            <Image src={img} alt="" width="100" height="100" />
            <p className="mx-2 text-center text-xl font-bold text-primary md:text-3xl">
              আমরা পেরেছি, আমরাই পারবো, <br /> রক্ত দিয়ে অসহায় মানুষের পাশে
              দাড়াবো
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border border-primary px-8 py-3 font-bold md:text-xl"
            >
              Blood Donation Form
            </Button>
            <p className="mx-2 text-xl">রক্তযোদ্ধা পরিবার, ঝিনাইদহ।</p>
            <p className="mx-2 text-center">
              অফিসঃ রফি টাওয়ার (১০ তলা ভবনের ৪র্থ তলা), পায়রা চত্ত্বর, ঝিনাইদহ।
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-2/3 flex-col"
              >
                <div className="grid gap-x-10 gap-y-2 md:grid-cols-2">
                  <div className="space-y-4 md:order-2">
                    <div className="flex items-center justify-center md:justify-end">
                      <Label
                        htmlFor="picture"
                        className="flex flex-col items-center justify-center rounded border border-primary px-6 py-10"
                      >
                        <p>Upload Image</p>
                        <p>Optional</p>
                      </Label>
                      <input
                        type="file"
                        id="picture"
                        className="hidden p-2"
                        onChange={handleFileChange}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Donar Full Name (রক্ত দাতার সম্পূর্ণ নাম)
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
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
                          <FormLabel>Date of Birth (জন্ম তারিখ)</FormLabel>
                          <FormControl>
                            <Input placeholder="04/03/1998" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Group (রক্তের গ্রুপ)</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={data.bloodGroup}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your blood group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation (পেশা)</FormLabel>
                          <FormControl>
                            <Input placeholder="Occupation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number (মোবাইল নং)</FormLabel>
                          <FormControl>
                            <Input placeholder="01700000023" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="number2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number 2 (মোবাইল নং ২ )</FormLabel>
                          <FormControl>
                            <Input placeholder="Optional" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address (সম্পূর্ণ ঠিকানা)</FormLabel>
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
                          <FormLabel>District (জেলা)</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={data.district}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your district" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                    <FormField
                      control={form.control}
                      name="donatedBefore"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Do you ever donated blood before? (আপনি কি আগে কখনো
                            রক্ত দিয়েছেন?)
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={data.donatedBefore}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes (হ্যাঁ)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="No" />
                                </FormControl>
                                <FormLabel className="font-normal">
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
                      name="diseases"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Do you suffer from any diseases? (আপনি কি কোন রোগে
                            ভুগছেন?)
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={data.diseases}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes (হ্যাঁ)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="No" />
                                </FormControl>
                                <FormLabel className="font-normal">
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
                      name="allergies"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Do you have allergies? (আপনার কি এলার্জি আছে?)
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={data.allergies}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes (হ্যাঁ)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="No" />
                                </FormControl>
                                <FormLabel className="font-normal">
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

                  <Button
                    type="submit"
                    size="lg"
                    className="mx-auto mt-12 flex items-center justify-center px-20 md:hidden"
                  >
                    Submit
                  </Button>
                  <div className="flex justify-between md:order-1">
                    <div className="mt-16 space-y-10">
                      <p className="text-xl font-bold">
                        জরুরী প্রয়োজনে যোগাযোগ করুন
                      </p>
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
                    <Separator
                      orientation="vertical"
                      className="hidden md:block"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mx-auto mt-12 hidden items-center justify-center px-20 md:flex"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        "No content available"
      )}
    </>
  );
}

export default function EditDesign() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            {" "}
            <div className="space-y-4 p-4">
              <Skeleton className="h-8 w-1/3" /> {/* Title placeholder */}
              <Skeleton className="h-4 w-full" /> {/* First paragraph line */}
              <Skeleton className="h-4 w-2/3" /> {/* Second paragraph line */}
              <Skeleton className="h-64 w-full rounded-md" />{" "}
              {/* Main content area placeholder */}
            </div>
          </div>
        }
      >
        <BloodDonation />
      </Suspense>
    </div>
  );
}
