import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Space_Mono, DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const dynamic = 'force-dynamic';

/* ---------------------------------------------------------------------------
   Type system
   Fraunces (display) + DM Sans (body) drive the public site; Space Mono backs
   structural labels and Space Grotesk backs the admin headings. Loaded once as
   CSS variables and mapped on via globals.css.
   --------------------------------------------------------------------------- */

// Space Mono — structural labels (SectionLabel, admin) + index numbers.
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

// Space Grotesk — admin headings (.font-serif / default display).
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

// DM Sans — body copy.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// Fraunces — the Salon display serif (headlines, eyebrows).
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

// Viewport — viewportFit:'cover' lets layouts read env(safe-area-inset-*) so
// fixed bars clear the notch / home indicator on modern phones.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#E1D3F2',
};

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

import AnalyticsTracker from '@/components/AnalyticsTracker';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        spaceMono.variable,
        grotesk.variable,
        dmSans.variable,
        fraunces.variable,
      ].join(' ')}
    >
      <body className="font-sans bg-[#E1D3F2] text-[#4A4163] antialiased">
        <AuthProvider>
          <AnalyticsTracker />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
