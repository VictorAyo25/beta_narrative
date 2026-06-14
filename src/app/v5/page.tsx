import { ContentProvider } from '@/context/ContentContext';
import { getServerSiteContent } from '@/lib/server-content';
import VersionSwitcher from '@/components/VersionSwitcher';
import ContactSection from '@/components/sections/ContactSection';
import SnapScroll from '@/components/v5/SnapScroll';
import SpotlightTopBar from '@/components/v5/SpotlightTopBar';
import SceneDotNav from '@/components/v5/SceneDotNav';
import Scene from '@/components/v5/Scene';
import SpotlightHero from '@/components/v5/SpotlightHero';
import SpotlightProblem from '@/components/v5/SpotlightProblem';
import SpotlightWhy from '@/components/v5/SpotlightWhy';
import SpotlightResults from '@/components/v5/SpotlightResults';
import SpotlightOffer from '@/components/v5/SpotlightOffer';
import SpotlightFooter from '@/components/v5/SpotlightFooter';

export const dynamic = 'force-dynamic';

export default async function V5Page({
    searchParams,
}: {
    searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
    const resolved = await searchParams;
    const isPreview = resolved?.preview === 'true';
    const content = await getServerSiteContent(isPreview);

    return (
        <ContentProvider initialContent={content}>
            <SnapScroll />
            <SpotlightTopBar />
            <SceneDotNav />

            <main>
                <Scene id="top">
                    <SpotlightHero />
                </Scene>
                <Scene id="problem" tint>
                    <SpotlightProblem />
                </Scene>
                <Scene id="why">
                    <SpotlightWhy />
                </Scene>
                <Scene id="results" tint flush>
                    <SpotlightResults />
                </Scene>
                <Scene id="offer">
                    <SpotlightOffer />
                </Scene>
                <ContactSection />
            </main>

            <SpotlightFooter />
            <VersionSwitcher />
        </ContentProvider>
    );
}
