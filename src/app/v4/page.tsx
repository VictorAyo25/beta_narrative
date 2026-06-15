import { ContentProvider } from '@/context/ContentContext';
import { getServerSiteContent } from '@/lib/server-content';
import VersionSwitcher from '@/components/VersionSwitcher';
import ContactSection from '@/components/sections/ContactSection';
import { ActiveSectionProvider } from '@/components/v4/ActiveSectionContext';
import FrameStage from '@/components/v4/FrameStage';
import NarrativeBlock from '@/components/v4/NarrativeBlock';
import HeroNarrative from '@/components/v4/HeroNarrative';
import ProblemNarrative from '@/components/v4/ProblemNarrative';
import WhyNarrative from '@/components/v4/WhyNarrative';
import ResultsNarrative from '@/components/v4/ResultsNarrative';
import OfferNarrative from '@/components/v4/OfferNarrative';
import FrameFooter from '@/components/v4/FrameFooter';

export const dynamic = 'force-dynamic';

export default async function V4Page({
    searchParams,
}: {
    searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
    const resolved = await searchParams;
    const isPreview = resolved?.preview === 'true';
    const content = await getServerSiteContent(isPreview);

    return (
        <ContentProvider initialContent={content}>
          <div className="theme-frame">
            {/* Minimal top bar — kept quiet so the split experience breathes */}
            <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[#2A2342]/[0.08] bg-[#E1D3F2]/80 px-5 pb-4 pt-[calc(1rem_+_env(safe-area-inset-top))] backdrop-blur-md sm:px-8 lg:px-14 xl:px-20">
                <a href="#top" className="font-display text-[18px] text-[#2A2342]">
                    Beta <span className="text-[#6B3FC0]">Narrative</span>
                </a>
                <a
                    href="#contact"
                    className="rounded-full bg-[#2A2342] px-5 py-2 font-sans text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#E8721A]"
                >
                    Apply
                </a>
            </header>

            {/* Sticky split-stage storytelling */}
            <ActiveSectionProvider>
                <div className="lg:flex lg:items-start">
                    <FrameStage />
                    <div className="lg:w-[54%] xl:w-[52%]">
                        <NarrativeBlock section="hero" isHero>
                            <HeroNarrative />
                        </NarrativeBlock>
                        <NarrativeBlock section="problem">
                            <ProblemNarrative />
                        </NarrativeBlock>
                        <NarrativeBlock section="why">
                            <WhyNarrative />
                        </NarrativeBlock>
                        <NarrativeBlock section="results">
                            <ResultsNarrative />
                        </NarrativeBlock>
                        <NarrativeBlock section="offer">
                            <OfferNarrative />
                        </NarrativeBlock>
                    </div>
                </div>
            </ActiveSectionProvider>

            {/* Full-width shared booking form + footer */}
            <ContactSection />
            <FrameFooter />
          </div>
            <VersionSwitcher />
        </ContentProvider>
    );
}
