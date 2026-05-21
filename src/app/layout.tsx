/**
 * Root Layout
 * 
 * Main layout wrapper for the entire application.
 * Includes global styles, fonts, and context providers.
 */

import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { AuthProvider } from '@/context/AuthContext';

// Font configurations
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-playfair', // Keeping the variable name the same so we don't break tailwind mappings in globals.css
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Beta Narrative | Executive Brand Strategy',
  description:
    'Strategic visibility for leaders ready to stop blending in and start being sought after. Executive brand strategy for C-suite leaders and professionals.',
  keywords: [
    'executive branding',
    'personal branding',
    'PR strategy',
    'communications',
    'leadership visibility',
    'thought leadership',
  ],
  openGraph: {
    title: 'Beta Narrative | Executive Brand Strategy',
    description:
      'Strategic visibility for leaders ready to stop blending in and start being sought after.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Beta Narrative',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beta Narrative | Executive Brand Strategy',
    description:
      'Strategic visibility for leaders ready to stop blending in and start being sought after.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-[#FAF7F2] text-[#1A112E] antialiased">
        <ContentProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
