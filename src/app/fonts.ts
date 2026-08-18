/**
 * Font definitions, kept in one module so each route segment can pull in only
 * the faces it renders (see the Next font docs on using multiple fonts).
 */
import { Space_Grotesk, Space_Mono, DM_Sans, Fraunces } from 'next/font/google';

// Space Mono — structural labels (SectionLabel, admin) + index numbers.
export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

// DM Sans — body copy across the site.
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// Fraunces — display serif for the public site.
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

// Space Grotesk — admin headings only. Loaded by the /admin segment.
export const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});
