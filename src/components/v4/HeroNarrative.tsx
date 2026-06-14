'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { EASE } from './frame-shared';
import Kicker from './Kicker';

/** Hero copy: eyebrow, layered headline, subtitle, primary CTA + results link. */
export default function HeroNarrative() {
    const { content } = useContent();
    const { hero } = content;
    const ctaLabel = hero.ctaText.replace(/[→\s]+$/, '');

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
            >
                <Kicker>{hero.eyebrow}</Kicker>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                className="mt-7 font-display text-[clamp(2.3rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#2A2342]"
            >
                {hero.title}{' '}
                <span className="text-[#E8721A]">{hero.titleEmphasis}</span>{' '}
                <span className="block text-[#6B3FC0]">{hero.titleHighlight}</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                className="mt-7 max-w-[52ch] font-sans text-[16px] sm:text-[17px] leading-relaxed text-[#4A4163]"
            >
                {hero.subtitle}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
                <a
                    href="#contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8721A] px-7 py-3.5 font-sans text-[14.5px] font-semibold text-white shadow-[0_16px_36px_-14px_rgba(232,114,26,0.7)] transition-colors duration-200 hover:bg-[#C05A0E]"
                >
                    {ctaLabel}
                    <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                </a>
                <a
                    href="#results"
                    className="group inline-flex items-center gap-1.5 font-sans text-[14.5px] font-medium text-[#2A2342] transition-colors duration-200 hover:text-[#6B3FC0]"
                >
                    See the results
                    <ArrowDown
                        size={15}
                        className="text-[#6B3FC0] transition-transform duration-200 group-hover:translate-y-0.5"
                    />
                </a>
            </motion.div>
        </div>
    );
}
