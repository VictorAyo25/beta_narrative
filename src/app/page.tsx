import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PainSection from '@/components/sections/PainSection';
import ValueSection from '@/components/sections/ValueSection';
import ResultsSection from '@/components/sections/ResultsSection';
import OfferSection from '@/components/sections/OfferSection';
import ContactSection from '@/components/sections/ContactSection';
import FloatingCTA from '@/components/FloatingCTA';
import Marquee from '@/components/Marquee';
import { ContentProvider } from '@/context/ContentContext';
import { getAdminDb } from '@/lib/firebase-admin';
import { defaultSiteContent } from '@/lib/default-content';
import { SiteContent } from '@/types';

export const dynamic = 'force-dynamic';

async function getServerContent(isPreview: boolean): Promise<SiteContent> {
  try {
    const db = getAdminDb();
    if (!db) throw new Error('Admin DB unavailable');

    const docId = isPreview ? 'site-content-draft' : 'site-content';
    let docSnap = await db.collection('content').doc(docId).get();

    // Fallback if draft document doesn't exist yet
    if (!docSnap.exists && isPreview) {
      docSnap = await db.collection('content').doc('site-content').get();
    }

    if (docSnap.exists) {
      const data = docSnap.data()!;
      return {
        id: docSnap.id,
        ...data,
        updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      } as SiteContent;
    }
  } catch (err) {
    console.error('Error fetching Firestore content:', err);
  }

  return {
    id: 'default',
    ...defaultSiteContent,
    updatedAt: new Date(),
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
  const resolvedParams = await searchParams;
  const isPreview = resolvedParams?.preview === 'true';
  const content = await getServerContent(isPreview);

  return (
    <ContentProvider initialContent={content}>
      {isPreview && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#16121F] text-white px-4 py-2.5 shadow-[0_14px_36px_-14px_rgba(22,18,31,0.5)] flex items-center gap-3 select-none">
          <span className="block w-2 h-2 bg-[#E8721A]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.1em]">Viewing Site Draft Preview</span>
          <span className="block w-px h-3 bg-white/20" />
          <a href="/admin" className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#E8721A] hover:text-white transition-colors">
            Return to CMS
          </a>
        </div>
      )}
      <Navbar />
      <main>
        <HeroSection />
        <Marquee />
        <PainSection />
        <ValueSection />
        <ResultsSection />
        <OfferSection />
        <ContactSection />
        <FloatingCTA />
      </main>
      <Footer />
    </ContentProvider>
  );
}
