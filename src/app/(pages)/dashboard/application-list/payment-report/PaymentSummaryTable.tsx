"use client";

import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DollarSign,
  RefreshCcw,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useFetchPaymentReport } from "@/services/payment";
import { PaymentReport } from "@/utils/Interface";

export function PaymentSummaryTable({ id }: { id: string }) {
  const {
    isLoading,
    data: paymentData,
    isError,
    refetch,
  } = useFetchPaymentReport(id);

  if (isLoading) {
    return <PaymentSummarySkeleton />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          Failed to load payment data.
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const data = paymentData.payments as PaymentReport[];

  if (!data?.length) {
    return (
      <Card className="flex h-[400px] items-center justify-center text-center">
        <CardContent>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No Payment Records</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            No payment records have been added yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort payments by date
  const sortedPayments = [...data].sort(
    (a, b) =>
      new Date(b.paymentReceiveDate).getTime() -
      new Date(a.paymentReceiveDate).getTime(),
  );

  // Calculate statistics
  const totalAmount = data.reduce((acc, payment) => acc + payment.amount, 0);
  const positivePayments = data.filter((p) => p.amount > 0);
  const negativePayments = data.filter((p) => p.amount < 0);
  const totalPositive = positivePayments.reduce((acc, p) => acc + p.amount, 0);
  const totalNegative = negativePayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳ {totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {data.length} transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Received
            </CardTitle>
            <ArrowDown className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              ৳ {totalPositive.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {positivePayments.length} incoming payments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Refunded
            </CardTitle>
            <ArrowUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ৳ {Math.abs(totalNegative).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {negativePayments.length} refund transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-row items-center justify-between">
        <CardTitle>Payment History</CardTitle>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Receive Date</TableHead>
            <TableHead>Payment Month</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {format(new Date(payment.paymentReceiveDate), "dd MMM yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(payment.paymentMonth), "MMMM yyyy")}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {payment.comment}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right tabular-nums",
                  payment.amount > 0 ? "text-emerald-600" : "text-red-600",
                )}
              >
                ৳ {payment.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Balance</TableCell>
            <TableCell
              className={cn(
                "text-right font-bold",
                totalAmount > 0 ? "text-emerald-600" : "text-red-600",
              )}
            >
              ৳ {totalAmount.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

function PaymentSummarySkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[120px]" />
              <Skeleton className="mt-1 h-4 w-[140px]" />
            </CardContent>
            <CardFooter className="p-2">
              <Skeleton className="h-[60px] w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-[140px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
