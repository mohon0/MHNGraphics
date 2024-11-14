import { z } from "zod";

export const NewDesignFormSchema = z.object({
  name: z
    .string()
    .min(10, "Name must be at least 10 characters")
    .max(200)
    .trim()
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Name should not contain special characters like - _ +",
    ),
  description: z.string().trim(),
  category: z.string().min(1, "Required"),
  subcategory: z.string().min(1, "Required"),
  tags: z.array(z.string()),
});

export type NewProductFormSchemaType = z.infer<typeof NewDesignFormSchema>;
