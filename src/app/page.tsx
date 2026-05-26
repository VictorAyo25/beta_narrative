import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PainSection from '@/components/sections/PainSection';
import ValueSection from '@/components/sections/ValueSection';
import ResultsSection from '@/components/sections/ResultsSection';
import OfferSection from '@/components/sections/OfferSection';
import ContactSection from '@/components/sections/ContactSection';
import FloatingCTA from '@/components/FloatingCTA';
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
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1A0E35]/95 border border-[#E8721A]/30 text-white px-4 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md flex items-center gap-3 text-xs font-semibold select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8721A] animate-pulse shadow-[0_0_10px_rgba(232,114,26,0.8)]" />
          <span>Viewing Site Draft Preview</span>
          <div className="w-[1px] h-3 bg-white/20" />
          <a href="/admin" className="text-[#E8721A] hover:text-[#E8721A]/80 transition-colors underline font-bold">
            Return to CMS
          </a>
        </div>
      )}
      <Navbar />
      <main>
        <HeroSection />
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
