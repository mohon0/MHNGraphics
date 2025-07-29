/**
 * Converts a slug to human-readable text.
 *
 * @param slug - The slug string to convert.
 * @returns A formatted string with each word capitalized (numbers remain unchanged).
 */
export const SlugToText = (slug: string): string => {
  if (!slug.trim()) return ''; // Handle empty or whitespace-only strings

  return slug
    .split('-')
    .filter(Boolean) // Remove empty segments caused by consecutive dashes
    .map(
      (word) =>
        /^[0-9]+$/.test(word) // Check if the word is a number
          ? word // Leave numbers as they are
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(), // Capitalize text
    )
    .join(' ');
};
