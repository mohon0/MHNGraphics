"use client";

import { FetchPaymentReport } from "@/components/fetch/best-computer/FetchApplication";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import DeletePaymentSummary from "./DeletePaymentSummary";
import PaymentSummaryTable from "./PaymentSummaryTable";

function PaymentReport() {
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const { isLoading, data, isError, refetch } = FetchPaymentReport(id);
  const FormSchema = z.object({
    trxId: z
      .string()
      .min(2, "Comment is required ")
      .max(70, "Comment can only be less than 70 characters"),
    month: z.string().min(2, "month is required"),
    year: z.string().min(2, "year is required"),
    amount: z
      .string()
      .regex(/^(-?\d+(\.\d+)?)$/, "Amount must be numerical")
      .refine((value) => {
        const numberValue = parseFloat(value);
        return numberValue >= -100000 && numberValue <= 100000;
      }, "Amount must be between -100000 and 100000"),
    date: z
      .string()
      .regex(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "Date must be in the format DD/MM/YYYY",
      ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trxId: "",
      amount: "",
      month: "",
      year: "",
      date: "",
    },
  });
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return "You are not authenticated";
  }

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Something is wrong..</p>;
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.loading("Please wait...");
    const response = await axios.post(
      `/api/best-computer/application/payment-report?id=${id}`,
      data,
    );
    if (response.status === 201) {
      toast.dismiss();
      toast.success("Payment Report was successfully added.");
      form.reset();
      refetch();
    } else {
      toast.dismiss();
      toast.error("Failed to add payment report");
    }
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2009 },
    (_, index) => currentYear - index,
  );

  const yearOptions = years.map((year) => (
    <SelectItem key={year} value={year.toString()}>
      {year}
    </SelectItem>
  ));

  return (
    <div className="mx-2 md:mx-10">
      {session?.user?.role === "ADMIN" ? (
        <>
          <Card className="mx-auto lg:w-2/3">
            <CardContent className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-normal md:gap-10">
              {data.image && (
                <Image
                  src={data.image}
                  alt=""
                  width={200}
                  height={200}
                  className="mt-3 w-24 rounded-sm md:w-32 lg:w-40"
                />
              )}
              <div className="mt-2">
                <p className="text-2xl font-bold uppercase text-primary">
                  {data.firstName} {data.lastName}
                </p>
                <p>{data.fullAddress}</p>
                <p>{data.mobileNumber}</p>
                <p>{data.email}</p>
              </div>
            </CardContent>
          </Card>
          <div className="mt-10">
            <p className="mt-0 text-center text-2xl font-bold">
              Make Payment Report
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto mt-4 space-y-2 md:w-2/3"
              >
                <FormField
                  control={form.control}
                  name="trxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Input placeholder="Comment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input placeholder="Date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="January">January</SelectItem>
                          <SelectItem value="February">February</SelectItem>
                          <SelectItem value="March">March</SelectItem>
                          <SelectItem value="April">April</SelectItem>
                          <SelectItem value="May">May</SelectItem>
                          <SelectItem value="June">June</SelectItem>
                          <SelectItem value="July">July</SelectItem>
                          <SelectItem value="August">August</SelectItem>
                          <SelectItem value="September">September</SelectItem>
                          <SelectItem value="October">October</SelectItem>
                          <SelectItem value="November">November</SelectItem>
                          <SelectItem value="December">December</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>{yearOptions}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="Amount" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <PaymentSummaryTable data={data.payments} />
          </div>
          <DeletePaymentSummary data={data.payments} id={id} />
        </>
      ) : (
        "Your don't have permission to access this page"
      )}
    </div>
  );
}

function Loading() {
  return (
    <div>
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Skeleton className="h-10 w-full" />
        </div>
      }
    >
      <PaymentReport />
    </Suspense>
  );
}
