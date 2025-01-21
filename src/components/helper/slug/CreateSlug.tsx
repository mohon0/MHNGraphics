import slugify from "@sindresorhus/slugify";

// Helper function to generate a slug
export const generateSlug = (text: string) => {
  if (!text) {
    throw new Error("Text is required to generate a slug.");
  }
  // Generate slug with @sindresorhus/slugify
  return slugify(text, {
    lowercase: true, // Convert to lowercase
    decamelize: false, // Avoid splitting camelCase words
    customReplacements: [["#", ""]], // Example: Remove specific characters if needed
  });
};

// Function to create a full slug for a design
export const createSlug = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): string => {
  if (!id || !name) {
    throw new Error("Both 'id' and 'name' are required to create a slug.");
  }

  // Generate a URL-friendly slug from the name
  const nameSlug = generateSlug(name);

  // Return the formatted slug
  return `/design/${nameSlug}_${id}`;
};
