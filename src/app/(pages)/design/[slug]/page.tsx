import { RemoveHtmlTags } from "@/components/helper/html/PerseHtml";
import axios from "axios";
import SingleDesign from "./SingleDesign";

type Params = Promise<{ slug: string }>;

// Utility to truncate strings to a specific length
function truncateString(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}

// `generateMetadata` function for SEO
export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const name = params.slug;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const id = name.split("_")[1];

  if (!siteUrl) {
    console.error("NEXT_PUBLIC_SITE_URL is not defined");
    return {
      title: "Configuration Error",
      description: "Site URL is missing in environment variables.",
    };
  }

  const pageUrl = `${siteUrl}/design/${name}`;

  try {
    const response = await axios.get(
      `${siteUrl}/api/design/single-design?id=${id}`,
    );

    const data = response.data;
    const title = data.name || "Blog Post";
    const rawDescription =
      RemoveHtmlTags(data.description) || "Explore this amazing design";
    const description = truncateString(rawDescription, 160); // Limit to 160 characters
    const imageUrl = data.image || `${siteUrl}/default-image.jpg`; // Fallback for image

    return {
      title,
      description,
      alternates: {
        canonical: pageUrl,
      },
      keywords: data.tags?.length ? data.tags.join(", ") : "design, art, blog", // Comma-separated string

      openGraph: {
        title,
        description,
        type: "article",
        url: pageUrl,
        authors: data.author?.name || "Unknown Author",
        publishedTime: data.createdAt || null,
        modifiedTime: data.updatedAt || null,
        section: data.category || "Uncategorized",
        images: [
          {
            url: imageUrl,
            alt: title,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching design data:");
    return {
      title: "Design Not Found",
      description: "The requested design could not be found.",
    };
  }
}

// The page component
export default function Page(props: { params: Params }) {
  return <SingleDesign params={props.params} />;
}
