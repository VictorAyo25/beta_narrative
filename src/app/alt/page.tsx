import { ContentProvider } from '@/context/ContentContext';
import { getServerSiteContent } from '@/lib/server-content';
import ContactSection from '@/components/sections/ContactSection';
import PressNav from '@/components/press/PressNav';
import PressHero from '@/components/press/PressHero';
import PressProblem from '@/components/press/PressProblem';
import PressWhy from '@/components/press/PressWhy';
import PressResults from '@/components/press/PressResults';
import PressOffer from '@/components/press/PressOffer';
import PressFooter from '@/components/press/PressFooter';

export const dynamic = 'force-dynamic';

export default async function AltPage({
    searchParams,
}: {
    searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
    const resolved = await searchParams;
    const content = await getServerSiteContent(resolved?.preview === 'true');

    return (
        <ContentProvider initialContent={content}>
            <div className="theme-press min-h-screen bg-[#E1D3F2]">
                <PressNav />
                <main>
                    <PressHero />
                    <PressProblem />
                    <PressWhy />
                    <PressResults />
                    <PressOffer />
                    <ContactSection />
                </main>
                <PressFooter />
            </div>
        </ContentProvider>
    );
}
