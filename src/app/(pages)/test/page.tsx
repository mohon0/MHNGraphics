"use client";
export default function page() {
  function extractImagePath(url: string): string | null {
    // Regular expression to match the pattern and capture the design path including the extension
    const regex =
      /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/v\d+\/(designs\/\d+_large\.jpg)/;

    const match = url.match(regex);

    if (match) {
      return match[1]; // Extracts the full path including the file extension
    } else {
      return null; // Return null if the URL doesn't match the pattern
    }
  }

  const url =
    "https://res.cloudinary.com/dktbkerzq/image/upload/v1731416449/designs/1731416441896_large.jpg.jpg";
  const imagePath = extractImagePath(url);

  console.log(imagePath); // "designs/1731416441896_large.jpg"

  return <div>pageaaa {imagePath}</div>;
}
