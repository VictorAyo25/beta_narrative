'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { EASE } from '@/lib/motion';
import Kicker from './Kicker';

export default function PressHero() {
    const { content } = useContent();
    const { hero } = content;

    return (
        <section id="top" className="relative overflow-hidden px-5 sm:px-10 pt-32 sm:pt-44 pb-16 sm:pb-24">
            <div
                aria-hidden
                className="pointer-events-none absolute -left-40 -top-24 -z-10 h-[520px] w-[720px] rounded-full bg-[#C4A8E8]/35 blur-[130px]"
            />

            <div className="mx-auto max-w-[1180px]">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12"
                >
                    <div className="lg:col-span-8">
                        <Kicker>{hero.eyebrow}</Kicker>

                        <h1 className="font-newsreader mt-7 max-w-[15ch] text-[2.6rem] sm:text-[4rem] lg:text-[5.1rem] leading-[1.02] tracking-[-0.025em] text-[#2A2342]">
                            {hero.title}{' '}
                            <span className="italic text-[#E8721A]">{hero.titleEmphasis}</span>{' '}
                            {hero.titleHighlight}
                        </h1>
                    </div>

                    <div className="flex flex-col justify-end lg:col-span-4 lg:pb-2">
                        <div className="h-px w-full bg-[#2A2342]/15 lg:mb-7" />
                        <p className="mt-6 max-w-[46ch] font-sans text-[16px] leading-relaxed text-[#4A4163] lg:mt-0">
                            {hero.subtitle}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-full bg-[#E8721A] px-7 py-3.5 font-sans text-[14.5px] font-medium text-white hover:bg-[#C05A0E] transition-colors duration-200"
                            >
                                {hero.ctaText.replace(/[\u2192\s]+$/, '')}
                            </a>
                            <a
                                href="#results"
                                className="link-underline font-sans text-[14.5px] font-medium text-[#2A2342]"
                            >
                                See the results
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
