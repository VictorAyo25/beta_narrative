/**
 * Root Layout
 *
 * Async Server Component — fetches real Firestore content before the first
 * paint and passes it into ContentProvider as `initialContent`.
 * This eliminates the flash of stale default content on every page load.
 */

import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { AuthProvider } from '@/context/AuthContext';
import { getAdminDb } from '@/lib/firebase-admin';
import { defaultSiteContent } from '@/lib/default-content';
import { SiteContent } from '@/types';

// Font configurations
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-playfair', // Keeping the variable name so Tailwind mappings in globals.css stay intact
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

/**
 * Server-side content fetch using the Admin SDK.
 * Falls back to defaults gracefully — never crashes the page.
 */
async function getServerContent(): Promise<SiteContent> {
  try {
    const db = getAdminDb();
    if (!db) throw new Error('Admin DB unavailable');

    const docSnap = await db.collection('content').doc('site-content').get();

    if (docSnap.exists) {
      const data = docSnap.data()!;
      return {
        id: docSnap.id,
        ...data,
        updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      } as SiteContent;
    }
  } catch {
    // Fall through — Firestore unavailable in this environment
  }

  return {
    id: 'default',
    ...defaultSiteContent,
    updatedAt: new Date(),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch on the server so the very first render has real data
  const initialContent = await getServerContent();

  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-[#EEE8F8] text-[#1A0E35] antialiased">
        <ContentProvider initialContent={initialContent}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
