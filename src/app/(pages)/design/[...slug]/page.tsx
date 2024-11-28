import axios from "axios";
import SingleDesign from "./SingleDesign";

interface PageProps {
  params: { slug: string[] };
}

// `generateMetadata` function for SEO
export async function generateMetadata({ params }: PageProps) {
  const [category, day, month, year, name] = params.slug;
  const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/design/single-design?category=${category}&day=${day}&month=${month}&year=${year}&name=${name}`,
    );

    const data = response.data;

    return {
      title: response.data.name || "Blog Post",
      description: data.description || "Explore this amazing design",
      alternates: {
        canonical: `${siteurl}/design/${category}/${day}/${month}/${year}/${name}`,
      },
      openGraph: {
        title: response.data.name || "Blog Post",
        description: data.description || "Explore this amazing design",
        type: "article",
        url: `${siteurl}/design/${category}/${day}/${month}/${year}/${name}`,
        authors: response.data.author.name,
        publishedTime: response.data.createdAt,
        modifiedTime: response.data.updatedAt,
        section: response.data.category,

        images: [
          {
            url: data.image,
            alt: response.data.name,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: response.data.name,
        description: data.description,
      },
    };
  } catch (error) {
    return {
      title: "Design Not Found",
      description: "The requested design could not be found.",
    };
  }
}

// The page component
export default function Page({ params }: PageProps) {
  return <SingleDesign params={params} />;
}
