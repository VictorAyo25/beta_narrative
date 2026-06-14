'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useActiveSection } from './ActiveSectionContext';
import { STAGE_TRANSITION } from './frame-shared';
import StageVisual from './StageVisual';

/**
 * The signature sticky "stage" (desktop only). It pins to the viewport and
 * cross-fades a single large focal visual as the narrative pane scrolls — the
 * active story beat is supplied by ActiveSectionContext.
 */
export default function FrameStage() {
    const { active } = useActiveSection();

    return (
        <aside className="sticky top-0 hidden h-screen lg:flex lg:w-[46%] xl:w-[48%]">
            {/* Calm matting around the focal element */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#F1ECF9] px-10 xl:px-16">
                {/* Ambient lilac wash + hairline seam toward the narrative pane */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-24 top-1/4 h-[460px] w-[460px] rounded-full bg-[#C4A8E8]/25 blur-[130px]" />
                    <div className="absolute bottom-10 right-0 h-[360px] w-[360px] rounded-full bg-[#E8721A]/[0.07] blur-[120px]" />
                    <div className="absolute inset-y-0 right-0 w-px bg-[#2A2342]/10" />
                </div>

                <div className="relative w-full max-w-[460px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={STAGE_TRANSITION}
                            className="flex justify-center"
                        >
                            <StageVisual section={active} variant="sticky" />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </aside>
    );
}
