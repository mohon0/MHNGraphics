import { z } from "zod";

export const SingInSchema = z.object({
  email: z.string().refine(
    (value) =>
      /\S+@\S+\.\S+/.test(value) || // Check for valid email format
      /^01[0-9]{9}$/.test(value), // Check for valid Bangladeshi phone number without country code
    {
      message: "Please enter a valid email or phone number",
    },
  ),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .max(15, "Password cannot be more than 15 characters"),
});

export const SignUpSchema = z.object({
  name: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10,15}$/.test(value),
      {
        message: "Must be a valid email or phone number.",
      },
    ),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .max(15, "Password can not be more than 15 characters"),
  code: z.string().optional(),
});

export const NewDesignSchema = z.object({
  name: z
    .string()
    .min(10, "Name must be at least 10 characters")
    .max(200)
    .trim()
    .regex(
      /^[^\s_]+(?:[\s^\s_][^\s_]+)*$/,
      "Name must not include underscores (_).",
    ),
  description: z.string().trim(),
  category: z.string().min(1, "Required"),
  tags: z.array(z.string()),
});

export type NewDesignSchemaType = z.infer<typeof NewDesignSchema>;

export const PaymentFormSchema = z.object({
  receiveDate: z.date({
    required_error: "Payment receive date is required",
  }),
  paymentMonth: z.date({
    required_error: "Payment month is required",
  }),
  amount: z.string().refine(
    (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= -100000 && num <= 100000;
    },
    {
      message: "Amount must be between -100,000 and 100,000",
    },
  ),
  comment: z
    .string()
    .min(2, "Comment is required")
    .max(70, "Comment is too long"),
});

export type PaymentFormSchemaType = z.infer<typeof PaymentFormSchema>;
