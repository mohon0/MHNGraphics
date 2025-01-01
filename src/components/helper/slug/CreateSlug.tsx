// Helper function to slugify the name and subcategory (convert spaces to hyphens and lowercasing)
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
};

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
  const nameSlug = slugify(name);

  // Return the formatted slug
  return `/design/${nameSlug}_${id}`;
};
