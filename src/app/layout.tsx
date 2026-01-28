import { Toaster } from '@/components/ui/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import SessionWrapper from '../../context/SessionProvider';
import ReactQueryProvider from '../../context/TanstackQueryProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteurl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(`${siteurl}`),
  title: {
    default: 'Oylkka it',
    template: '%s - Oylkka it',
  },
  description:
    'Oylkka it is an image-sharing platform built for designers to share, showcase, and discover creative work.',
  generator: 'Next.js',
  applicationName: 'Oylkka it',
  keywords: [
    'image sharing for designers',
    'graphic design showcase',
    'design inspiration',
    'logo portfolio',
    'poster sharing site',
    'creative work sharing',
    'freelance designer platform',
    'visual design community',
    'graphic portfolio site',
    'Oylkka it',
    'mdmohon',
    'freelancermohon',
    'best graphic design Bangladesh',
  ],
  authors: [{ name: 'Oylkka it', url: 'https://www.it.oylkka.com' }],
  creator: 'Sejar Parvez',
  openGraph: {
    title: 'Oylkka it',
    description:
      'Oylkka it is a platform for designers to share and explore stunning graphics, logos, and creative content.',
    url: 'https://www.it.oylkka.com',
    siteName: 'Oylkka it',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oylkka it',
    description:
      'Join Oylkka it — an image-sharing site for designers to showcase and explore creative design work.',
    creator: '@sejarparvez',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryProvider>
      <html lang='en'>
        <body className={inter.className}>
          <SessionWrapper>{children}</SessionWrapper>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position='top-right' richColors />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
