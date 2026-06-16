import { ContentProvider } from '@/context/ContentContext';
import { getServerSiteContent } from '@/lib/server-content';
import VersionSwitcher from '@/components/VersionSwitcher';
import ContactSection from '@/components/sections/ContactSection';
import SalonNav from '@/components/v3/SalonNav';
import SalonHero from '@/components/v3/SalonHero';
import SalonProblem from '@/components/v3/SalonProblem';
import SalonWhy from '@/components/v3/SalonWhy';
import SalonResults from '@/components/v3/SalonResults';
import SalonOffer from '@/components/v3/SalonOffer';
import SalonFooter from '@/components/v3/SalonFooter';

export const dynamic = 'force-dynamic';

export default async function V3Page({
    searchParams,
}: {
    searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
    const resolved = await searchParams;
    const isPreview = resolved?.preview === 'true';
    const content = await getServerSiteContent(isPreview);

    return (
        <ContentProvider initialContent={content}>
            <div className="theme-salon min-h-screen bg-[#E1D3F2]">
                <SalonNav />
                <main>
                    <SalonHero />
                    <SalonProblem />
                    <SalonWhy />
                    <SalonResults />
                    <SalonOffer />
                    <ContactSection />
                </main>
                <SalonFooter />
            </div>
            <VersionSwitcher />
        </ContentProvider>
    );
}
