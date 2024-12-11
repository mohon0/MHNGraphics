import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Metadata } from "next";
import { Inter, Philosopher } from "next/font/google";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import SessionWrapper from "../../context/SessionProvider";
import ReactQueryProvider from "../../context/TanstackQueryProvider";
import ClientSideToastContainer from "../../context/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const philosopher = Philosopher({
  subsets: ["latin"],
  display: "swap",
  variable: "--philosopher",
  weight: ["400", "700"],
});
const siteurl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(`${siteurl}`),
  title: {
    default: "MHN Graphics",
    template: "%s - MHN Graphics",
  },
  description:
    "Professional Graphics Desinger & IT Teacher. Jhenaidah, Khulna, Bangladesh.",
  generator: "Next js",
  applicationName: "FreeLancer MOHON",
  keywords: [
    "graphic,logo, anydesigne, mohon, freelancermohon, best_graphic_designe_in jhenaidah, best_graphic_designe_in_bangladesh, logodesigner, logo, logodesigne, bestlogodesign, mdmohon, freelancermohonjhenaidah, Graphic design portfolio, Poster and flyer design, Social media graphics, Vector graphics design, Creative branding agency, Affordable graphic design, Corporate identity design, UI/UX design services, Visual communication design, Typography specialists, Digital illustration, Print design services, Branding and identity design, Web graphics design, Logo design experts, Freelance graphic designer, Custom graphic design, Creative design solutions, Professional graphic designer, Graphic design services, freelancermohon",
  ],
  authors: [{ name: "MHN Graphic", url: "https://freelancermohon.com" }],
  creator: "md mohon",
  openGraph: {
    title: "FreeLancer MOHON",
    description: "Graphics Designer and video editor",
    url: "https://freelancermohon.com",
    siteName: "FreeLancer MOHON",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Freelancer Mohon",
    description: "Graphics Designer and video editor",
    creator: "@mohongraphics",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`${inter.className} ${philosopher.variable}`}>
          <SessionWrapper>{children}</SessionWrapper>
          <ReactQueryDevtools initialIsOpen={false} />
          <ClientSideToastContainer />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
