import type { Metadata, Viewport } from 'next';
import {
  Space_Grotesk,
  Space_Mono,
  DM_Sans,
  Fraunces,
  Inter,
  Cormorant_Garamond,
  Syne,
  Manrope,
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const dynamic = 'force-dynamic';

/* ---------------------------------------------------------------------------
   Type system
   Each layout variant gets its own typographic voice so the five options read
   as distinct designs rather than one design re-skinned. Fonts are loaded once
   here as CSS variables; globals.css maps them onto each variant via a
   `.theme-*` scope class (see "Per-variant type" there).
   --------------------------------------------------------------------------- */

// ── Shared structural type ──────────────────────────────────────────────
// Space Mono — structural labels, kickers, index numbers (all variants).
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

// ── v1 Editorial Grid — Swiss / structural ──────────────────────────────
// Space Grotesk display + Inter body.
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ── v2 Atelier — elegant couture serif ──────────────────────────────────
// Cormorant Garamond display + DM Sans body.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// ── v3 Salon — warm literary serif ──────────────────────────────────────
// Fraunces display + DM Sans body.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

// ── v4 Frame — contemporary gallery ─────────────────────────────────────
// Syne display + Manrope body.
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

// ── v5 Spotlight — cinematic display ────────────────────────────────────
// Bricolage Grotesque display + Plus Jakarta Sans body.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
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
        inter.variable,
        cormorant.variable,
        dmSans.variable,
        fraunces.variable,
        syne.variable,
        manrope.variable,
        bricolage.variable,
        jakarta.variable,
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
