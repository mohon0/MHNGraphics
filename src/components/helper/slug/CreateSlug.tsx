import { format } from "date-fns";

// Helper function to slugify the name and subcategory (convert spaces to hyphens and lowercasing)
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
};

export const createSlug = (
  category: string,
  subcategory: string,
  name: string,
  createdAt: Date,
): string => {
  // Format the date into dd/MM/yyyy format
  const formattedDate = format(new Date(createdAt), "dd/MM/yyyy");

  // Slugify the category, subcategory, and name
  const categorySlug = slugify(category);
  const subcategorySlug = slugify(subcategory);
  const nameSlug = slugify(name);

  // Split the date into day, month, and year
  const [day, month, year] = formattedDate.split("/");

  // Return the formatted slug
  return `/design/${categorySlug}/${subcategorySlug}/${day}/${month}/${year}/${nameSlug}`;
};
