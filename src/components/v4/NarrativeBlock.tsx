'use client';

import type { ReactNode } from 'react';
import { useRegisterSection } from './ActiveSectionContext';
import { SECTION_ANCHOR, type FrameSectionId } from './frame-shared';
import StageVisual from './StageVisual';

interface NarrativeBlockProps {
    section: FrameSectionId;
    children: ReactNode;
    /** The hero block is full-height; later beats use a generous min-height. */
    isHero?: boolean;
}

/**
 * One scrollable beat of the narrative pane. It registers with the
 * active-section observer (driving the sticky stage on desktop) and, on mobile,
 * renders that beat's focal visual inline above the copy.
 */
export default function NarrativeBlock({ section, children, isHero = false }: NarrativeBlockProps) {
    const ref = useRegisterSection(section);

    return (
        <section
            ref={ref}
            id={SECTION_ANCHOR[section]}
            className={`flex flex-col justify-center scroll-mt-24 px-5 sm:px-8 lg:px-14 xl:px-20 ${
                isHero
                    ? 'min-h-[88svh] lg:min-h-screen pt-28 pb-16 lg:pt-0 lg:pb-0'
                    : 'min-h-[78svh] lg:min-h-[88vh] py-16 lg:py-24'
            }`}
        >
            <div className="mx-auto w-full max-w-[560px] lg:mx-0">
                {/* Inline focal visual — mobile/tablet only (desktop uses the sticky stage) */}
                <div className="mb-9 lg:hidden">
                    <div className="mx-auto max-w-[440px]">
                        <StageVisual section={section} variant="inline" />
                    </div>
                </div>
                {children}
            </div>
        </section>
    );
}
