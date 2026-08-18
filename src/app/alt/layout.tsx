import type { Metadata } from 'next';
import { newsreader } from '../fonts';

// The Press layout is a design comparison against /, so keep it out of search.
export const metadata: Metadata = {
    title: 'Beta Narrative — Press layout',
    robots: { index: false, follow: false },
};

export default function AltLayout({ children }: { children: React.ReactNode }) {
    return <div className={newsreader.variable}>{children}</div>;
}
