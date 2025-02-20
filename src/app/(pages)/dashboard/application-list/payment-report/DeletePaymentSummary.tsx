import { FetchPaymentReport } from "@/components/fetch/best-computer/FetchApplication";
import { PaymentReportType } from "@/components/interface/ApplicationType";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface DeletePaymentSummaryProps {
  data: PaymentReportType[];
  id: string | string[];
}

export default function DeletePaymentSummary({
  data,
  id,
}: DeletePaymentSummaryProps) {
  const { refetch } = FetchPaymentReport(id);
  const FormSchema = z.object({
    paymentId: z.string().min(4),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymentId: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { paymentId } = data;
    toast.loading("Deleting payment summary...");
    try {
      const response = await axios.delete(
        `/api/best-computer/application/payment-report?id=${paymentId}`,
      );
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Payment summary deleted successfully.");
        form.reset();
        refetch();
      } else {
        toast.dismiss();
        toast.error("Failed to delete payment summary.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-10">
      <p className="text-center text-2xl font-bold">Delete Payment Summary</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="paymentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Payment Summary</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Payment Summary" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((payment: PaymentReportType) => (
                      <SelectItem key={payment.id} value={payment.id}>
                        <p>
                          Comment: {payment.trxId} date: {payment.time} Month:{" "}
                          {payment.month}
                          {payment.year} Amount: {payment.amount}
                        </p>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Proceed with caution. This action can not be undone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </Form>
    </div>
  );
}
