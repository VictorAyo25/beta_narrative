'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { EASE, scrollToScene } from './primitives';
import Eyebrow from './Eyebrow';

/** Grand, airy opening scene — layered headline + a tall framed portrait. */
export default function SpotlightHero() {
    const { content } = useContent();
    const { hero, value } = content;
    const portrait = value.profileImage || '/images/Favour.JPG';
    const cta = hero.ctaText.replace(/[→\s]+$/, '');

    return (
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                >
                    <Eyebrow>{hero.eyebrow}</Eyebrow>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                    className="mt-7 font-display text-[clamp(2.5rem,5.2vw,4.4rem)] font-light leading-[1.04] tracking-[-0.025em] text-[#2A2342]"
                >
                    {hero.title} <span className="text-[#E8721A]">{hero.titleEmphasis}</span>{' '}
                    <span className="block text-[#6B3FC0]">{hero.titleHighlight}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                    className="mt-7 max-w-[46ch] font-sans text-[16px] leading-relaxed text-[#4A4163] sm:text-[17px]"
                >
                    {hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                    className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                >
                    <button
                        onClick={() => scrollToScene('contact')}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#E8721A] px-7 py-3.5 font-sans text-[14.5px] font-semibold text-white shadow-[0_16px_36px_-14px_rgba(232,114,26,0.7)] transition-colors duration-200 hover:bg-[#C05A0E]"
                    >
                        {cta}
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                    <button
                        onClick={() => scrollToScene('results')}
                        className="font-sans text-[14.5px] font-medium text-[#2A2342] underline-offset-4 transition-colors duration-200 hover:text-[#6B3FC0] hover:underline"
                    >
                        See the results
                    </button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="relative mx-auto w-full max-w-[380px]"
            >
                <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[#C4A8E8]/35 blur-3xl" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#2A2342]/10 shadow-[0_50px_100px_-50px_rgba(42,35,66,0.55)]">
                    <Image
                        src={portrait}
                        alt={value.profileName || 'Favour Egbogun'}
                        fill
                        priority
                        sizes="(max-width: 1023px) 80vw, 380px"
                        className="object-cover"
                        style={{ objectPosition: 'center 18%' }}
                    />
                </div>
            </motion.div>

            <button
                onClick={() => scrollToScene('problem')}
                aria-label="Scroll to next section"
                className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[#6E6588] transition-colors duration-200 hover:text-[#E8721A] lg:block"
            >
                <ChevronDown size={22} className="animate-bounce" />
            </button>
        </div>
    );
}
