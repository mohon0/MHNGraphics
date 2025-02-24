"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CreditCard,
  Receipt,
  Search,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFetchPaymentReport } from "@/services/payment";
import { PaymentReportType } from "@/utils/Interface";

const FormSchema = z.object({
  paymentId: z.string().min(4, "Please select a payment to delete"),
});

export default function DeletePaymentSummary({ id }: { id: string }) {
  const {
    isLoading,
    data: paymentData,
    isError,
    refetch,
  } = useFetchPaymentReport(id);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedPayment, setSelectedPayment] =
    React.useState<PaymentReportType | null>(null);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymentId: "",
    },
  });

  const handleDelete = async () => {
    if (!selectedPayment) return;

    await toast.promise(
      axios.delete(
        `/api/best-computer/application/payment-report?id=${selectedPayment.id}`,
      ),
      {
        loading: "Deleting payment record...",
        success: () => {
          form.reset();
          refetch();
          return "Payment record deleted successfully";
        },
        error: "Failed to delete payment record",
      },
    );

    setIsDeleteDialogOpen(false);
    setSelectedPayment(null);
    setOpen(false);
  };

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    const payment = data?.find((p) => p.id === formData.paymentId);
    if (payment) {
      setSelectedPayment(payment);
      setIsDeleteDialogOpen(true);
    }
  };

  if (isLoading) {
    return <DeletePaymentSummarySkeleton />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load payment data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const data = paymentData?.payments as PaymentReportType[];

  if (!data?.length) {
    return (
      <Alert>
        <Receipt className="h-4 w-4" />
        <AlertTitle>No Payments Found</AlertTitle>
        <AlertDescription>
          There are no payment records to delete.
        </AlertDescription>
      </Alert>
    );
  }

  const filteredPayments = data.filter(
    (payment) =>
      payment.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.PaymentMonth?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.amount.toString().includes(searchQuery),
  );

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Trash2 className="h-5 w-5" />
          Delete Payment Record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="paymentId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select Payment to Delete</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              <span>
                                {
                                  data.find(
                                    (payment) => payment.id === field.value,
                                  )?.comment
                                }
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Search className="h-4 w-4" />
                              <span>Search payments...</span>
                            </div>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Search by comment, month, or amount..."
                          value={searchQuery}
                          onValueChange={setSearchQuery}
                        />
                        <CommandList>
                          <CommandEmpty>No payments found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[300px]">
                              {filteredPayments.map((payment) => (
                                <CommandItem
                                  key={payment.id}
                                  value={payment.id}
                                  onSelect={() => {
                                    form.setValue("paymentId", payment.id);
                                    setOpen(false);
                                  }}
                                  className="p-3"
                                >
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                      <Badge
                                        variant={
                                          payment.amount > 0
                                            ? "default"
                                            : "destructive"
                                        }
                                        className="w-fit"
                                      >
                                        ৳ {payment.amount.toLocaleString()}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">
                                        {format(
                                          new Date(payment.PaymentReceiveDate),
                                          "PP",
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <span className="line-clamp-1 font-medium">
                                        {payment.comment}
                                      </span>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        Payment Month:
                                        <Calendar className="h-3 w-3" />
                                        {format(
                                          new Date(payment.PaymentMonth),
                                          "MMMM yyy",
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="destructive"
              className="w-full"
              disabled={!form.getValues("paymentId")}
            >
              Delete Selected Payment
            </Button>
          </form>
        </Form>
      </CardContent>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Delete Payment Record
            </AlertDialogTitle>
            <div>
              {selectedPayment && (
                <div className="mt-2 space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          selectedPayment.amount > 0 ? "default" : "destructive"
                        }
                        className="px-3 py-1"
                      >
                        ৳ {selectedPayment.amount.toLocaleString()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {format(
                          new Date(selectedPayment.PaymentReceiveDate),
                          "PPP",
                        )}
                      </span>
                    </div>
                    <div className="mt-3 font-medium">
                      {selectedPayment.comment}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Payment Month: {selectedPayment.PaymentMonth}
                    </div>
                  </div>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      This action cannot be undone. The payment record will be
                      permanently deleted.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

function DeletePaymentSummarySkeleton() {
  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
