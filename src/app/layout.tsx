import type { Metadata, Viewport } from 'next';
import { spaceMono, dmSans, fraunces } from './fonts';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const dynamic = 'force-dynamic';

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
