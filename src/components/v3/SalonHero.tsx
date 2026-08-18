'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useContent } from '@/context/ContentContext';
import Eyebrow from './Eyebrow';

export default function SalonHero() {
    const { content } = useContent();
    const { hero } = content;

    return (
        <section id="top" className="relative overflow-hidden px-5 sm:px-8 pt-36 sm:pt-40 pb-20 sm:pb-28">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-24 h-[440px] w-[640px] -translate-x-1/2 rounded-full bg-[#C4A8E8]/30 blur-[120px]" />
                <div className="absolute left-1/2 bottom-0 h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-[#F5943A]/10 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-[1100px] text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex justify-center"
                >
                    <Eyebrow>{hero.eyebrow}</Eyebrow>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                    className="font-fraunces mx-auto mt-7 max-w-[16ch] text-[2.7rem] sm:text-[3.8rem] lg:text-[4.6rem] font-light leading-[1.04] tracking-[-0.02em] text-[#2A2342]"
                >
                    {hero.title}{' '}
                    <span className="italic text-[#E8721A]">{hero.titleEmphasis}</span>{' '}
                    <span className="text-[#6B3FC0]">{hero.titleHighlight}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                    className="mx-auto mt-7 max-w-[620px] font-sans text-[16px] sm:text-[17px] leading-relaxed text-[#4A4163]"
                >
                    {hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                    className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full bg-[#E8721A] px-7 py-3.5 font-sans text-[14.5px] font-medium text-white shadow-[0_14px_34px_-12px_rgba(232,114,26,0.75)] hover:bg-[#C05A0E] transition-colors duration-200"
                    >
                        {hero.ctaText.replace(/[→\s]+$/, '')}
                    </a>
                    <a
                        href="#results"
                        className="inline-flex items-center justify-center rounded-full border border-[#2A2342]/15 bg-[#F1EBFB]/60 px-7 py-3.5 font-sans text-[14.5px] font-medium text-[#2A2342] hover:border-[#2A2342]/30 hover:bg-[#F1EBFB] transition-colors duration-200"
                    >
                        See the results
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
