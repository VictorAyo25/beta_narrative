'use client';

import { motion, useScroll } from 'framer-motion';
import { scrollToScene } from './primitives';

/** Slim fixed top bar: brand + Apply, with a hairline scroll-progress line. */
export default function SpotlightTopBar() {
    const { scrollYProgress } = useScroll();

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="flex items-center justify-between px-5 pb-4 pt-[calc(1rem_+_env(safe-area-inset-top))] sm:px-8 lg:px-12">
                <button
                    onClick={() => scrollToScene('top')}
                    className="font-display text-[18px] text-[#2A2342]"
                    aria-label="Back to top"
                >
                    Beta <span className="text-[#6B3FC0]">Narrative</span>
                </button>
                <button
                    onClick={() => scrollToScene('contact')}
                    className="rounded-full bg-[#2A2342] px-5 py-2 font-sans text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#E8721A]"
                >
                    Apply
                </button>
            </div>
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-[#E8721A]/80" />
        </header>
    );
}
