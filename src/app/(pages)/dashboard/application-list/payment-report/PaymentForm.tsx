"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaymentFormSchema, PaymentFormSchemaType } from "@/lib/Schemas";
import { cn } from "@/lib/utils";

interface PaymentFormProps {
  id: string; // applicationId is required
  onSuccess?: () => void;
}

export default function PaymentForm({ id, onSuccess }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const form = useForm<PaymentFormSchemaType>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      comment: "",
      amount: "",
    },
  });

  async function onSubmit(data: PaymentFormSchemaType) {
    setIsSubmitting(true);

    const formattedData = {
      comment: data.comment,
      amount: parseFloat(data.amount), // Convert amount to Float
      PaymentReceiveDate: data.receiveDate, // Date object
      PaymentMonth: data.paymentMonth, // Date object
      applicationId: id, // Passed from props
    };

    toast.promise(
      axios.post(
        `/api/best-computer/application/payment-report?id=${id}`,
        formattedData,
      ),
      {
        loading: "Submitting payment...",
        success: () => {
          form.reset();
          onSuccess?.();
          router.refresh();
          return "Payment added successfully!";
        },
        error: "Failed to add payment. Please try again.",
      },
    );

    setIsSubmitting(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Add Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Payment Receive Date */}
            <FormField
              control={form.control}
              name="receiveDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Receive Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Month */}
            <FormField
              control={form.control}
              name="paymentMonth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Month</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MMMM yyyy")
                          ) : (
                            <span>Select month</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Input placeholder="Add a comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Payment...
                </>
              ) : (
                "Add Payment"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
