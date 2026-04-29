import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/context/theme-provider';
import { cn } from '@/lib/utils';
import SessionWrapper from '../context/SessionProvider';
import ReactQueryProvider from '../context/TanstackQueryProvider';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteurl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(`${siteurl}`),
  title: {
    default:
      'Oylkka IT - Empowering Your Digital World, Everything in One Place',
    template: '%s | Oylkka IT',
  },
  description:
    'Oylkka IT offers expert design services including web design, UI/UX design, branding, print design, and motion graphics. Transform your brand with our creative solutions.',
  generator: 'Next.js',
  applicationName: 'Oylkka IT',
  keywords: [
    'web design services',
    'UI UX design',
    'branding services',
    'logo design',
    'print design',
    'motion graphics',
    '2D animation',
    '3D animation',
    'custom web development',
    'responsive website design',
    'brand identity',
    'packaging design',
    'freelance designer Bangladesh',
    'creative agency Bangladesh',
  ],
  authors: [{ name: 'Oylkka IT', url: siteurl }],
  creator: 'Sejar Parvez',
  openGraph: {
    description:
      'Expert web design, UI/UX, branding, print design & motion graphics. Transform your brand with our creative solutions.',
    url: siteurl,
    siteName: 'Oylkka IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    description:
      'Expert web design, UI/UX, branding, print design & motion graphics. Transform your brand with our creative solutions.',
    creator: '@sejarparvez',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryProvider>
      <html
        lang='en'
        suppressHydrationWarning
        className={cn('font-sans', geist.variable)}
      >
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <SessionWrapper>{children}</SessionWrapper>
            </TooltipProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position='top-right' richColors />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
